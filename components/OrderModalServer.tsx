import OrderModal from "./OrderModal";
import { prisma } from "@/utils/connect";
import { DeliveryTimes, Restaurant } from "@/types/types";
import OrderModalWrapper from "./OrderModalWrapper";

const OrderModalServer = async () => {
  const restaurant: Restaurant | null = await prisma.restaurant.findFirst({
    include: {
      deliveryTimes: true,
    },
  });
  let currentTime = new Date();
  const currentDay = currentTime.toLocaleString("en-us", {
    weekday: "long",
  });
  let restaurantClosing: "opening soon" | "closing soon" | "open" | "closed" =
    "closed";
  const todayDeliveryTimes: DeliveryTimes | undefined =
    restaurant?.deliveryTimes.find(
      (d: { day: string }) => d.day === currentDay
    );

  const generateRestaurantString = () => {
    if (todayDeliveryTimes?.openingTime && todayDeliveryTimes?.closingTime) {
      const [openingHour, openingMinute] = todayDeliveryTimes.openingTime
        .split(":")
        .map(Number);
      const [closingHour, closingMinute] = todayDeliveryTimes.closingTime
        .split(":")
        .map(Number);

      // Create new Date objects for opening and closing times
      const openingTime = new Date(currentTime.getTime());
      openingTime.setHours(openingHour, openingMinute, 0, 0);
      const closingTime = new Date(currentTime.getTime());
      closingTime.setHours(closingHour, closingMinute, 0, 0);
      closingTime.setDate(closingTime.getDate() + 1);

      // Calculate one hour before closing and one hour after opening
      const oneHourBeforeClosing = new Date(closingTime.getTime());
      oneHourBeforeClosing.setMinutes(closingTime.getMinutes() - 60);
      const oneHourBeforeOpening = new Date(openingTime.getTime());
      oneHourBeforeOpening.setMinutes(openingTime.getMinutes() + 60);

      if (currentTime < openingTime && currentTime > oneHourBeforeOpening) {
        restaurantClosing = "opening soon";
      } else if (
        currentTime > oneHourBeforeClosing &&
        currentTime < closingTime
      ) {
        restaurantClosing = "closing soon";
      } else if (currentTime >= openingTime && currentTime <= closingTime) {
        restaurantClosing = "open";
      } else {
        restaurantClosing = "closed";
      }
    }
  };

  const generateTimeOptions = (method: "collection" | "delivery") => {
    if (!restaurant || !todayDeliveryTimes) {
      return [];
    }

    let timeOptions = [];

    const [openingHour, openingMinute] = todayDeliveryTimes.openingTime
      .split(":")
      .map(Number);
    const [closingHour, closingMinute] = todayDeliveryTimes.closingTime
      .split(":")
      .map(Number);

    const openingTime = new Date(currentTime.getTime());
    openingTime.setHours(openingHour, openingMinute, 0, 0);

    const closingTime = new Date(currentTime.getTime());
    closingTime.setHours(closingHour, closingMinute, 0, 0);
    closingTime.setDate(closingTime.getDate() + 1);

    // Add an "ASAP" option as the first time slot
    timeOptions.push({ value: "ASAP", label: "ASAP" });

    const roundedTime = new Date(currentTime);

    // Round up current time to the next quarter hour
    const remainder = 15 - (currentTime.getMinutes() % 15);
    roundedTime.setMinutes(currentTime.getMinutes() + remainder, 0, 0);

    let timeToStart = roundedTime > openingTime ? roundedTime : openingTime;

    // For delivery, add 60 minutes to the current time for the first slot after ASAP
    if (method === "delivery") {
      timeToStart.setMinutes(timeToStart.getMinutes() + 60);
    } else if (method === "collection") {
      timeToStart.setMinutes(timeToStart.getMinutes() + 30);
    }
    while (timeToStart <= closingTime) {
      const value = timeToStart.toISOString(); // ISO string format

      // Format the display label as needed (e.g., HH:MM)
      const label = timeToStart.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      timeOptions.push({ value: value, label: label });
      timeToStart.setMinutes(timeToStart.getMinutes() + 15); // Increment time slots by 15 minutes
    }

    return timeOptions;
  };

  generateRestaurantString();
  const collectionTimeOptions = generateTimeOptions("collection");
  const deliveryTimeOptions = generateTimeOptions("delivery");

  return (
    <OrderModalWrapper>
      <OrderModal
        todayDeliveryTimes={todayDeliveryTimes}
        restaurantClosing={restaurantClosing}
        deliveryTimeOptions={deliveryTimeOptions}
        collectionTimeOptions={collectionTimeOptions}
      />
    </OrderModalWrapper>
  );
};

export const dynamic = "force-dynamic";

export default OrderModalServer;
