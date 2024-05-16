"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import useCartStore from "@/utils/store";
import { AddressSearchComponent } from "../AddressSearchComponent";
import { DeliveryTimes, InternalAddress } from "@/types/types";
import { useEffect, useState } from "react";

type DeliveryModalProps = {
  todayDeliveryTimes: DeliveryTimes | null;
  revertToCollection: () => void;
  closeModal: () => void;
};

const DeliveryModal: React.FC<DeliveryModalProps> = ({
  todayDeliveryTimes,
  revertToCollection,
  closeModal
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deliveryAddress, setDeliveryAddress } = useCartStore();
  const [restaurantClosing, setRestaurantClosing] = useState<
    "opening soon" | "closing soon" | "open" | "closed"
  >("closed");

  useEffect(() => {
    generateRestaurantString();
    onOpen();
  });

  const generateRestaurantString = () => {
    let currentTime = new Date();
    if (todayDeliveryTimes?.openingTime && todayDeliveryTimes?.closingTime) {
      const [openingHour, openingMinute] = todayDeliveryTimes.openingTime
        .split(":")
        .map(Number);
      const [closingHour, closingMinute] = todayDeliveryTimes.closingTime
        .split(":")
        .map(Number);

      // Create new Date objects for opening and closing times
      const openingTime = new Date(currentTime);
      openingTime.setHours(openingHour, openingMinute, 0, 0);
      const closingTime = new Date(currentTime);
      closingTime.setHours(closingHour, closingMinute, 0, 0);
      closingTime.setDate(closingTime.getDate() + 1);

      // Calculate one hour before closing and one hour after opening
      const oneHourBeforeClosing = new Date(closingTime);
      oneHourBeforeClosing.setMinutes(closingTime.getMinutes() - 60);
      const oneHourBeforeOpening = new Date(openingTime);
      oneHourBeforeOpening.setMinutes(openingTime.getMinutes() + 60);

      if (currentTime < openingTime && currentTime > oneHourBeforeOpening) {
        setRestaurantClosing("opening soon");
      } else if (
        currentTime > oneHourBeforeClosing &&
        currentTime < closingTime
      ) {
        setRestaurantClosing("closing soon");
      } else if (currentTime >= openingTime && currentTime <= closingTime) {
        setRestaurantClosing("open");
      } else {
        setRestaurantClosing("closed");
      }
    }
  };

  const handleDeliveryConfirm = (Address: InternalAddress) => {
    setDeliveryAddress(Address);
    closeModalHandler();
  };
  
  const closeModalHandler = () => {
    closeModal();
    onClose();
  }

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center text-black">
            Welcome to Southern Fried Chicken!
          </ModalHeader>
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
          <ModalFooter className="flex justify-center">
          <Button
            color="secondary"
            size="lg"
            onClick={revertToCollection}
          >
            Order For Collection Instead
          </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeliveryModal;
