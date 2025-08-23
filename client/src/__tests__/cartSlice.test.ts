import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";

describe("cartSlice", () => {
  const initialState = {
    items: [] as {
      id: string;
      title: string;
      price: number;
      quantity: number;
    }[],
  };

  it("should return the initial state", () => {
    expect(cartReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle addToCart for a new product", () => {
    const newState = cartReducer(
      initialState,
      addToCart({ id: "1", title: "Product 1", price: 100, quantity: 1 })
    );
    expect(newState.items.length).toBe(1);
    expect(newState.items[0]).toEqual({
      id: "1",
      title: "Product 1",
      price: 100,
      quantity: 1,
    });
  });

  it("should increase quantity if same product is added again", () => {
    const stateWithItem = {
      items: [{ id: "1", title: "Product 1", price: 100, quantity: 1 }],
    };
    const newState = cartReducer(
      stateWithItem,
      addToCart({ id: "1", title: "Product 1", price: 100, quantity: 1 })
    );
    expect(newState.items[0].quantity).toBe(2);
  });

  it("should handle removeFromCart", () => {
    const stateWithItem = {
      items: [{ id: "1", title: "Product 1", price: 100, quantity: 1 }],
    };
    const newState = cartReducer(stateWithItem, removeFromCart("1"));
    expect(newState.items.length).toBe(0);
  });

  it("should handle updateQuantity", () => {
    const stateWithItem = {
      items: [{ id: "1", title: "Product 1", price: 100, quantity: 1 }],
    };
    const newState = cartReducer(
      stateWithItem,
      updateQuantity({ id: "1", quantity: 5 })
    );
    expect(newState.items[0].quantity).toBe(5);
  });

  it("should handle clearCart", () => {
    const stateWithItems = {
      items: [
        { id: "1", title: "Product 1", price: 100, quantity: 1 },
        { id: "2", title: "Product 2", price: 200, quantity: 2 },
      ],
    };
    const newState = cartReducer(stateWithItems, clearCart());
    expect(newState.items.length).toBe(0);
  });
});
