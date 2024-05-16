//million-ignore
"use client";

import DiscountCodeInput from "@/components/DiscountCodeInput";
import { CartItemType, DeliveryTimes } from "@/types/types";
import useCartStore from "@/utils/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Notes from "./cartHelpers/Notes";
import TimeHandler from "./cartHelpers/TimeHandler";
import DeliveryModal from "./cartHelpers/DeliveryModal";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { generateRandomId } from "@/utils/utils";

type CartProps = {
  todaysDeliveryTimes: DeliveryTimes | null;
  verifyDiscountCode: (code: string) => Promise<any>;
};

const Cart: React.FC<CartProps> = ({
  todaysDeliveryTimes,
  verifyDiscountCode,
}) => {
  const [isPhoneVerificationModalOpen, setIsPhoneVerificationModalOpen] =
    useState(false);
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { sessionId } = useAuth();
  const router = useRouter();

  const {
    products,
    totalItems,
    totalPrice,
    subtotal,
    discountAmount,
    discountApplied,
    deliveryAddress,
    deliveryMethod,
    deliveryTime,
    discountCode,
    orderNotes,
    paymentMethod,
    removeFromCart,
    updateQuantity,
    applyDiscountCode,
    removeDiscountCode,
    switchDeliveryMethod,
    setPaymentMethod,
  } = useCartStore();

  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState<boolean>(
    !isLoaded || !isSignedIn ? false : true
  );
  const [userClickedCheckout, setUserClickedCheckout] =
    useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsCheckoutDisabled(false);
    }
  }, [user, setIsCheckoutDisabled]);

  const calculateDeliveryCost = () => {
    if (deliveryMethod === "delivery" && totalPrice < 15) {
      return 2.0; // £2 delivery fee for orders under £15
    }
    return 0; // Free delivery for orders over £15 or for collection
  };

  useEffect(() => {
    if (!deliveryAddress && paymentMethod && deliveryMethod === "delivery") {
      setIsDeliveryModalVisible(true);
    }
  }, [paymentMethod, deliveryMethod, deliveryAddress]);

  const openDeliveryModalForChange = () => {
    setIsDeliveryModalVisible(true);
  };

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, [user]);

  const handleCheckout = async () => {
    setUserClickedCheckout(true);
    if (products.length === 0) {
      toast.error("Your cart is empty.");
      setUserClickedCheckout(false);
      return;
    }
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      try {
        if (!deliveryMethod) {
          toast.error("Please select a delivery or collection method.");
          setUserClickedCheckout(false);
          return;
        }
        if (!paymentMethod) {
          toast.error("Please select a payment method.");
          setUserClickedCheckout(false);
          return;
        }
        if (!deliveryTime) {
          toast.error("Please select a delivery time.");
          setUserClickedCheckout(false);
          return;
        }
        let addressId;
        if (deliveryAddress) {
          const addressResponse = await fetch(`/api/address`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...deliveryAddress }),
          });
          const addressData = await addressResponse.json();
          addressId = addressData.id;
        }
        let value;
        if (deliveryTime === "ASAP") {
          const currentTime = new Date();
          // Round up current time to the next quarter hour
          const remainder = 15 - (currentTime.getMinutes() % 15);
          currentTime.setMinutes(currentTime.getMinutes() + remainder, 0, 0);

          if (deliveryMethod === "delivery") {
            currentTime.setMinutes(currentTime.getMinutes() + 30);
          } else if (deliveryMethod === "collection") {
            currentTime.setMinutes(currentTime.getMinutes() + 15);
          }
          value = new Date(currentTime).toISOString(); // ISO string format
        }
        const res = await fetch(`/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deliveryMethod: deliveryMethod,
            paymentMethod: paymentMethod,
            orderNotes: orderNotes,
            products: products,
            subtotal: subtotal,
            totalPrice: totalPrice,
            paymentStatus: "Not Paid!",
            orderStatus: "Processed",
            userEmail: user.emailAddresses,
            phoneNumber: user.phoneNumbers,
            uKAddressId: addressId,
            discountCode: discountCode,
            discountedAmount: discountAmount,
            deliveryTime: deliveryTime === "ASAP" ? value : deliveryTime,
            deliveryCharge: calculateDeliveryCost(),
            userName: user.username,
          }),
        });
        const data = await res.json();
        if (paymentMethod === "cash") {
          router.push(`/order/${data.id}`);
        } else if (paymentMethod === "card") {
          router.push(`/pay/${data.id}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setUserClickedCheckout(false);
  };

  const processDiscountCode = async (code: string) => {
    if (discountApplied) {
      alert("Discount already applied.");
      return;
    }
    try {
      const data = await verifyDiscountCode(code);

      if (data && data.discount > 0) {
        applyDiscountCode(data);
      } else {
        alert("Invalid discount code.");
      }
    } catch (error) {
      console.error("Error verifying discount code:", error);
      alert("Error verifying discount code.");
    }
  };

  const handleQuantityChange = (item: CartItemType, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(item);
      return;
    } else {
      updateQuantity(item, newQuantity);
    }
  };

  const handlePaymentMethodChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (event.target.value === "cash" || event.target.value === "card") {
      setPaymentMethod(event.target.value);
    }
  };

  const handleOpenVerification = () => {
    setIsPhoneVerificationModalOpen(true);
  };

  const handleRevertDeliveryToCollection = () => {
    setIsDeliveryModalVisible(false);
    switchDeliveryMethod("collection");
  };

  const handleAddressModalClose = () => {
    setIsDeliveryModalVisible(false);
  };

  const handlePhoneVerificationModalClose = () => {
    setIsPhoneVerificationModalOpen(false);
  };

  let productsPopup = null;
  if (products.length > 0) {
    productsPopup = products.map((item, index) => (
      <div
        key={`${item.id}-${index}`}
        className="mb-4 flex items-start justify-between flex-row rounded-md p-4 shadow-md"
      >
        {/* Quantity section */}
        <div className="w-1/12 flex flex-col items-center mx-2 px-2">
          <h2 className="text-2xl text-center font-bold">{item.quantity}x</h2>
          <div className="flex px-2 gap-2">
            <button
              className="bg-blue-500 rounded-md"
              onClick={() => handleQuantityChange(item, item.quantity + 1)}
            >
              <FaPlus className="h-6 w-6 py-1 text-white" />
            </button>
            <button
              className="bg-blue-500 rounded-md"
              onClick={() => handleQuantityChange(item, item.quantity - 1)}
            >
              <FaMinus className="h-6 w-6 py-1 text-white" />
            </button>
          </div>
        </div>
        {/* Item details section */}
        <div className="w-9/12 px-2">
          <h1 className="text-2xl font-bold uppercase">{item.title}</h1>
          <Divider />
          {item.selectedPizzas &&
            item.selectedPizzas.length > 0 &&
            item.selectedPizzas.map((selectedPizza, idx) => {
              // Filter toppings with a charge of 1.0
              const chargedToppings = selectedPizza.toppings.filter(
                (topping) => topping.price === 1.0
              );
              return (
                <div key={idx}>
                  {selectedPizza.toppingChanges.added.length > 0 ||
                  selectedPizza.toppingChanges.removed.length > 0 ? (
                    <>
                      <h2 className="text-xl font-bold mr-2">
                        {selectedPizza.pizza}
                        <span className="text-lg"> - Topping Changes:</span>
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedPizza.toppingChanges &&
                          selectedPizza.toppingChanges.removed.length > 0 && (
                            <div>
                              <h3 className="text-lg">Toppings Removed:</h3>
                              <div>
                                {selectedPizza.toppingChanges.removed.map(
                                  (topping, index) => (
                                    <p key={index}>{`- ${topping}`}</p>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        {selectedPizza.toppingChanges &&
                          selectedPizza.toppingChanges.added.length > 0 && (
                            <div>
                              <h3 className="text-lg">Extra Toppings:</h3>
                              <div>
                                {selectedPizza.toppingChanges.added.map(
                                  (topping, index) => (
                                    <p key={index}>{`${topping} + £1.00`}</p>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </>
                  ) : (
                    <h2 className="text-xl font-bold mr-2">
                      {selectedPizza.pizza}
                    </h2>
                  )}
                  <Divider />
                </div>
              );
            })}
          {item.filletQuantity && item.filletQuantity > 1 && (
            <>
              <h2 className="text-xl font-bold mr-2">
                {item.filletQuantity} Fillets
              </h2>
              <Divider className="w-1/2" />
            </>
          )}
          {item.specificMeal && (
            <>
              {item.specificMeal.price > 0 ? (
                <h2 className="text-lg font-semibold mr-2">
                  {item.specificMeal.title} + £
                  {item.specificMeal.price.toFixed(2)}
                </h2>
              ) : (
                <h2 className="text-lg font-bold mr-2">
                  {item.specificMeal.title}
                </h2>
              )}
              <Divider className="w-1/2" />
            </>
          )}

          {item.extras &&
            item.extras.map((extra, index) => (
              <div key={index}>
                {extra.price > 0 ? (
                  <div key={index}>
                    <h2 className="font-semibold text-lg">
                      {extra.title} + £{extra.price.toFixed(2)}
                    </h2>
                  </div>
                ) : (
                  <h2 className="font-bold text-lg">{extra.title}</h2>
                )}
                <Divider className="w-1/2" />
              </div>
            ))}
          {item.genericMeal && (
            <div>
              {item.genericMeal.price > 0 ? (
                <h2 className="size-xl font-semibold">
                  {item.genericMeal.title} + £
                  {item.genericMeal.price.toFixed(2)}
                </h2>
              ) : (
                <h2 className="size-xl font-bold">{item.genericMeal.title}</h2>
              )}
              {item.drink && item.drink.length > 0 && (
                <div>
                  {item.drink.map((drink, index) => (
                    <h3 key={index}>{drink}</h3>
                  ))}
                </div>
              )}
              <Divider className="w-1/2" />
            </div>
          )}
          {((item.salads && item.salads.length > 0) ||
            (item.sauces && item.sauces.length > 0)) && (
            <>
              <div className="grid grid-cols-2">
                {item.salads && item.salads.length > 0 && (
                  <div>
                    <h2 className="font-bold text-lg">Salad:</h2>
                    {item.salads.map((salad) => (
                      <h3 key={generateRandomId() + salad}>{salad}</h3>
                    ))}
                  </div>
                )}
                {item.sauces && item.sauces.length > 0 && (
                  <div className="px-2">
                    <h2 className="font-bold text-lg">Sauce:</h2>
                    {item.sauces.map((sauce) => (
                      <h3 key={generateRandomId() + sauce}>{sauce}</h3>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="mx-4 flex-col justify-end">
          <div>
            <h2 className="font-bold text-center">
              £{(item.price * item.quantity).toFixed(2)}
            </h2>
          </div>
          <div>
            <Button color="danger" onClick={() => removeFromCart(item)}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    ));
  } else {
    productsPopup = <p className="text-center">Your cart is empty.</p>;
  }

  let deliveryChargeHTML = null;
  if (products.length > 0) {
    deliveryChargeHTML = (
      <>
        {discountApplied && (
          <div className="flex justify-between text-green-500">
            <span>Discount Applied: {discountCode}</span>
            <span>-£{discountAmount.toFixed(2)}</span>
          </div>
        )}

        {/* Discount Code Section */}
        {!discountApplied ? (
          <DiscountCodeInput onApply={processDiscountCode} />
        ) : (
          <div className="flex justify-end">
            <button
              onClick={removeDiscountCode}
              className="rounded bg-red-500 px-1 py-1 font-bold text-white hover:bg-red-700"
            >
              Remove Discount
            </button>
          </div>
        )}

        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-green-500">
            £{calculateDeliveryCost().toFixed(2)}
          </span>
        </div>
      </>
    );
  }

  let deliveryPopup = null;
  if (!deliveryMethod) {
    deliveryPopup = (
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-4xl font-extrabold text-sfc-blue">
          Delivery or Collection?
        </h2>
      </div>
    );
  }

  let paymentPopup = null;
  if (!paymentMethod) {
    paymentPopup = (
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-4xl font-extrabold text-sfc-blue">
          Payment Method?
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-blue-600 py-4 p-2 bg-blue-50">
      {/* Delivery/Collection Popup */}
      {deliveryPopup}
      {/* Collection/Delivery Selection */}
      <TimeHandler
        deliveryMethod={deliveryMethod}
        todaysDeliveryTimes={todaysDeliveryTimes}
      />
      {products.length > 0 && <Notes />}
      {/* PRODUCTS CONTAINER */}
      {productsPopup}
      {/* PAYMENT CONTAINER */}
      <div className="flex flex-col justify-start gap-4 bg-white p-4 px-10 lg:px-20 xl:px-40">
        {/* Subtotal Section */}
        <div className="flex justify-between">
          <span>Subtotal: ({totalItems} items)</span>
          <span>
            £
            {(discountAmount
              ? totalPrice + discountAmount
              : totalPrice
            ).toFixed(2)}
          </span>
        </div>
        {/* Discount Section */}
        {deliveryChargeHTML}
        {/* Address Display and Change Section */}
        {deliveryMethod === "delivery" && (
          <div className="mt-4 border-t border-gray-200 bg-gray-100 p-4">
            {deliveryAddress ? (
              <div>
                <h3 className="font-semibold">Selected Address:</h3>
                <p>{deliveryAddress.formatted_address.formatted_address_0}</p>
                <p>{deliveryAddress.formatted_address.formatted_address_1}</p>
                <p>{deliveryAddress.formatted_address.formatted_address_2}</p>
                <p>{deliveryAddress.formatted_address.formatted_address_3}</p>
                <p>{deliveryAddress.formatted_address.formatted_address_4}</p>
                <p>{deliveryAddress.postcode}</p>
                <button
                  onClick={openDeliveryModalForChange} // Call the function to open the DeliveryModal for changing the address
                  className="mt-2 rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
                >
                  Change Address
                </button>
              </div>
            ) : (
              <div>
                <p>No address selected.</p>
                <button
                  onClick={openDeliveryModalForChange} // Call the function to open the DeliveryModal for selecting an address
                  className="mt-2 rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
                >
                  Select Address
                </button>
              </div>
            )}
          </div>
        )}

        {/* Conditional rendering of the DeliveryModal */}
        {isDeliveryModalVisible && (
          <DeliveryModal
            todayDeliveryTimes={todaysDeliveryTimes}
            revertToCollection={handleRevertDeliveryToCollection}
            closeModal={handleAddressModalClose}
          />
        )}
        {/* PAYMENT METHOD SECTION */}
        <div className="mt-4 flex flex-col">
          {paymentPopup || (
            <h2 className="text-xl font-extrabold text-center text-sfc-blue py-4">
              Payment Method:
            </h2>
          )}
          <div className="flex">
            <label
              className={`flex-1 cursor-pointer rounded-l-md border px-3 py-2 text-center ${
                paymentMethod === "card"
                  ? "border-blue-500 bg-blue-200"
                  : "border-gray-400 bg-gray-200"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentMethodChange}
                className="sr-only"
              />
              Card
            </label>
            <label
              className={`flex-1 cursor-pointer rounded-r-md border px-3 py-2 text-center ${
                paymentMethod === "cash"
                  ? "border-blue-500 bg-blue-200"
                  : "border-gray-400 bg-gray-200"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
                className="sr-only"
              />
              Cash
            </label>
          </div>
        </div>
        <div className="flex justify-between font-bold text-xl py-4">
          <span>TOTAL (INCL. VAT)</span>
          <span>£{totalPrice.toFixed(2)}</span>
        </div>
        <Tooltip isOpen={isCheckoutDisabled} content="Click to Login">
          {!isCheckoutDisabled ? (
            <Button
              className="w-1/2 self-end rounded-md p-3 text-white"
              onClick={handleCheckout}
              color="primary"
              isLoading={userClickedCheckout}
            >
              CHECKOUT
            </Button>
          ) : (
            <Button
              className="w-1/2 self-end rounded-md p-3 text-white"
              color="warning"
            >
              <Link href="/sign-in">Please Log In To Checkout</Link>
            </Button>
          )}
        </Tooltip>
      </div>
      <Button color="primary" onClick={handleOpenVerification}></Button>
    </div>
  );
};

export default Cart;
