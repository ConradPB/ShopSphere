// src/__tests__/redux/store.test.ts
import { addToCart } from "@/redux/cartSlice";

const LOCAL_STORAGE_CART = "shop_sphere_cart_items";
const LOCAL_STORAGE_WISHLIST = "shop_sphere_wishlist_items";

describe("redux store localStorage preload/save", () => {
  beforeEach(() => {
    jest.resetModules();
    // ensure a clean localStorage
    window.localStorage.clear();
  });

  it("loads preloaded state from localStorage", async () => {
    const cartMock = [
      { id: "c1", title: "Saved", price: 5, image: null, quantity: 2 },
    ];
    const wishlistMock = [{ id: "w1", title: "Wish", price: 1, image: null }];

    window.localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cartMock));
    window.localStorage.setItem(
      LOCAL_STORAGE_WISHLIST,
      JSON.stringify(wishlistMock)
    );

    // require after we set localStorage so the module reads it at import time
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { store } = require("@/redux/store");

    const state = store.getState();
    expect(state.cart).toBeDefined();
    expect(Array.isArray(state.cart.items)).toBe(true);
    expect(state.cart.items[0].id).toBe("c1");

    expect(state.wishlist).toBeDefined();
    expect(Array.isArray(state.wishlist.items)).toBe(true);
    expect(state.wishlist.items[0].id).toBe("w1");
  });

  it("persists to localStorage after dispatch", async () => {
    jest.resetModules();
    // start empty
    window.localStorage.clear();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { store } = require("@/redux/store");
    // dispatch addToCart action
    store.dispatch(
      addToCart({
        id: "dispatch-id",
        title: "Dispatched Product",
        price: 42,
        image: "/img.png",
        quantity: 1,
      })
    );

    // store subscription will have saved to localStorage synchronously
    const raw = window.localStorage.getItem(LOCAL_STORAGE_CART);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw as string);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.some((it: any) => it.id === "dispatch-id")).toBe(true);
  });
});
