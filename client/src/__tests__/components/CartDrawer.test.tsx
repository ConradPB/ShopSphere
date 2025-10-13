import React from "react";
import { render, screen } from "@testing-library/react";
import CartDrawer from "@/components/CartDrawer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("CartDrawer Component", () => {
  it("renders the drawer when open and shows empty cart message", () => {
    const handleClose = jest.fn();

    render(
      <Provider store={store}>
        <CartDrawer open={true} onClose={handleClose} />
      </Provider>
    );

    // The component should render a cart heading or empty cart message.
    // Adjust the text matchers if your component uses different wording.

    // Target the header only
    expect(
      screen.getByRole("heading", { name: /your cart/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("does not throw when closed", () => {
    const handleClose = jest.fn();

    render(
      <Provider store={store}>
        <CartDrawer open={false} onClose={handleClose} />
      </Provider>
    );

    // When closed the drawer might not show content; at minimum, rendering shouldn't crash.
    expect(screen.queryByText(/your cart is empty/i)).not.toBeNull();
  });
});
