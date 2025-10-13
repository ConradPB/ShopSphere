import { render, screen } from "@testing-library/react";
import Page from "@/app/cart/page";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/cartSlice";
import wishlistReducer from "@/redux/wishlistSlice";
import CartPage from "@/app/cart/page";

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
describe("Cart Page", () => {
  it("renders without crashing", () => {
    render(<CartPage />);

    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});
