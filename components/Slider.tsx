"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "Always Fresh, Crispy & Hot",
    description: "Taste the perfection in every bite",
    image: "/CrispyChickenOffFryer.jpeg",
    alt: "Crispy fried chicken straight off the fryer",
  },
  {
    id: 2,
    title: "Delivered Anywhere in Colchester",
    description: "Get your order wherever you are",
    image:
      "https://images.unsplash.com/photo-1607273685680-6bd976c5a5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Delivery scooter",
  },
  {
    id: 3,
    title: "Best Pizza for Family Time",
    description: "Cherish moments with delicious pizza",
    image: "/PepperoniPizza.jpeg",
    alt: "Pepperoni Pizza",
  },
  {
    id: 4,
    title: "Best Kebabs for Family Time",
    description: "Cherish moments with delicious grilled meats",
    image: "/ChickenShish.jpeg",
    alt: "Chicken Shish",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row rounded-md m-2 bg-white">
      <div className="p-2 flex-1 flex items-center justify-center flex-col gap-4 text-blue-700 font-bold">
        <h1 className="py-2 text-5xl text-center uppercase md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <h2 className="text-2xl text-center md:text-3xl">
          {data[currentSlide].description}
        </h2>
        <Link href="/menu">
          <Button size='lg' className="mt-4 bg-sfc-blue text-white py-2 my-2 px-8 text-lg rounded-md font-bold transform transition hover:scale-105 hover:bg-blue-600">
            Start Your Order
          </Button>
        </Link>
      </div>
      <div className="flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt={data[currentSlide].alt}
          height={500}
          width={500}
          className="h-full w-full object-cover rounded-b-md md:rounded-bl-none md:rounded-r-md"
        />
      </div>
    </section>
  );
};

export default Slider;
