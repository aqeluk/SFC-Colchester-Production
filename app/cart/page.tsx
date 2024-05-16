import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

const getRestaurant = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}/api/restaurant`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const userAddresses = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}/api/restaurant`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const verifyDiscountCode = async (code: string) => {
  'use server'
  const res = await fetch(`${process.env.API_ENDPOINT}/api/discount/${code}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to verify the discount code.");
  }
  return res.json();
};

const CartPage = async () => {
  let currentTime = new Date();
  const restaurant = await getRestaurant();
  const currentDay = currentTime.toLocaleString("en-us", {
    weekday: "long",
  });
  const todayDeliveryTime = restaurant.deliveryTimes.find(
    (d: { day: string }) => d.day === currentDay
  );
  return (
    <>
      <Cart
        todaysDeliveryTimes={todayDeliveryTime}
        verifyDiscountCode={verifyDiscountCode}
      />
    </>
  );
};

export default CartPage;
