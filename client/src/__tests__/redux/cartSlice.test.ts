import cartReducer, {
  addToCart,
  removeFromCart,
  CartState,
} from "@/redux/cartSlice";
import { CartItem } from "@/types/cart";

describe("cartSlice", () => {
  const item: CartItem = {
    id: "1",
    title: "Item",
    price: 100,
    image: "/x.png",
    quantity: 1,
  };

  it("adds item to cart", () => {
    const state = cartReducer(undefined, addToCart(item));
    expect(state.items[0].id).toBe("1");
  });

  it("removes item from cart", () => {
    const stateWithItem: CartState = { items: [item], total: 100 };
    const state = cartReducer(stateWithItem, removeFromCart("1"));
    expect(state.items).toHaveLength(0);
  });
});
