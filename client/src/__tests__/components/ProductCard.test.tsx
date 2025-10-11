import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

describe("ProductCard", () => {
  const product: Product = {
    id: "1",
    title: "Test Product",
    price: 19.99,
    image: "/test.jpg",
    description: "A test product",
    category: "Test",
  };

  const renderWithRedux = (ui: React.ReactElement) =>
    render(<Provider store={store}>{ui}</Provider>);

  beforeEach(() => {
    store.dispatch({ type: "cart/clearCart" });
  });

  it("renders product info correctly", () => {
    renderWithRedux(<ProductCard product={product} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it("adds item to cart when 'Add to Cart' is clicked", () => {
    renderWithRedux(<ProductCard product={product} />);
    fireEvent.click(screen.getByText(/Add to Cart/i));
    const items = store.getState().cart.items;
    expect(items.some((i) => i.id === product.id)).toBeTruthy();
  });
});
