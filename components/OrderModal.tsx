"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import useCartStore from "@/utils/store";
import { useRouter } from "next/navigation";
import { AddressSearchComponent } from "./AddressSearchComponent";
import { DeliveryTimes, InternalAddress } from "@/types/types";
import Image from "next/image";
import { GrLinkPrevious } from "react-icons/gr";

type OrderModalProps = {
  todayDeliveryTimes: DeliveryTimes | undefined;
  restaurantClosing: "opening soon" | "closing soon" | "open" | "closed";
  deliveryTimeOptions: { value: string; label: string }[];
  collectionTimeOptions: { value: string; label: string }[];
};

const OrderModal: React.FC<OrderModalProps> = ({
  todayDeliveryTimes,
  restaurantClosing,
  deliveryTimeOptions,
  collectionTimeOptions,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = React.useState("home");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const {
    deliveryAddress,
    setDeliveryMethod,
    setDeliveryTime,
    setDeliveryAddress,
    resetDeliveryAddress,
  } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTimeChange = (key: any) => {
    setSelectedTime(key);
  };

  const handleCollectionConfirmAndGoToMenu = () => {
    router.push("/menu");
    setDeliveryMethod("collection");
    resetDeliveryAddress();
    setDeliveryTime(selectedTime);
  };

  const handleCollectionConfirmAndClose = () => {
    onClose();
    setDeliveryMethod("collection");
    resetDeliveryAddress();
    setDeliveryTime(selectedTime);
  };

  const handleDeliveryConfirm = (Address: InternalAddress) => {
    handleDeliveryTimePage();
    setDeliveryAddress(Address);
  };

  const handleDeliveryTimePage = () => {
    setPage("delivery-time-select");
  };

  const handleDeliveryConfirmAndGoToMenu = () => {
    router.push("/menu");
    setDeliveryMethod("delivery");
    setDeliveryTime(selectedTime);
  };

  const handleDeliveryConfirmAndClose = () => {
    onClose();
    setDeliveryMethod("delivery");
    setDeliveryTime(selectedTime);
  };

  const addressInsertedQuery = () => {
    return deliveryAddress ? handleDeliveryTimePage() : handleDelivery();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen();
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, [onOpen]);

  const handleDelivery = () => {
    setPage("delivery");
  };

  const handleCollection = () => {
    setPage("collection");
  };

  const renderModalContent = () => {
    switch (page) {
      case "delivery":
        return (
          <>
            <h1 className="text-black text-center text-3xl font-extrabold">
              Delivery Page
            </h1>
            <ModalBody>
              <AddressSearchComponent
                handleDeliveryConfirm={handleDeliveryConfirm}
                restaurantState={[
                  restaurantClosing,
                  todayDeliveryTimes?.closingTime || "",
                ]}
                deliveryAddress={deliveryAddress || null}
              />
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center gap-4 w-full">
                <Button color="secondary" size="lg" onPress={handleCollection}>
                  Order for Collection Instead
                </Button>
              </div>
            </ModalFooter>
          </>
        );
      case "delivery-time-select":
        return (
          <>
            <Button
              onClick={handleDelivery}
              className="font-bold bg-blue-500 px-4 py-2 text-white text-lg flex items-center gap-2"
            >
              <GrLinkPrevious />
              Amend Delivery Address
            </Button>
            <ModalBody className="py-8">
              <p className="text-gray-700 text-center text-lg font-medium">
                When would you like your delivery?
              </p>
              <div className="flex justify-center">
                <Select
                  label="Select a time for delivery"
                  className="max-w-xs"
                  value={selectedTime}
                  onSelectionChange={handleTimeChange}
                >
                  {deliveryTimeOptions.map((time, index) => {
                    // Check if the label is 'ASAP' or if it's the first item in the array
                    const isASAP = time.label === "ASAP" || index === 0;
                    // Format the time label only if it's not 'ASAP'
                    const timeLabel = isASAP
                      ? time.label
                      : new Date(time.value).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });

                    return (
                      <SelectItem
                        key={time.value}
                        value={time.value}
                        className="text-black"
                      >
                        {timeLabel}
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>
              <Button
                color="warning"
                as="a"
                size="lg"
                isDisabled={!selectedTime}
                onPress={handleDeliveryConfirmAndClose}
              >
                Confirm & Close
              </Button>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center gap-4 w-full">
                <Button color="secondary" size="lg" onPress={handleCollection}>
                  Order Collection
                </Button>
                <Button
                  color="primary"
                  as="a"
                  size="lg"
                  isDisabled={!selectedTime}
                  onPress={handleDeliveryConfirmAndGoToMenu}
                >
                  Confirm & Go To Menu
                </Button>
              </div>
            </ModalFooter>
          </>
        );
      case "collection":
        return (
          <>
            <ModalBody>
              <p className="text-gray-700 text-center text-lg font-medium">
                When would you like to collect?
              </p>
              <div className="flex justify-center">
                <Select
                  label="Select a time to collect"
                  className="max-w-xs"
                  value={selectedTime}
                  onSelectionChange={handleTimeChange}
                >
                  {collectionTimeOptions.map((time, index) => {
                    // Check if the label is 'ASAP' or if it's the first item in the array
                    const isASAP = time.label === "ASAP" || index === 0;
                    // Format the time label only if it's not 'ASAP'
                    const timeLabel = isASAP
                      ? time.label
                      : new Date(time.value).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });

                    return (
                      <SelectItem
                        key={time.value}
                        value={time.value}
                        className="text-black"
                      >
                        {timeLabel}
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>
              <Button
                color="warning"
                as="a"
                size="lg"
                isDisabled={!selectedTime}
                onPress={handleCollectionConfirmAndClose}
              >
                Confirm & Close
              </Button>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center gap-4 w-full">
                <Button
                  color="primary"
                  size="lg"
                  onPress={addressInsertedQuery}
                >
                  Order Delivery
                </Button>
                <Button
                  color="secondary"
                  as="a"
                  size="lg"
                  isDisabled={!selectedTime}
                  onPress={handleCollectionConfirmAndGoToMenu}
                >
                  Confirm & Go To Menu
                </Button>
              </div>
            </ModalFooter>
          </>
        );
      default:
        return (
          <>
            <ModalBody>
              <Image
                src="https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Delicious Food"
                className="w-full h-auto mb-4"
                width={250}
                height={250}
                priority
              />
              <p className="text-gray-700 text-center text-lg font-medium">
                Craving something delectable? You&apos;re just a few clicks away
                from a mouth-watering experience. Choose your preferred option
                to get started!
              </p>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center gap-4 w-full">
                <Button color="primary" size="lg" onPress={handleDelivery}>
                  Order for Delivery
                </Button>
                <Button color="secondary" size="lg" onPress={handleCollection}>
                  Order for Collection
                </Button>
              </div>
            </ModalFooter>
          </>
        );
    }
  };

  return (
    isClient && (
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center text-black">
            Welcome to Southern Fried Chicken!
          </ModalHeader>
          {renderModalContent()}
        </ModalContent>
      </Modal>
    )
  );
};

export default OrderModal;
