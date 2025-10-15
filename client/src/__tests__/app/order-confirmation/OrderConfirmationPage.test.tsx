import React from "react";
import { render, screen } from "@testing-library/react";
import OrderConfirmationPage from "@/app/order-confirmation/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { addToCart, clearCart } from "@/redux/cartSlice";

describe("OrderConfirmationPage", () => {
  beforeEach(() => {
    // ensure cart starts clean for this test
    store.dispatch(clearCart());
    jest.clearAllMocks();
  });

  it("renders confirmation UI and dispatches clearCart on mount", () => {
    // put an item into cart so subtotal is non-zero at mount time
    store.dispatch(
      addToCart({
        id: "test-1",
        title: "Sample",
        price: 99.99,
        image: "/mock.png",
        quantity: 1,
      })
    );

    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <OrderConfirmationPage />
      </Provider>
    );

    // Basic rendering assertions
    expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /continue shopping/i })
    ).toBeInTheDocument();

    // clearCart should have been dispatched by the useEffect on mount
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(clearCart());
  });
});
