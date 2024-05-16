import {
  Salad,
  Sauce,
  SpecificExtra,
  DrinkOption,
  PizzaToppings,
  UKAddress,
  Product,
  DiscountCode,
} from "@prisma/client";

export type CartType = {
  products: CartItemType[];
  orderNotes: string;
  totalItems: number;
  subtotal: number;
  discountApplied: boolean;
  discountCode: string;
  discountAmount: number;
  deliveryMethod?: "collection" | "delivery";
  deliveryCharge: number;
  deliveryTime?: string;
  deliveryAddress?: InternalAddress;
  totalPrice: number;
  paymentMethod?: "cash" | "card";
};

export const initialToppingState: ToppingsState = {
  count: 2,
  added: [],
  removed: [],
};

export const initialFreePizzaToppingState: ToppingsState = {
  count: -1,
  added: [],
  removed: [],
};

type MealDealPizzas = {
  pizza: string;
  pizzaBase: pricedExtras[];
  toppings: pricedExtras[];
  toppingChanges: toppingChanges;
};

export type MealDealPizzaType = {
  pizza: InternalProduct;
  pizzaBase: SpecificExtra;
  toppings: PizzaToppings[];
  toppingChanges: toppingChanges;
};

export type CartItemType = {
  id: string;
  productId: string;
  title: string;
  img?: string;
  price: number;
  quantity: number;
  extras?: pricedExtras[];
  genericMeal?: pricedExtras;
  specificMeal?: pricedExtras;
  salads?: string[];
  sauces?: string[];
  drink?: string[];
  pizzaToppings?: pricedExtras[];
  selectedPizzas?: MealDealPizzas[];
  filletQuantity?: number;
};

type pricedExtras = {
  title: string;
  price: number;
};

export type toppingChanges = {
  count: number;
  added: string[];
  removed: string[];
};

export type SelectedPizzaType = {
  pizza: InternalProduct;
  toppings: PizzaToppings[];
  toppingChanges: toppingChanges;
};

export type OrderType = {
  id: string;
  deliveryMethod: string;
  paymentMethod: string;
  orderNotes: string;
  orderStatus: string;
  paymentStatus: string;
  userEmail: string;
  subtotal: number;
  totalPrice: number;
  products: CartItemType[];
  createdAt: Date;
  updatedAt: Date;
  intent_id?: String;
  phoneNumber: string;
  ukAdresssId?: string;
  discountCode?: string;
  discountedAmount?: number;
  deliveryTime: Date;
  deliveryCharge?: number;
};

export type InternalAddress = {
  formatted_address: InternalFormattedAddress;
  line_1: string;
  line_2: string;
  town_or_city: string;
  county: string;
  postcode: string;
};

export type InternalFormattedAddress = {
  formatted_address_0: string;
  formatted_address_1: string;
  formatted_address_2: string;
  formatted_address_3: string;
  formatted_address_4: string;
};

export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  updateQuantity: (item: CartItemType, newQuantity: number) => void;
  setNotes: (notes: string) => void;
  applyDiscountCode: (discountObject: DiscountCode) => void;
  removeDiscountCode: () => void;
  setDeliveryTime: (time: any) => void;
  setPaymentMethod: (method: "cash" | "card") => void;
  setDeliveryMethod: (method: "collection" | "delivery") => void;
  switchDeliveryMethod: (method: "collection" | "delivery") => void;
  setDeliveryAddress: (address: InternalAddress) => void;
  resetDeliveryAddress: () => void;
};

export type Restaurant = {
  isDelivering: boolean;
  isTakingCash: boolean;
  deliveryTimes: DeliveryTimes[];
};

export type DeliveryTimes = {
  day: string;
  openingTime: string;
  closingTime: string;
};

export interface ToppingsState {
  count: number;
  added: string[];
  removed: string[];
}

export type ToppingsAction =
  | { type: "addTopping"; payload: string }
  | { type: "removeTopping"; payload: string }
  | { type: "reset"; payload?: number }
  | { type: "switch-base"; payload?: ToppingsState };

export interface InternalProduct {
  id: string;
  title: string;
  desc: string;
  img: string | null;
  price: number;
  isFeatured: boolean;
  isAvailable: boolean;
  catSlug: string;
  defaultSalads?: Salad[];
  defaultSauces?: Sauce[];
  salads?: Salad[];
  sauces?: Sauce[];
  genericMeal?: GenericMeal[];
  specificMeal?: SpecificMeal[];
  specificExtra?: SpecificExtra[];
  selectableSpecificExtras: boolean;
  defaultPizzaToppings?: PizzaToppings[];
  pizzaToppings?: PizzaToppings[];
  mealDealData?: Product[];
}

export interface GenericMeal {
  id: string;
  title: string;
  price: number;
  isAvailable: Boolean;
  DrinkOptions: DrinkOption[];
}

export interface SpecificMeal {
  id: string;
  title: string;
  price: number;
  isAvailable: Boolean;
  DrinkOptions: DrinkOption[];
}
