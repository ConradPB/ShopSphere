import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  CartState,
} from "@/redux/cartSlice";

describe("cartSlice", () => {
  const initialState: CartState = {
    items: [],
  };

  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addToCart", () => {
    const newItem = {
      id: "1",
      title: "Test Product",
      price: 100,
      quantity: 1,
      image: "test.jpg", // added required image
    };

    const actual = cartReducer(initialState, addToCart(newItem));
    expect(actual.items[0]).toEqual(newItem);
  });

  it("should handle removeFromCart", () => {
    const stateWithItem: CartState = {
      items: [
        {
          id: "1",
          title: "Test Product",
          price: 100,
          quantity: 1,
          image: "test.jpg", // ✅ added image
        },
      ],
    };

    const actual = cartReducer(stateWithItem, removeFromCart("1"));
    expect(actual.items.length).toBe(0);
  });

  it("should handle clearCart", () => {
    const stateWithItems: CartState = {
      items: [
        {
          id: "1",
          title: "Test Product",
          price: 100,
          quantity: 1,
          image: "test.jpg",
        },
        {
          id: "2",
          title: "Another Product",
          price: 200,
          quantity: 2,
          image: "another.jpg",
        },
      ],
    };

    const actual = cartReducer(stateWithItems, clearCart());
    expect(actual.items.length).toBe(0);
  });
});
