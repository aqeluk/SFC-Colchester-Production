import {
  ActionTypes,
  CartItemType,
  CartType,
  InternalAddress,
} from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  orderNotes: "",
  totalItems: 0,
  subtotal: 0.0,
  discountApplied: false,
  discountCode:"",
  discountAmount: 0.0,
  deliveryMethod: undefined as "collection" | "delivery" | undefined,
  deliveryCharge: 0.0,
  deliveryTime: undefined,
  deliveryAddress: undefined,
  totalPrice: 0.0,
  paymentMethod: undefined as "cash" | "card" | undefined,
};

const HOUR_IN_MILLISECONDS = 3600000;

function arraysEqual<T>(a: T[] | undefined, b: T[] | undefined): boolean {
  if (a === b) return true;
  if (a == null || b == null) return a === b; // handles both undefined and null
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function areProductsEqual(a: CartItemType, b: CartItemType): boolean {
  return (
    a.productId === b.productId &&
    a.title === b.title &&
    arraysEqual(a.extras, b.extras) &&
    a.genericMeal === b.genericMeal &&
    a.price === b.price &&
    a.specificMeal === b.specificMeal &&
    arraysEqual(a.salads, b.salads) &&
    arraysEqual(a.sauces, b.sauces) &&
    arraysEqual(a.drink, b.drink) &&
    arraysEqual(a.pizzaToppings, b.pizzaToppings) &&
    arraysEqual(a.selectedPizzas, b.selectedPizzas) 
  );
}

const createCustomStorage = () => {
  return {
    getItem: (name: string) => {
      const item = localStorage.getItem(name);
      if (!item) return null;

      const { timestamp, state } = JSON.parse(item);
      const now = new Date().getTime();

      // Check if the stored item is older than one hour
      if (now - timestamp > HOUR_IN_MILLISECONDS) {
        localStorage.removeItem(name); // Remove if older than one hour
        return null;
      }

      return state; // Return the state
    },
    setItem: (name: string, value: any) => {
      const timestamp = new Date().getTime();
      localStorage.setItem(name, JSON.stringify({ timestamp, state: value }));
    },
    removeItem: (name: string) => {
      localStorage.removeItem(name);
    },
  };
};

const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      orderNotes: INITIAL_STATE.orderNotes,
      totalItems: INITIAL_STATE.totalItems,
      subtotal: INITIAL_STATE.subtotal,
      discountApplied: INITIAL_STATE.discountApplied,
      discountCode: INITIAL_STATE.discountCode,
      discountAmount: INITIAL_STATE.discountAmount,
      deliveryMethod: INITIAL_STATE.deliveryMethod,
      deliveryCharge: INITIAL_STATE.deliveryCharge,
      deliveryTime: INITIAL_STATE.deliveryTime,
      deliveryAddress: INITIAL_STATE.deliveryAddress,
      totalPrice: INITIAL_STATE.totalPrice,
      paymentMethod: INITIAL_STATE.paymentMethod,
      addToCart(item) {
        const products = get().products;
        const productInState = products.find((product) =>
          areProductsEqual(product, item)
        );
        if (productInState) {
          const updatedProducts = products.map((product) =>
            product === productInState
              ? {
                  ...product,
                  quantity: product.quantity + item.quantity,
                  price: product.price + item.price * item.quantity,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price * item.quantity,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price * item.quantity,
          }));
        }
      },
      removeFromCart(item) {
        set((state) => {
          const updatedProducts = state.products.filter(
            (product) => !areProductsEqual(product, item)
          );
          const totalItems = updatedProducts.reduce(
            (sum, product) => sum + product.quantity,
            0
          );
          const totalPrice = updatedProducts.reduce(
            (sum, product) => sum + product.price,
            0
          );

          return {
            products: updatedProducts,
            totalItems,
            totalPrice,
          };
        });
      },
      updateQuantity(item: CartItemType, newQuantity: any) {
        set((state) => {
          const updatedProducts = state.products.map((product) => {
            if (areProductsEqual(product, item)) {
              return { ...product, quantity: newQuantity };
            }
            return product;
          });
          const totalItems = updatedProducts.reduce(
            (sum, product) => sum + product.quantity,
            0
          );
          const totalPrice = updatedProducts.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
          );

          return {
            products: updatedProducts,
            totalItems,
            totalPrice,
          };
        });
      },
      setNotes: (userNotes: string) => 
        set(() => ({ orderNotes: userNotes })),
      applyDiscountCode(discountObject) {
        const { totalPrice, discountApplied } = get();
        if (!discountApplied) {
          const discountValue = totalPrice * discountObject.discount;
          const newTotal = totalPrice - discountValue;
          set(() => ({
            discountCode: discountObject.code,
            discountApplied: true,
            discountAmount: discountValue,
            totalPrice: newTotal,
          }));
        }
      },
      removeDiscountCode() {
        const { totalPrice, discountAmount } = get();
        set(() => ({
          discountCode: "",
          discountApplied: false,
          discountAmount: 0,
          totalPrice: totalPrice + discountAmount,
        }));
      },
      setDeliveryTime: (time: any) => {
        set(() => ({ deliveryTime: time.anchorKey }));
      },
      setPaymentMethod: (method: "cash" | "card") =>
        set(() => ({ paymentMethod: method })),
      setDeliveryMethod: (method: "collection" | "delivery") =>
        set(() => ({ deliveryMethod: method })),
      switchDeliveryMethod: (method: "collection" | "delivery") => {
        set(() => ({ deliveryMethod: method }));
        get().setDeliveryTime({ anchorKey: "ASAP" });
      },
      setDeliveryAddress: (address: InternalAddress) =>
        set(() => ({ deliveryAddress: address })),
      resetDeliveryAddress: () =>
        set(() => ({ deliveryAddress: INITIAL_STATE.deliveryAddress })),
    }),
    {
      name: "cart",
      storage: createCustomStorage(),
    }
  )
);

useCartStore.subscribe(() => {
  const now = new Date().getTime();
  localStorage.setItem("lastPersistTime", now.toString());
});

export default useCartStore;
