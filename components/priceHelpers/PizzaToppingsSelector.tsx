import { PizzaToppings } from "@prisma/client";
import { renderPrice } from "@/utils/utils";
import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { ToppingsAction, ToppingsState } from "@/types/types";
import { Button } from "@nextui-org/react";
import { initialToppingState } from "@/types/types";

type Props = {
  pizzaToppings: PizzaToppings[];
  defaultPizzaToppings: PizzaToppings[];
  selectedPizzaToppings: PizzaToppings[];
  isFreeChoice: boolean;
  toppingChanges: ToppingsState;
  onToppingSelect: (selected: PizzaToppings[]) => void;
  onStateSelect: (toppingChanges: ToppingsState) => void;
};

const PizzaToppingsSelector: React.FC<Props> = ({
  pizzaToppings,
  defaultPizzaToppings,
  selectedPizzaToppings,
  isFreeChoice,
  toppingChanges,
  onToppingSelect,
  onStateSelect,
}) => {
  const [noToppings, setNoToppings] = useState<PizzaToppings | null>(null);
  const [noCheese, setNoCheese] = useState<PizzaToppings | null>(null);
  const [cheese, setCheese] = useState<PizzaToppings | null>(null);
  const [showCustomization, setShowCustomization] = useState(false);

  const toppingsReducer = (
    state: ToppingsState,
    action: ToppingsAction,
  ): ToppingsState => {
    switch (action.type) {
      case "addTopping": {
        const isPreviouslyRemoved = state.removed.includes(action.payload);
        if (isPreviouslyRemoved) {
          return {
            ...state,
            removed: state.removed.filter((id) => id !== action.payload),
            count: state.count + 1,
          };
        } else {
          return {
            ...state,
            added: [...state.added, action.payload],
            count: state.count + 1,
          };
        }
      }
      case "removeTopping": {
        const isPreviouslyAdded = state.added.includes(action.payload);
        if (isPreviouslyAdded) {
          return {
            ...state,
            added: state.added.filter((id) => id !== action.payload),
            count: state.count - 1,
          };
        } else {
          return {
            ...state,
            removed: [...state.removed, action.payload],
            count: state.count - 1,
          };
        }
      }
      case "reset": {
        return {
          ...initialToppingState,
          count:
            typeof action.payload === "number"
              ? action.payload
              : initialToppingState.count,
        };
      }
      default:
        return state;
    }
  };

  const [pizzaToppingChanges, dispatchPizzaToppingChange] = useReducer(
    toppingsReducer,
    toppingChanges
  );

  useEffect(() => {
    // Identify "No Toppings" and "No Cheese" options
    const noToppingsOption = pizzaToppings.find(
      (topping) => topping.title === "No Toppings"
    );
    const noCheeseOption = pizzaToppings.find(
      (topping) => topping.title === "No Cheese"
    );
    const cheeseOption = pizzaToppings.find(
      (topping) => topping.title === "Cheese"
    );
    setNoToppings(noToppingsOption || null);
    setNoCheese(noCheeseOption || null);
    setCheese(cheeseOption || null);
  }, [pizzaToppings]);

  const handleToppingSelect = (topping: PizzaToppings) => {
    let updatedToppings = [...selectedPizzaToppings];
    const toppingIndex = updatedToppings.findIndex((t) => t.id === topping.id);
    let newToppingChanges = toppingChanges.count;

    if (topping.title === "No Cheese") {
      if (toppingIndex === -1) {
        updatedToppings = updatedToppings.filter((t) => t.title !== "Cheese");
        const extraToppingIndex = updatedToppings.findIndex(
          (t) => t.title === "Extra Cheese"
        );
        if (extraToppingIndex >= 0) {
          // Remove extra version of the topping if present
          dispatchPizzaToppingChange({
            type: "removeTopping",
            payload: updatedToppings[extraToppingIndex].title,
          });
          updatedToppings.splice(extraToppingIndex, 1);
        }
        updatedToppings.push(topping);
      } else {
        updatedToppings = updatedToppings.filter(
          (t) => t.title !== "No Cheese"
        );
        updatedToppings.push(cheese!);
      }
    } else if (topping.title === "Cheese") {
      if (toppingIndex === -1) {
        updatedToppings = updatedToppings.filter(
          (t) => t.title !== "No Cheese"
        );
        updatedToppings.push(topping);
      } else {
        updatedToppings = updatedToppings.filter((t) => t.title !== "Cheese");
        const extraToppingIndex = updatedToppings.findIndex(
          (t) => t.title === "Extra " + topping.title
        );
        if (extraToppingIndex >= 0) {
          // Remove extra version of the topping if present
          dispatchPizzaToppingChange({
            type: "removeTopping",
            payload: updatedToppings[extraToppingIndex].title,
          });
          updatedToppings.splice(extraToppingIndex, 1);
        }
        updatedToppings.push(noCheese!);
      }
    } else if (topping.title === "No Toppings") {
      if (toppingIndex === -1) {
        // Preserving "Cheese" and "No Cheese" but removing others and decrementing accordingly
        const filterToppings = updatedToppings.filter(
          (t) => t.title === "Cheese" || t.title === "No Cheese"
        );

        // Adjusting the final toppings list based on cheese presence
        const cheesePresent = filterToppings.some((t) => t.title === "Cheese");
        updatedToppings = cheesePresent
          ? [noToppings!, cheese!]
          : [noToppings!, noCheese!];

        dispatchPizzaToppingChange({ type: "reset", payload: 0 });
      } else {
        resetToDefaultToppings();
        return;
      }
    } else {
      if (toppingIndex >= 0) {
        const extraToppingIndex = updatedToppings.findIndex(
          (t) => t.title === "Extra " + topping.title
        );
        if (extraToppingIndex >= 0) {
          // Remove extra version of the topping if present
          dispatchPizzaToppingChange({
            type: "removeTopping",
            payload: updatedToppings[extraToppingIndex].title,
          });
          updatedToppings.splice(extraToppingIndex, 1);
        }
        // Remove the topping itself
        dispatchPizzaToppingChange({
          type: "removeTopping",
          payload: topping.title,
        });
        updatedToppings.splice(toppingIndex, 1);
      } else {
        updatedToppings = updatedToppings.filter(
          (t) => t.id !== noToppings?.id
        );
        newToppingChanges++;
        if (newToppingChanges > 2) {
          topping = { ...topping, price: 1.0 };
        }
        dispatchPizzaToppingChange({ type: "addTopping", payload: topping.title });
        updatedToppings.push(topping);
      }
    }
    onToppingSelect(updatedToppings);
  };

  useEffect(() => {
    onStateSelect(pizzaToppingChanges); 
  }, [selectedPizzaToppings, pizzaToppingChanges, onStateSelect]);

  const isToppingSelected = useCallback(
    (toppingId: string) => !!selectedPizzaToppings.find((t) => t.id === toppingId),
    [selectedPizzaToppings]
  );

  const calculateToppingPrice = (topping: PizzaToppings) => {
    // Return "0.00" if less than 2 changes have been made
    if (toppingChanges.count < 2) {
      return null;
    } else {
      // Return "1.00" for additional toppings after 2 changes
      return "1.00";
    }
  };

  const isExtraVersionAvailable = (toppingTitle: string) => {
    return selectedPizzaToppings.some(
      (topping) => topping.title === toppingTitle
    );
  };

  const resetToDefaultToppings = () => {
    if (isFreeChoice) {
      dispatchPizzaToppingChange({ type: "reset", payload: -1 });
    } else {
      dispatchPizzaToppingChange({ type: "reset", payload: 2 });
    }
    onToppingSelect(defaultPizzaToppings);
    setShowCustomization(false);
  };

  const toggleCustomization = () => {
    setShowCustomization((prev) => !prev);
  };

  const standardToppings = pizzaToppings.filter(
    (topping) =>
      !topping.title.startsWith("Extra ") &&
      topping.title !== "No Toppings" &&
      topping.title !== "No Cheese" &&
      topping.title !== "Cheese"
  );
  const extraToppings = pizzaToppings.filter(
    (topping) =>
      topping.title.startsWith("Extra ") &&
      topping.title !== "No Toppings" &&
      topping.title !== "No Cheese" &&
      topping.title !== "Cheese"
  );

  const sortedToppings = useMemo(() => {
    return [...standardToppings].sort((a, b) => {
      const isSelectedA = isToppingSelected(a.id) ? -1 : 1;
      const isSelectedB = isToppingSelected(b.id) ? -1 : 1;
      return isSelectedA - isSelectedB; // Move selected items to the beginning
    });
  }, [standardToppings, isToppingSelected]);

  return (
    <div>
      <h3 className="text-lg font-semibold">
        Choose your toppings <br className="md:hidden" /> (
        {isFreeChoice
          ? "Add up to 3 Toppings for free"
          : "Change up to 2 for free"}
        )
        {!isFreeChoice && (
          <>
            <br />
            <span className="text-sm text-gray-600">
              Just remove current then add your desired toppings!
            </span>
          </>
        )}
      </h3>
      {!showCustomization ? (
        <div className="py-4">
          <div className="flex flex-wrap gap-4">
            {selectedPizzaToppings.map((topping) => (
              <span
                key={topping.id}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {topping.title}
              </span>
            ))}
          </div>
          <Button
            className="mt-3 px-4 py-2 bg-blue-500 text-white border rounded-md"
            onClick={toggleCustomization}
          >
            Customize Toppings
          </Button>
        </div>
      ) : (
        <div className="py-4">
          {/* Render standard toppings */}
          <div className="flex flex-wrap gap-4">
            {sortedToppings.map((topping) => (
              <Button
                key={topping.id}
                className={`text-sm text-center p-2 ring-1 ring-blue-600 rounded-md ${
                  isToppingSelected(topping.id)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600"
                }`}
                onClick={() => handleToppingSelect(topping)}
              >
                {topping.title}
                {!isToppingSelected(topping.id) &&
                  calculateToppingPrice(topping) === "1.00" && (
                    <p className="text-xs">
                      <br />+{calculateToppingPrice(topping)}
                    </p>
                  )}
              </Button>
            ))}
          </div>

          {/* Render extra toppings */}
          {extraToppings.some((topping) => {
            const originalTopping = topping.title.replace("Extra ", "");
            return isExtraVersionAvailable(originalTopping);
          }) && (
            <h1 className="text-lg font-semibold py-4">Some Extra Toppings?</h1>
          )}
          <div className="flex flex-wrap gap-4">
            {extraToppings.map((topping) => {
              const originalTopping = topping.title.replace("Extra ", "");
              if (!isExtraVersionAvailable(originalTopping)) {
                return null;
              }
              return (
                <Button
                  key={topping.id}
                  className={`min-w-[6rem] p-2 ring-1 ring-blue-600 rounded-md ${
                    isToppingSelected(topping.id)
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  }`}
                  onClick={() => handleToppingSelect(topping)}
                >
                  {topping.title}
                  {!isToppingSelected(topping.id) &&
                    calculateToppingPrice(topping) === "1.00" && (
                      <p className="text-xs">
                        <br />+{calculateToppingPrice(topping)}
                      </p>
                    )}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-4 mt-4 py-2">
            {[noToppings, noCheese, cheese].filter(Boolean).map((topping) => (
              <Button
                key={topping!.id}
                className={`min-w-[6rem] p-2 ring-1 ring-blue-600 rounded-md ${
                  isToppingSelected(topping!.id)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600"
                }`}
                onClick={() => handleToppingSelect(topping!)}
              >
                {topping!.title}
                <p className="text-xs">{renderPrice(topping!.price)}</p>
              </Button>
            ))}
          </div>
          <Button
            className="mt-3 px-4 py-2 bg-blue-500 text-white border rounded-md"
            onClick={resetToDefaultToppings}
          >
            Reset to Default Toppings
          </Button>
        </div>
      )}
    </div>
  );
};

export default PizzaToppingsSelector;
