"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { InternalProduct } from "@/types/types";
import { Category } from "@prisma/client";
import Price from "./Price";

interface QuickMenuProps {
  allProducts: InternalProduct[];
  sortedCategories: Category[];
}

const QuickMenu: React.FC<QuickMenuProps> = ({
  allProducts,
  sortedCategories,
}) => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <h1 className="p-2 text-4xl font-bold text-blue-700 mb-2 px-2">
        Categories
      </h1>
      <Accordion
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              height: "auto",
              transition: {
                height: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 1,
                },
                opacity: {
                  easings: "ease",
                  duration: 1,
                },
              },
            },
            exit: {
              y: -10,
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  easings: "ease",
                  duration: 0.25,
                },
                opacity: {
                  easings: "ease",
                  duration: 0.3,
                },
              },
            },
          },
        }}
        isCompact={isCompact}
      >
        {sortedCategories.map((category) => (
          <AccordionItem
            key={category.slug}
            title={category.title}
            aria-label={category.title}
            startContent={
              <Avatar
                src={category.img}
                alt={category.title}
                isBordered
                radius="lg"
                size="lg"
                className="mr-2"
              />
            }
            id={category.slug}
            classNames={{
              title: "font-bold text-xl md:text-3xl",
            }}
          >
            <ul role="list" className="divide-y divide-sfc-blue">
              {allProducts
                .filter((product) => product.catSlug === category.slug)
                .map((product) => (
                  <li key={product.id} className="bg-white">
                    <div className="relative flex items-center space-x-3 px-2 py-5 my-2 hover:bg-gray-50">
                      {/* Product Info */}
                      <div className="min-w-0 flex-1">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-lg font-medium text-gray-900">
                          {product.title}
                        </p>
                        <p className="text-sm text-gray-500">{product.desc}</p>
                      </div>
                      {/* Price Container */}
                      <div className="relative">
                        {/* Price Display */}
                        <div className="bg-blue-500 text-white rounded-full px-2 py-1 flex flex-col items-center text-md my-1">
                          <span className="text-xs">
                            {product.specificMeal!.length > 0 &&
                            product.specificMeal!.some((meal) => meal.price > 0)
                              ? "From"
                              : ""}
                          </span>
                          <span>£{product.price.toFixed(2)}</span>
                        </div>
                        {/* Price Component */}
                        <Price
                          product={product}
                          mealDealPizzas={product.mealDealData!}
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default QuickMenu;
