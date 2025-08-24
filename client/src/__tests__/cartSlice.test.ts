import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  type CartItem,
  type CartState,
} from "@/redux/cartSlice";

describe("cartSlice reducer", () => {
  const initialState: CartState = { items: [] };

  const sampleItem: CartItem = {
    id: "1",
    title: "Sample Product",
    price: 100,
    image: "sample.jpg",
    quantity: 1,
  };

  it("should return the initial state", () => {
    expect(cartReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle addToCart (new item)", () => {
    const nextState = cartReducer(initialState, addToCart(sampleItem));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(sampleItem);
  });

  it("should handle addToCart (increase quantity if exists)", () => {
    const stateWithItem: CartState = { items: [sampleItem] };
    const nextState = cartReducer(
      stateWithItem,
      addToCart({ ...sampleItem, quantity: 2 })
    );
    expect(nextState.items[0].quantity).toBe(3);
  });

  it("should handle removeFromCart", () => {
    const stateWithItem: CartState = { items: [sampleItem] };
    const nextState = cartReducer(stateWithItem, removeFromCart("1"));
    expect(nextState.items).toHaveLength(0);
  });
});
