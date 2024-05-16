"use client";

import useCartStore from "@/utils/store";
import { useEffect } from "react";

const Basket = () => {
  const { totalPrice } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const formattedPrice = `£${totalPrice.toFixed(2)}`;

  return <span className="text-lg mx-2 hidden md:block">{formattedPrice}</span>;
};

export default Basket;
