import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./cartSlice";

const LOCAL_STORAGE_KEY = "shop_sphere_cart_items";

/** load saved cart items from localStorage (client only) */
function loadPreloadedState():
  | {
      cart: CartState;
    }
  | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return undefined;
    const items = JSON.parse(raw) as CartState["items"];
    if (!Array.isArray(items)) return undefined;
    return { cart: { items } };
  } catch {
    // ignore parse errors and return undefined
    return undefined;
  }
}

/** save just the cart items array */
function saveState(state: { cart: CartState }) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.cart.items));
  } catch {
    // ignore quota / serialization errors
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadPreloadedState(),
});

// subscribe to persist cart changes (client-only)
if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      saveState(store.getState());
    } catch {
      // ignore
    }
  });
}

// Types & exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
