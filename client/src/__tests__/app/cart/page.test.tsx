import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/cartSlice";
import wishlistReducer from "@/redux/wishlistSlice";
import CartPage from "@/app/cart/page";
import { Provider } from "react-redux";

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
describe("Cart Page", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={mockStore}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});
