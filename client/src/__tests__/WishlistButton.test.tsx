import React from "react";
import { render, screen } from "@testing-library/react";
import WishlistButton from "@/components/ui/WishlistButton";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("WishlistButton", () => {
  it("renders the wishlist button", () => {
    render(
      <Provider store={store}>
        <WishlistButton productId="test-1" />
      </Provider>
    );

    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });
});
