"use client";
import { useEffect, useState } from "react";
import { autocomplete, destroy } from "getaddress-autocomplete";
import { Button, Input } from "@nextui-org/react";
import { InternalAddress } from "@/types/types";
import { FaLocationArrow } from "react-icons/fa";

export const AddressSearchComponent = ({
  handleDeliveryConfirm,
  restaurantState,
  deliveryAddress,
}: {
  handleDeliveryConfirm: (address: InternalAddress) => void;
  restaurantState: [
    "open" | "closed" | "opening soon" | "closing soon",
    string
  ];
  deliveryAddress: InternalAddress | null
}) => {
  const [fetchingLocation, setFetchingLocation] = useState<boolean>(false);
  const [calculatingDistance, setCalculatingDistance] =
    useState<boolean>(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [deliveryAvailable, setDeliveryAvailable] = useState<boolean>(true);
  const [restaurantMessage, setRestaurantMessage] = useState<string>("");
  const [addressDetails, setAddressDetails] = useState<InternalAddress>({
    formatted_address: {
      formatted_address_0: "",
      formatted_address_1: "",
      formatted_address_2: "",
      formatted_address_3: "",
      formatted_address_4: "",
    },
    line_1: "",
    line_2: "",
    town_or_city: "",
    county: "",
    postcode: "",
  });

  useEffect(() => {
    const handleAddressSelected = (event: any) => {
      const addressDetails = event.address;
      setAddressDetails((prevDetails) => ({
        ...prevDetails,
        formatted_address: {
          formatted_address_0: addressDetails.formatted_address[0],
          formatted_address_1: addressDetails.formatted_address[1],
          formatted_address_2: addressDetails.formatted_address[2],
          formatted_address_3: addressDetails.formatted_address[3],
          formatted_address_4: addressDetails.formatted_address[4],
        },
        postcode: addressDetails.postcode,
        town_or_city: addressDetails.town_or_city,
        county: addressDetails.county,
        line_1: addressDetails.line_1,
        line_2: addressDetails.line_2,
      }));
      fetchDistance(
        process.env.NEXT_PUBLIC_RESTAURANT_POSTCODE!,
        addressDetails.postcode
      ).then((dist) => {
        if (dist !== null){
          setDistance(dist)
        }
      });
    };

    if (deliveryAddress) {
      setAddressDetails(deliveryAddress)
    }
    // Initialize autocomplete when the component mounts
    autocomplete("textbox_id", process.env.NEXT_PUBLIC_GET_ADDRESS_KEY!, {
      minimum_characters: 5,
      suggestion_count: 20,
      list_class_names: ["custom-autocomplete-list"],
      container_class_names: ["custom-autocomplete-container"],
      suggestion_class_names: ["custom-autocomplete-suggestion"],
      bind_output_fields: false,
    });

    document.addEventListener(
      "getaddress-autocomplete-address-selected",
      handleAddressSelected
    );

    // Set restaurant message based on the state
    switch (restaurantState[0]) {
      case "closed":
        setDeliveryAvailable(false);
        break;
      case "opening soon":
        setRestaurantMessage("The restaurant will be Opening Soon at 4pm");
        setDeliveryAvailable(false);
        break;
      case "closing soon":
        setRestaurantMessage(
          `The restaurant will be closing soon at ${restaurantState[1]}`
        );
        setDeliveryAvailable(true);
        break;
      default:
        setDeliveryAvailable(true);
    }

    // Cleanup function to destroy autocomplete when the component unmounts
    return () => {
      destroy();
      document.removeEventListener(
        "getaddress-autocomplete-address-selected",
        handleAddressSelected
      );
    };
  }, [deliveryAddress, restaurantMessage, restaurantState]);

  // Function to fetch distance using Google Maps Distance Matrix API
  async function fetchDistance(
    origin: string,
    destination: string
  ): Promise<number | null> {
    try {
      const response = await fetch(
        `/api/user/distance?origin=${origin}&destination=${destination}`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error("Failed!");
      }
      const data = await response.json();
      const distance = data.rows[0].elements[0].distance.value / 1609.34; // Convert meters to kilometers
      return distance;
    } catch (error) {
      console.error("Error fetching distance: ", error);
      return null;
    }
  }

  async function submitAddress(formData: FormData) {
    setCalculatingDistance(true);
    if (
      addressDetails.postcode &&
      addressDetails.formatted_address.formatted_address_0
    ) {
      fetchDistance(
        process.env.NEXT_PUBLIC_RESTAURANT_POSTCODE!,
        addressDetails.postcode
      ).then((dist) => {
        if (dist !== null) {
          setDistance(dist);
          if (dist <= 5) {
            const updatedAddress = {
              formatted_address: {
                formatted_address_0:
                  (formData.get("formatted_address_0") as string) || "",
                formatted_address_1:
                  (formData.get("formatted_address_1") as string) || "",
                formatted_address_2:
                  (formData.get("formatted_address_2") as string) || "",
                formatted_address_3:
                  (formData.get("formatted_address_3") as string) || "",
                formatted_address_4:
                  (formData.get("formatted_address_4") as string) || "",
              },
              line_1: (formData.get("line_1") as string) || "",
              line_2: (formData.get("line_2") as string) || "",
              county: (formData.get("county") as string) || "",
              town_or_city: (formData.get("town_or_city") as string) || "",
              postcode: (formData.get("postcode") as string) || "",
            };
            handleDeliveryConfirm(updatedAddress);
          } else {
            console.error("Distance too far from restaurant");
          }
        } else {
          console.error("Failed to fetch distance");
        }
      });
    }
    setCalculatingDistance(false);
  }

  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      setFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Use Google Maps Geocoding API to get the address
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const fullAddress = data.results[0].formatted_address;
            const addressParts = fullAddress
              .split(", ")
              .map((part: string) => part.trim());

            let postCode = "";
            let townOrCity = "";
            for (const component of data.results[0].address_components) {
              if (component.types[0] === "postal_code") {
                postCode = component.long_name;
              }
              if (component.types[0] === "postal_town") {
                townOrCity = component.long_name;
              }
            }

            let formattedAddress = {
              formatted_address_0: addressParts[0] || "",
              formatted_address_1: addressParts[1] || "",
              formatted_address_2: addressParts[2] || "",
              formatted_address_3: addressParts[3] || "",
              formatted_address_4: addressParts[4] || "",
            };

            setAddressDetails((prevDetails) => ({
              ...prevDetails,
              postcode: postCode,
              town_or_city: townOrCity,
              formatted_address: formattedAddress,
            }));
            fetchDistance(
              process.env.NEXT_PUBLIC_RESTAURANT_POSTCODE!,
              postCode
            ).then((dist) => {
              if (dist !== null) {
                setDistance(dist);
              }
            });
            setFetchingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error: ", error);
        }, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {/* Display restaurant state message */}
      <p className="text-white text-center text-xl font-extrabold bg-blue-600 rounded-xl">
        {restaurantMessage}
      </p>
      <p className="text-gray-700 text-center text-lg font-bold">
        Please Enter Your Postcode For Delivery Availability
      </p>

      <div>
        <div className="p-2 bg-blue-50">
          <h3 className="text-gray-700 text-lg font-bold flex justify-center">
            Look Up Your Address
          </h3>
          <div className="flex p-2 items-center">
            <Input
              id="textbox_id"
              radius="lg"
              size="lg"
              variant="underlined"
              value={addressDetails.postcode}
              label="Postcode"
              labelPlacement="outside"
              type="text"
              onChange={(e) => {
                setAddressDetails((prevDetails) => ({
                  ...prevDetails,
                  postcode: e.target.value,
                }));
              }}
            />
            <Button
              size="lg"
              onClick={handleCurrentLocation}
              className="py-8"
              isLoading={fetchingLocation}
            >
              {!fetchingLocation && <FaLocationArrow />}
            </Button>
          </div>
        </div>
        <p className="text-gray-700 text-center text-lg py-4 font-bold">
          Or Enter Your Full Address
        </p>
        <form
          action={submitAddress}
          className="flex flex-col items-start gap-4"
        >
          <Input
            labelPlacement="outside"
            type="text"
            id="formatted_address_0"
            name="formatted_address_0"
            value={addressDetails.formatted_address.formatted_address_0}
            variant="underlined"
            label="Address Line 1"
            isRequired
            onChange={(e) => {
              setAddressDetails((prevDetails) => ({
                ...prevDetails,
                formatted_address: {
                  ...addressDetails.formatted_address,
                  formatted_address_0: e.target.value,
                },
              }));
            }}
          />
          <Input
            labelPlacement="outside"
            type="text"
            id="formatted_address_1"
            name="formatted_address_1"
            value={addressDetails.formatted_address.formatted_address_1}
            variant="underlined"
            label="Address Line 2"
            onChange={(e) => {
              setAddressDetails((prevDetails) => ({
                ...prevDetails,
                formatted_address: {
                  ...addressDetails.formatted_address,
                  formatted_address_1: e.target.value,
                },
              }));
            }}
          />
          <Input
            type="text"
            id="formatted_address_2"
            name="formatted_address_2"
            value={addressDetails.formatted_address.formatted_address_2}
            className="hidden"
          />
          <Input
            type="text"
            id="formatted_address_3"
            name="formatted_address_3"
            value={addressDetails.formatted_address.formatted_address_3}
            className="hidden"
          />
          <Input
            type="text"
            id="formatted_address_4"
            name="formatted_address_4"
            value={addressDetails.formatted_address.formatted_address_4}
            className="hidden"
          />
          <Input
            type="text"
            id="line_1"
            name="line_1"
            className="hidden"
            value={addressDetails.line_1}
          />
          <Input
            type="text"
            id="line_2"
            name="line_2"
            className="hidden"
            value={addressDetails.line_2}
          />
          <Input
            labelPlacement="outside"
            type="text"
            id="town_or_city"
            name="town_or_city"
            value={addressDetails.town_or_city}
            variant="underlined"
            label="Town/City"
            onChange={(e) => {
              setAddressDetails((prevDetails) => ({
                ...prevDetails,
                town_or_city: e.target.value,
              }));
            }}
          />
          <Input
            type="text"
            id="county"
            name="county"
            className="hidden"
            value={addressDetails.county}
          />
          <Input
            labelPlacement="outside"
            type="text"
            id="postcode"
            name="postcode"
            value={addressDetails.postcode}
            variant="underlined"
            label="Postcode"
            isRequired
            onChange={(e) => {
              setAddressDetails((prevDetails) => ({
                ...prevDetails,
                postcode: e.target.value,
              }));
            }}
          />
          <Button
            color="primary"
            size="lg"
            type="submit"
            fullWidth
            isDisabled={!deliveryAvailable}
            isLoading={calculatingDistance}
          >
            Confirm & Select Time for Delivery
          </Button>
        </form>
        {/* Display delivery availability message */}
        {!deliveryAvailable && (
          <div className="my-4 bg-gradient-to-b from-blue-600 to-sfc-blue rounded-md">
            <p className="text-white text-center text-lg font-bold">
              As much as we would love for you to try our food
            </p>
            <p className="text-white text-center text-lg font-bold">
              SFC Colchester is closed until 4pm unfortunately
            </p>
            <div className="flex justify-center p-2">
              <Button
                onClick={() => {
                  setDeliveryAvailable(true);
                }}
                color="warning"
                className="transition transform hover:scale-105 text-lg"
              >
                Click Here to Pre-Order
              </Button>
            </div>
          </div>
        )}
        {/* Display delivery distance availability message */}
        {distance && distance > 5 && (
          <div className="p-2">
            <p className="text-red-500 text-center text-xl font-bold">
              As much as we would love for you to try our food
            </p>
            <p className="text-red-500 text-center text-xl font-bold">
              Delivery is not available for addresses more than 5 miles away
            </p>
          </div>
        )}
      </div>
    </>
  );
};
