"use client";

import useCartStore from "@/utils/store";
import { capitalizeFirstLetter, normalizeDate } from "@/utils/utils";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { DeliveryTimes } from "@/types/types";
import { useState } from "react";

type TimeHandlerProps = {
  deliveryMethod?: string;
  todaysDeliveryTimes: DeliveryTimes | null;
};

const TimeHandler: React.FC<TimeHandlerProps> = ({
  deliveryMethod,
  todaysDeliveryTimes,
}) => {
  const { deliveryTime, setDeliveryTime, switchDeliveryMethod } =
    useCartStore();
  const [showDeliveryTimes, setShowDeliveryTimes] = useState(false);
  const [showCollectionTimes, setShowCollectionTimes] = useState(false);

  const generateTimeOptions = (method: "collection" | "delivery") => {
    if (!todaysDeliveryTimes) {
      return [];
    }

    let timeOptions = [];
    let currentTime = new Date();

    const [openingHour, openingMinute] = todaysDeliveryTimes.openingTime
      .split(":")
      .map(Number);
    const [closingHour, closingMinute] = todaysDeliveryTimes.closingTime
      .split(":")
      .map(Number);

    const openingTime = new Date(currentTime);
    openingTime.setHours(openingHour, openingMinute, 0, 0);

    const closingTime = new Date(currentTime);
    closingTime.setHours(closingHour, closingMinute, 0, 0);
    closingTime.setDate(closingTime.getDate() + 1);

    // Round up current time to the next quarter hour
    const remainder = 15 - (currentTime.getMinutes() % 15);
    currentTime.setMinutes(currentTime.getMinutes() + remainder, 0, 0);

    let timeToStart = currentTime > openingTime ? currentTime : openingTime;

    // For delivery, add 60 minutes to the current time for the first slot after ASAP
    if (method === "delivery") {
      timeToStart.setMinutes(timeToStart.getMinutes() + 60);
    } else if (method === "collection") {
      timeToStart.setMinutes(timeToStart.getMinutes() + 30);
    }

    const asap = new Date(timeToStart).setMinutes(
      timeToStart.getMinutes() - 15
    );
    const value = new Date(asap).toISOString(); // ISO string format

    // Add an "ASAP" option as the first time slot
    timeOptions.push({ value: value, label: "ASAP" });

    while (timeToStart <= closingTime) {
      timeToStart.setMinutes(timeToStart.getMinutes() + 15); // Increment time slots by 15 minutes
      const value = timeToStart.toISOString(); // ISO string format

      // Format the display label as needed (e.g., HH:MM)
      const label = timeToStart.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      timeOptions.push({ value: value, label: label });
    }

    return timeOptions;
  };

  const collectionTimeOptions = generateTimeOptions("collection");
  const deliveryTimeOptions = generateTimeOptions("delivery");

  const handleTimeChange = (key: any) => {
    setDeliveryTime(key);
    if (deliveryMethod === "collection") {
      setShowCollectionTimes(false);
    } else if (deliveryMethod === "delivery") {
      setShowDeliveryTimes(false);
    }
  };

  const handleChangeDeliveryTime = () => {
    if (showCollectionTimes === true || showDeliveryTimes === true) {
      setShowCollectionTimes(false);
      setShowDeliveryTimes(false);
    } else {
      if (deliveryMethod === "collection") {
        setShowCollectionTimes(true);
      } else if (deliveryMethod === "delivery") {
        setShowDeliveryTimes(true);
      }
    }
  };

  const handleDeliveryOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (
      event.target.value === "collection" ||
      event.target.value === "delivery"
    ) {
      switchDeliveryMethod(event.target.value);
      if (showCollectionTimes === true || showDeliveryTimes === true) {
        setShowCollectionTimes(false);
        setShowDeliveryTimes(false);
      }
    }
  };

  let renderChangeDeliveryTimeButton = null;
  if (showDeliveryTimes) {
    renderChangeDeliveryTimeButton = (
      <Button
        color="warning"
        className="p-2 text-white"
        onClick={handleChangeDeliveryTime}
      >
        Cancel Changing {capitalizeFirstLetter(deliveryMethod)} Time
      </Button>
    );
  } else {
    renderChangeDeliveryTimeButton = (
      <Button color="secondary" onClick={handleChangeDeliveryTime}>
        Change {capitalizeFirstLetter(deliveryMethod)} Time
      </Button>
    );
  }

  let deliveryTimeSelect = null;
  if (showDeliveryTimes) {
    deliveryTimeSelect = (
      <Select
        label="Select a delivery time"
        labelPlacement="outside-left"
        className="max-w-xs p-4"
        value={deliveryTime}
        onSelectionChange={handleTimeChange}
      >
        {deliveryTimeOptions.map((time) => (
          <SelectItem
            key={time.value}
            value={time.value}
            className="text-center w-auto"
          >
            {time.label}
          </SelectItem>
        ))}
      </Select>
    );
  }

  let collectionTimeSelect = null;
  if (showCollectionTimes) {
    collectionTimeSelect = (
      <Select
        label="Select a collection time"
        labelPlacement="outside-left"
        className="max-w-xs p-4"
        value={deliveryTime}
        onSelectionChange={handleTimeChange}
      >
        {collectionTimeOptions.map((time) => (
          <SelectItem
            key={time.value}
            value={time.value}
            className="text-center w-auto"
          >
            {time.label}
          </SelectItem>
        ))}
      </Select>
    );
  }

  let currentDeliveryTime = null;
  if (deliveryTime) {
    currentDeliveryTime = (
      <h2 className="px-3 text-center text-lg font-bold">
        {capitalizeFirstLetter(deliveryMethod)} Time:{" "}
        {deliveryTime === "ASAP" ? "ASAP" : normalizeDate(deliveryTime)}
      </h2>
    );
  }

  return (
    <div className="flex items-stretch justify-around p-2">
      <label
        className={`flex cursor-pointer flex-col justify-center rounded-md border-2 px-4 ${
          deliveryMethod === "collection"
            ? "border-blue-500 bg-blue-200"
            : "border-gray-400 bg-gray-200"
        }`}
      >
        <input
          type="radio"
          name="deliveryOption"
          value="collection"
          checked={deliveryMethod === "collection"}
          onChange={handleDeliveryOptionChange}
          className="sr-only" // Hides the radio button but keeps it accessible
        />
        <span className="text-lg font-semibold">Collection</span>
        <span className="block text-center text-sm text-gray-600">15 mins</span>
      </label>
      <div className="flex flex-col items-center space-y-4">
        {currentDeliveryTime}
        {renderChangeDeliveryTimeButton}
        {collectionTimeSelect}
        {deliveryTimeSelect}
      </div>
      <label
        className={`flex cursor-pointer flex-col justify-center rounded-md border-2 px-4 ${
          deliveryMethod === "delivery"
            ? "border-blue-500 bg-blue-200"
            : "border-gray-400 bg-gray-200"
        }`}
      >
        <input
          type="radio"
          name="deliveryOption"
          value="delivery"
          checked={deliveryMethod === "delivery"}
          onChange={handleDeliveryOptionChange}
          className="sr-only"
        />
        <span className="text-lg font-semibold">Delivery</span>
        <span className="block text-center text-sm text-gray-600">
          45-60 mins
        </span>
      </label>
    </div>
  );
};

export default TimeHandler;
