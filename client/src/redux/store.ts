import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import type { CartState } from "./cartSlice";

/**
 * Root reducer and typed RootState
 */
const rootReducer = combineReducers({
  cart: cartReducer,
});

/**
 * Persist/load helpers (client-only)
 */
const STORAGE_KEY = "shop-sphere:state";

function loadState(): { cart: CartState } | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as { cart: CartState };
  } catch (e) {
    // don't crash on invalid JSON or security errors
    console.warn("Could not load persisted state", e);
    return undefined;
  }
}

function saveState(state: { cart: CartState }) {
  try {
    if (typeof window === "undefined") return;
    // save only the cart slice to keep things small
    const toSave = { cart: state.cart };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn("Could not save state", e);
  }
}

/**
 * Create store with optional preloadedState (from localStorage on client)
 */
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: typeof window !== "undefined" ? loadState() : undefined,
});

/**
 * Persist on changes (client only)
 */
if (typeof window !== "undefined") {
  store.subscribe(() => {
    saveState(store.getState() as { cart: CartState });
  });
}

/**
 * Types & hooks exports
 */
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
