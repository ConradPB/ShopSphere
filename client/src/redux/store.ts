import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./cartSlice";
import wishlistReducer, { WishlistState } from "./wishlistSlice";

const LOCAL_STORAGE_CART = "shop_sphere_cart_items";
const LOCAL_STORAGE_WISHLIST = "shop_sphere_wishlist_items";

function loadPreloadedState():
  | {
      cart: CartState;
      wishlist: WishlistState;
    }
  | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const rawCart = localStorage.getItem(LOCAL_STORAGE_CART);
    const rawWishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST);

    const cartItems = rawCart
      ? (JSON.parse(rawCart) as CartState["items"])
      : [];
    const wishlistItems = rawWishlist
      ? (JSON.parse(rawWishlist) as WishlistState["items"])
      : [];

    return {
      cart: { items: Array.isArray(cartItems) ? cartItems : [] },
      wishlist: { items: Array.isArray(wishlistItems) ? wishlistItems : [] },
    };
  } catch {
    return undefined;
  }
}

function saveState(state: { cart: CartState; wishlist: WishlistState }) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(state.cart.items));
    localStorage.setItem(
      LOCAL_STORAGE_WISHLIST,
      JSON.stringify(state.wishlist.items)
    );
  } catch {
    // ignore
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: loadPreloadedState(),
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      saveState(store.getState());
    } catch {
      // ignore
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
