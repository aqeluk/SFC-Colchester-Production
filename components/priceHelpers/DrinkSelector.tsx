import React from "react";
import { DrinkOption } from "@prisma/client";

type Props = {
  drinks: DrinkOption[];
  onSelect: (selectedDrink: DrinkOption[]) => void;
  selectedDrinks: DrinkOption[];
  isTwoDrinkMeal: boolean;
};

const DrinkSelector: React.FC<Props> = ({
  drinks,
  onSelect,
  selectedDrinks,
  isTwoDrinkMeal,
}) => {
  const handleDrinkSelect = (selectedDrink: DrinkOption) => {
    if (!isTwoDrinkMeal || selectedDrinks.length < 2) {
      onSelect([selectedDrink]);
    } else {
      onSelect([selectedDrinks[1], selectedDrink]);
    }
  };

  const renderDrinkTitle = (drink: DrinkOption) => {
    let title = drink.title;
    if (
      isTwoDrinkMeal &&
      selectedDrinks.filter((d) => d.id === drink.id).length === 2
    ) {
      title += " x2";
    }
    return title;
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <h3 className="text-lg font-semibold w-full">
        {isTwoDrinkMeal ? "Select your drinks" : "Select a Drink"}
      </h3>
      {drinks.map((drink) => (
        <button
          key={drink.id}
          className={`px-4 py-2 border rounded-md ${
            selectedDrinks.some((d) => d.id === drink.id)
              ? "bg-red-500 text-white"
              : "bg-red-200 text-red-700"
          }`}
          onClick={() => handleDrinkSelect(drink)}
        >
          {renderDrinkTitle(drink)}
        </button>
      ))}
    </div>
  );
};

export default DrinkSelector;
