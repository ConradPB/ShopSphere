import { addToCart } from "@/redux/cartSlice";
import type { RootState } from "@/redux/store";

const LOCAL_STORAGE_CART = "shop_sphere_cart_items";
const LOCAL_STORAGE_WISHLIST = "shop_sphere_wishlist_items";

describe("redux store localStorage preload/save", () => {
  beforeEach(() => {
    jest.resetModules();
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

    // ✅ dynamic import so ESLint is happy
    const { store } = await import("@/redux/store");

    const state: RootState = store.getState();
    expect(state.cart.items[0].id).toBe("c1");
    expect(state.wishlist.items[0].id).toBe("w1");
  });

  it("persists to localStorage after dispatch", async () => {
    jest.resetModules();
    window.localStorage.clear();

    const { store } = await import("@/redux/store");

    store.dispatch(
      addToCart({
        id: "dispatch-id",
        title: "Dispatched Product",
        price: 42,
        image: "/img.png",
        quantity: 1,
      })
    );

    const raw = window.localStorage.getItem(LOCAL_STORAGE_CART);
    expect(raw).not.toBeNull();

    // ✅ specify proper type instead of any
    const parsed: {
      id: string;
      title: string;
      price: number;
      image: string | null;
      quantity: number;
    }[] = JSON.parse(raw as string);

    expect(parsed.some((item) => item.id === "dispatch-id")).toBe(true);
  });
});
