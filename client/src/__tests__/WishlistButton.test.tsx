import React from "react";
import { render, screen } from "@testing-library/react";
import WishlistButton from "@/components/ui/WishlistButton";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("WishlistButton", () => {
  it("renders the wishlist button", () => {
    const mockProduct = {
      id: "test-1",
      title: "Mock Product",
      price: 20,
      image: "/mock.jpg",
    };

    render(
      <Provider store={store}>
        <WishlistButton product={mockProduct} />
      </Provider>
    );

    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });
});
