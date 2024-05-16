"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { SpecificExtra, DrinkOption, PizzaToppings } from "@prisma/client";
import {
  InternalProduct,
  GenericMeal,
  SpecificMeal,
  ToppingsState,
  MealDealPizzaType,
  initialToppingState,
  initialFreePizzaToppingState,
} from "@/types/types";
import useCartStore from "@/utils/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import isEqual from "lodash/isEqual";
import SaladSelector from "./priceHelpers/SaladSelector";
import SauceSelector from "./priceHelpers/SauceSelector";
import FilletQuantitySelector from "./priceHelpers/FilletQuantitySelector";
import DrinkSelector from "./priceHelpers/DrinkSelector";
import SpecificExtrasSelector from "./priceHelpers/SpecificExtrasSelector";
import GenericMealSelector from "./priceHelpers/GenericMealSelector";
import SpecificMealSelector from "./priceHelpers/SpecificMealSelector";
import PizzaToppingsSelector from "./priceHelpers/PizzaToppingsSelector";
import { uniqueId } from "lodash";

const Price = React.memo(
  ({
    product,
    mealDealPizzas,
  }: {
    product: InternalProduct;
    mealDealPizzas: InternalProduct[] | null;
  }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [total, setTotal] = useState(product.price);
    const [quantity, setQuantity] = useState(1);
    const [selectedGenericMeal, setSelectedGenericMeal] =
      useState<GenericMeal | null>(null);
    const [selectedSpecificMeal, setSelectedSpecificMeal] =
      useState<SpecificMeal | null>(null);
    const [selectedExtra, setSelectedExtra] = useState<SpecificExtra[]>([]);
    const [selectedSalads, setSelectedSalads] = useState<string[]>([]);
    const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
    const [selectedDrinks, setSelectedDrinks] = useState<DrinkOption[]>([]);
    const [filletQuantity, setFilletQuantity] = useState(1);
    const [selectedPizzaToppings, setSelectedPizzaToppings] = useState<
      PizzaToppings[]
    >([]);
    const [isCustomizingPizza, setIsCustomizingPizza] = useState(false);
    const [currentCustomizingPizza, setCurrentCustomizingPizza] =
      useState<InternalProduct | null>(null);
    const [pizzaToppingsMap, setPizzaToppingsMap] = useState<{
      [pizzaId: string]: MealDealPizzaType;
    }>({});
    const [toppingChanges, setToppingChanges] =
      useState<ToppingsState>(initialToppingState);

    const { addToCart } = useCartStore();
    const previousProductRef = useRef<InternalProduct>();

    const isTwoDrinkMeal =
      product.title === "Double Donner Delight" ||
      product.title === "Chicken Medley Feast";

    let maxPizzas: number = 0;
    switch (product.title) {
      case "Pizza Party Pack":
        maxPizzas = 1;
        break;
      case "Double Delight Pizza Feast":
        maxPizzas = 2;
        break;
      case "The Ultimate Trio Pizza":
        maxPizzas = 3;
        break;
    }

    useEffect(() => {
      useCartStore.persist.rehydrate();
    }, []);

    const initializeSelection = useCallback(() => {
      if (isEqual(previousProductRef.current, product)) {
        // If product hasn't changed, don't re-run initialization logic
        return;
      }

      previousProductRef.current = product;
      // Check if 'Standard' is an available specific extra
      const standardExtra = product.specificExtra?.find(
        (extra) => extra.title === "Standard"
      );

      if (standardExtra) {
        setSelectedExtra([standardExtra]);
      } else {
        let defaultExtra = product.specificExtra?.find(
          (extra) => extra.title === "Cheese"
        );
        if (!defaultExtra) {
          defaultExtra = product.specificExtra?.find(
            (extra) => extra.title === "No Cheese"
          );
        }
        if (defaultExtra) {
          setSelectedExtra([defaultExtra]);
        }
      }
      if (product.specificMeal && product.specificMeal.length <= 3) {
        // Find an extra with a price of 0
        const freeExtra = product.specificMeal.find(
          (extra) => extra.price === 0
        );
        if (freeExtra) {
          setSelectedSpecificMeal(freeExtra);
        } else {
          if (product.specificMeal && product.specificMeal.length > 0) {
            setSelectedSpecificMeal(product.specificMeal[0]);
          }
        }
      }
      setSelectedSalads(
        (product.defaultSalads || []).map((salad) => salad.title)
      );
      setSelectedSauces(
        (product.defaultSauces || []).map((sauce) => sauce.title)
      );
      if (
        (product.title === "Family Buckets" ||
          product.catSlug === "meal-deals") &&
        product.genericMeal &&
        product.genericMeal.length === 1
      ) {
        setSelectedGenericMeal(product.genericMeal[0]);
        if (isTwoDrinkMeal) {
          setSelectedDrinks([
            product.genericMeal[0].DrinkOptions[0],
            product.genericMeal[0].DrinkOptions[1],
          ]);
        } else {
          setSelectedDrinks([product.genericMeal[0].DrinkOptions[0]]);
        }
      }
      let pittaExtra = product.specificExtra?.find(
        (extra) => extra.title === "Pitta Bread"
      );
      if (pittaExtra) {
        setSelectedExtra([pittaExtra]);
      }
      if (product.catSlug === "pizzas" && product.defaultPizzaToppings) {
        setSelectedPizzaToppings(product.defaultPizzaToppings);
        if (product.specificExtra) {
          setSelectedExtra([product.specificExtra[0]]);
        }
      }
    }, [product, isTwoDrinkMeal]);

    useEffect(() => {
      initializeSelection();
    }, [initializeSelection]);

    const calculateTotal = useCallback(() => {
      let additionalPrice = 0;

      // Calculate extra prices for specific extras, generic meals, specific meals
      if (selectedExtra.length > 0) {
        additionalPrice += selectedExtra.reduce(
          (sum, extra) => sum + extra.price,
          0
        );
      }
      if (selectedGenericMeal) {
        additionalPrice += selectedGenericMeal.price;
      }
      if (selectedSpecificMeal) {
        additionalPrice += selectedSpecificMeal.price;
      }

      if (selectedPizzaToppings.length > 0) {
        additionalPrice += selectedPizzaToppings.reduce(
          (sum, topping) => sum + topping.price,
          0
        );
      }
      if (Object.keys(pizzaToppingsMap).length > 0) {
        Object.values(pizzaToppingsMap).forEach((mealDealPizza) => {
          additionalPrice += mealDealPizza.toppings.reduce(
            (sum, topping) => sum + topping.price,
            0
          );
          additionalPrice += mealDealPizza.pizzaBase.price;
        });
      }

      // Set the total price
      if (product.title === "Chicken Fillets") {
        setTotal(quantity * (product.price * filletQuantity + additionalPrice));
      } else {
        setTotal(quantity * (product.price + additionalPrice));
      }
    }, [
      product,
      quantity,
      filletQuantity,
      selectedExtra,
      selectedGenericMeal,
      selectedSpecificMeal,
      selectedPizzaToppings,
      pizzaToppingsMap,
    ]);

    useEffect(() => {
      calculateTotal();
    });

    const handleGenericMealSelection = (
      selectedMeal: GenericMeal | null,
      drinkOptions: DrinkOption[] | null
    ) => {
      setSelectedGenericMeal(selectedMeal);
      if (drinkOptions && drinkOptions.length > 0) {
        setSelectedDrinks([drinkOptions[0]]); // Select the first drink option by default
      } else {
        setSelectedDrinks([]); // Clear drink selection if no meal is selected
      }
    };

    const handleSpecificMealSelect = (selectedMeal: SpecificMeal | null) => {
      setSelectedSpecificMeal(selectedMeal);
    };

    const handleExtraSelect = (selected: SpecificExtra[]) => {
      setSelectedExtra(selected);
    };

    const handleMealDealPizzaToppingSelect = useCallback(
      (selected: PizzaToppings[]) => {
        if (isCustomizingPizza && currentCustomizingPizza) {
          setPizzaToppingsMap((prev) => ({
            ...prev,
            [currentCustomizingPizza.id]: {
              ...prev[currentCustomizingPizza.id],
              toppings: selected,
            },
          }));
        }
      },
      [isCustomizingPizza, currentCustomizingPizza]
    );

    const handleMealDealPizzaStateSelect = useCallback(
      (updatedToppingChanges: ToppingsState) => {
        if (isCustomizingPizza && currentCustomizingPizza) {
          setPizzaToppingsMap((prev) => ({
            ...prev,
            [currentCustomizingPizza.id]: {
              ...prev[currentCustomizingPizza.id],
              toppingChanges: updatedToppingChanges,
            },
          }));
        }
      },
      [isCustomizingPizza, currentCustomizingPizza]
    );

    const handlePizzaBaseSelect = useCallback(
      (selected: SpecificExtra[]) => {
        if (isCustomizingPizza && currentCustomizingPizza) {
          setPizzaToppingsMap((prev) => {
            return {
              ...prev,
              [currentCustomizingPizza.id]: {
                ...prev[currentCustomizingPizza.id],
                pizzaBase: selected[0],
              },
            };
          });
        }
      },
      [isCustomizingPizza, currentCustomizingPizza]
    );

    const handleRegularPizzaToppingSelect = useCallback(
      (selected: PizzaToppings[]) => {
        setSelectedPizzaToppings(selected);
      },
      [setSelectedPizzaToppings]
    );

    const handleDrinkSelection = (selectedDrinks: DrinkOption[]) => {
      setSelectedDrinks(selectedDrinks);
    };

    const handlePizzaSelection = useCallback(
      (pizza: InternalProduct) => {
        setIsCustomizingPizza(false);
        setCurrentCustomizingPizza(null);

        setPizzaToppingsMap((prevSelected) => {
          const alreadySelected = prevSelected.hasOwnProperty(pizza.id);
          let newSelectedPizzas: { [pizzaId: string]: MealDealPizzaType } = {};

          if (alreadySelected) {
            // Remove the selected pizza
            newSelectedPizzas = { ...prevSelected };
            delete newSelectedPizzas[pizza.id];
          } else {
            const isFreeChoice = pizza.title === "Create Your Own Pizza";
            // Add new pizza if maxPizzas not reached
            if (Object.keys(prevSelected).length < maxPizzas) {
              newSelectedPizzas = {
                ...prevSelected,
                [pizza.id]: {
                  pizza: pizza,
                  pizzaBase: pizza.specificExtra![0],
                  toppings: pizza.defaultPizzaToppings || [],
                  toppingChanges: isFreeChoice
                    ? initialFreePizzaToppingState
                    : initialToppingState,
                },
              };
            } else {
              newSelectedPizzas = Object.fromEntries(
                Object.entries(prevSelected).slice(1)
              );
              newSelectedPizzas[pizza.id] = {
                pizza: pizza,
                pizzaBase: pizza.specificExtra![0],
                toppings: pizza.defaultPizzaToppings || [],
                toppingChanges: isFreeChoice
                  ? initialFreePizzaToppingState
                  : initialToppingState,
              };
            }
          }
          return newSelectedPizzas;
        });
      },
      [
        setPizzaToppingsMap,
        setIsCustomizingPizza,
        setCurrentCustomizingPizza,
        maxPizzas,
      ]
    );

    const handleCustomizePizza = useCallback(
      (pizza: InternalProduct) => {
        setIsCustomizingPizza(true);
        setCurrentCustomizingPizza(pizza);
      },
      [
        setCurrentCustomizingPizza,
        setIsCustomizingPizza,
      ]
    );

    const formatSelectedExtras = (selectedExtra: SpecificExtra[]) => {
      if (selectedExtra.length === 0) return [];
      return selectedExtra.map((extra) => {
        return {
          title: extra.title,
          price: extra.price,
        };
      });
    };

    const formatSpecificMeal = (selectedSpecificMeal: SpecificMeal | null) => {
      if (!selectedSpecificMeal) return undefined;
      return {
        title: selectedSpecificMeal.title,
        price: selectedSpecificMeal.price,
      };
    };

    const formatPizzaToppings = (toppings: PizzaToppings[]) => {
      if (toppings.length === 0) return [];
      return toppings.map((topping) => {
        return {
          title: topping.title,
          price: topping.price,
        };
      });
    };

    const selectedPizzasWithType = Object.values(pizzaToppingsMap).map(
      (pizza) => {
        return {
          pizza: pizza.pizza.title,
          pizzaBase: formatSelectedExtras([pizza.pizzaBase] || []),
          toppings: formatPizzaToppings(pizza.toppings),
          toppingChanges: pizza.toppingChanges,
        };
      }
    );

    const formattedSelectedGenericMeal = selectedGenericMeal
      ? {
          title: selectedGenericMeal?.title,
          price: selectedGenericMeal?.price,
        }
      : undefined;

    const handleCart = () => {
      if (maxPizzas > 0 && Object.keys(pizzaToppingsMap).length !== maxPizzas) {
        toast.error(`Please select ${maxPizzas} pizzas.`);
        throw Error;
      }
      if (product.salads?.length && !selectedSalads.length) {
        toast.error("Please select at least one salad.");
        throw Error;
      }
      if (product.sauces?.length && !selectedSauces.length) {
        toast.error("Please select at least one sauce.");
        throw Error;
      }
      addToCart({
        id: uniqueId(),
        productId: product.id,
        title: product.title,
        img: product.img || undefined,
        price: total / quantity,
        quantity: quantity,
        extras: formatSelectedExtras(selectedExtra),
        genericMeal: formattedSelectedGenericMeal,
        specificMeal: formatSpecificMeal(selectedSpecificMeal),
        salads: selectedSalads ?? undefined,
        sauces: selectedSauces ?? undefined,
        drink: selectedDrinks.map((drink) => drink.title),
        pizzaToppings: formatPizzaToppings(selectedPizzaToppings),
        selectedPizzas: selectedPizzasWithType,
        filletQuantity: filletQuantity,
      });
      toast.success("The product added to the cart!");
    };

    return (
      <>
        <Button
          className="sm:text-sm"
          size="sm"
          color="primary"
          onPress={onOpen}
        >
          Add Item
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-3xl">
                  {product.title}
                </ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                  {/* FILLET QUANTITY CONTAINER */}
                  {product.title === "Chicken Fillets" && (
                    <FilletQuantitySelector
                      filletQuantity={filletQuantity}
                      setFilletQuantity={setFilletQuantity}
                    />
                  )}
                  {/* PIZZA TOPPINGS CONTAINER */}
                  {product.catSlug === "pizzas" && (
                    <PizzaToppingsSelector
                      pizzaToppings={product.pizzaToppings || []}
                      defaultPizzaToppings={product.defaultPizzaToppings || []}
                      selectedPizzaToppings={selectedPizzaToppings}
                      isFreeChoice={
                        product.title === "Create Your Own Pizza" ? true : false
                      }
                      toppingChanges={toppingChanges}
                      onToppingSelect={handleRegularPizzaToppingSelect}
                      onStateSelect={(state) => setToppingChanges(state)}
                    />
                  )}
                  {/* Pizzas Selection for Meal Deals */}
                  {product.catSlug === "meal-deals" && mealDealPizzas && (
                    <div>
                      <h3 className="text-lg font-semibold">
                        Select Your Pizzas
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {mealDealPizzas.map((pizza) => (
                          <div
                            key={pizza.id}
                            className="flex flex-col items-center gap-2"
                          >
                            <button
                              className={`px-4 py-2 border rounded-md ${
                                pizzaToppingsMap.hasOwnProperty(pizza.id)
                                  ? "bg-green-500 text-white"
                                  : "bg-green-200 text-green-700"
                              }`}
                              onClick={() => handlePizzaSelection(pizza)}
                            >
                              {pizza.title}
                            </button>
                            {pizzaToppingsMap.hasOwnProperty(pizza.id) && (
                              <button
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                onClick={() => handleCustomizePizza(pizza)}
                              >
                                {currentCustomizingPizza?.id === pizza.id
                                  ? "Customizing"
                                  : "Customize"}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Customize Pizza Toppings */}
                  {isCustomizingPizza && currentCustomizingPizza && (
                    <div>
                      {/* Pizza Customization UI - Modal or Inline */}
                      <PizzaToppingsSelector
                        pizzaToppings={
                          currentCustomizingPizza.pizzaToppings || []
                        }
                        defaultPizzaToppings={
                          currentCustomizingPizza.defaultPizzaToppings || []
                        }
                        selectedPizzaToppings={
                          pizzaToppingsMap[currentCustomizingPizza.id].toppings
                        }
                        isFreeChoice={
                          currentCustomizingPizza.title ===
                          "Create Your Own Pizza"
                            ? true
                            : false
                        }
                        toppingChanges={
                          pizzaToppingsMap[currentCustomizingPizza.id]
                            .toppingChanges
                        }
                        onToppingSelect={handleMealDealPizzaToppingSelect}
                        onStateSelect={handleMealDealPizzaStateSelect}
                      />
                      {/* SPECIFIC EXTRAS CONTAINER */}
                      {currentCustomizingPizza.specificExtra &&
                        currentCustomizingPizza.specificExtra.length > 0 && (
                          <SpecificExtrasSelector
                            specificExtras={
                              currentCustomizingPizza.specificExtra
                            }
                            selectedExtras={[
                              pizzaToppingsMap[currentCustomizingPizza.id]
                                .pizzaBase,
                            ]}
                            onSelect={handlePizzaBaseSelect}
                            isKebab={false}
                            isPotatoes={false}
                            canSelectExtra={
                              currentCustomizingPizza.selectableSpecificExtras
                            }
                            selectedSpecificMeal={null}
                          />
                        )}
                      <button
                        className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
                        onClick={() => {
                          setCurrentCustomizingPizza(null);
                          setIsCustomizingPizza(false);
                        }}
                      >
                        Done Customizing
                      </button>
                    </div>
                  )}
                  {/* SPECIFIC MEAL TYPES CONTAINER */}
                  {product.specificMeal && product.specificMeal.length > 0 && (
                    <SpecificMealSelector
                      specificMeals={product.specificMeal}
                      selectedSpecificMeal={selectedSpecificMeal}
                      onSelect={handleSpecificMealSelect}
                      productName={product.title}
                    />
                  )}
                  {/* SALADS CONTAINER */}
                  {product.salads && product.salads.length > 0 && (
                    <SaladSelector
                      salads={product.salads}
                      defaultSalads={product.defaultSalads || []}
                      onSelect={(selected) => setSelectedSalads(selected)}
                      productName={product.title}
                    />
                  )}
                  {/* SAUCES CONTAINER */}
                  {product.sauces && product.sauces.length > 0 && (
                    <SauceSelector
                      sauces={product.sauces}
                      defaultSauces={product.defaultSauces || []}
                      onSelect={(selected) => setSelectedSauces(selected)}
                    />
                  )}
                  {/* SPECIFIC EXTRAS CONTAINER */}
                  {product.specificExtra &&
                    product.specificExtra.length > 0 && (
                      <SpecificExtrasSelector
                        specificExtras={product.specificExtra}
                        selectedExtras={selectedExtra}
                        onSelect={handleExtraSelect}
                        isKebab={product.catSlug === "kebabs"}
                        isPotatoes={product.title === "Jacket Potatoes"}
                        canSelectExtra={product.selectableSpecificExtras}
                        selectedSpecificMeal={selectedSpecificMeal}
                      />
                    )}
                  {/* GENERIC MEAL TYPES CONTAINER */}
                  {product.genericMeal && product.genericMeal.length > 0 && (
                    <GenericMealSelector
                      genericMeals={product.genericMeal}
                      selectedGenericMeal={selectedGenericMeal}
                      onSelect={handleGenericMealSelection}
                      isFamilyBucket={
                        product.title === "Family Bucket" ||
                        product.catSlug === "meal-deals"
                      }
                    />
                  )}
                  {/* DRINKS CONTAINER */}
                  {product.genericMeal && selectedGenericMeal && (
                    <DrinkSelector
                      drinks={selectedGenericMeal.DrinkOptions}
                      selectedDrinks={selectedDrinks}
                      onSelect={handleDrinkSelection}
                      isTwoDrinkMeal={isTwoDrinkMeal}
                    />
                  )}

                  <h2 className="text-2xl font-bold">£{total.toFixed(2)}</h2>
                  {/* QUANTITY AND ADD BUTTON CONTAINER */}
                  {/* QUANTITY */}
                  <div className="flex justify-between w-full p-3 ring-1 ring-blue-700 rounded-l-xl">
                    <span>Quantity</span>
                    <div className="flex gap-4 items-center">
                      <Button
                        onPress={() =>
                          setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                        }
                      >
                        {"<"}
                      </Button>
                      <span>{quantity}</span>
                      <Button
                        onPress={() =>
                          setQuantity((prev) => (prev < 9 ? prev + 1 : 9))
                        }
                      >
                        {">"}
                      </Button>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  {/* CART BUTTON */}
                  <Button
                    className="uppercase w-56 bg-blue-600 text-white p-3 ring-1 ring-blue-600 rounded-r-xl"
                    onPress={() => {
                      try {
                        handleCart();
                        onClose();
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
);

Price.displayName = "Price";

export default Price;
