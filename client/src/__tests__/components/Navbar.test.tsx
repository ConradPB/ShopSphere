import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import cartReducer from "@/redux/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

describe("Navbar Component", () => {
  it("renders the brand or logo text", () => {
    render(
      <Provider store={mockStore}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });
});
