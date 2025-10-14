import wishlistReducer, {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  WishlistState,
} from "@/redux/wishlistSlice";
import { Product } from "@/types/product";

describe("wishlistSlice", () => {
  const sampleProduct: Product = {
    id: "1",
    title: "Sample Product",
    price: 100,
    image: "/test.jpg",
    description: "Test product description",
    category: "Test Category",
  };

  it("should return the initial state", () => {
    const initialState = wishlistReducer(undefined, { type: "@@INIT" });
    expect(initialState.items).toEqual([]);
  });

  it("should add a product to the wishlist", () => {
    const state: WishlistState = { items: [] };
    const newState = wishlistReducer(state, addToWishlist(sampleProduct));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].id).toBe("1");
  });

  it("should not duplicate a product in the wishlist", () => {
    const state: WishlistState = { items: [sampleProduct] };
    const newState = wishlistReducer(state, addToWishlist(sampleProduct));
    expect(newState.items).toHaveLength(1);
  });

  it("should remove a product from the wishlist", () => {
    const state: WishlistState = { items: [sampleProduct] };
    const newState = wishlistReducer(state, removeFromWishlist("1"));
    expect(newState.items).toHaveLength(0);
  });

  it("should clear the wishlist", () => {
    const state: WishlistState = { items: [sampleProduct] };
    const newState = wishlistReducer(state, clearWishlist());
    expect(newState.items).toEqual([]);
  });
});
