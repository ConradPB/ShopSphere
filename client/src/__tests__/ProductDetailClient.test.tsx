import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetailClient from "@/components/ProductDetailClient";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("ProductDetailClient", () => {
  const mockProduct = {
    id: "1",
    title: "Test Product",
    description: "This is a test product",
    price: 49.99,
    image: "https://placehold.co/400x300",
    category: "Test",
  };

  function renderWithStore(ui: React.ReactNode) {
    return render(<Provider store={store}>{ui}</Provider>);
  }

  it("renders product details correctly", () => {
    renderWithStore(<ProductDetailClient product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
  });

  it("dispatches addToCart when Add to cart is clicked", () => {
    renderWithStore(<ProductDetailClient product={mockProduct} />);

    const addButton = screen.getByRole("button", { name: /Add to cart/i });
    fireEvent.click(addButton);

    // We don't mock the store dispatch here; just ensure UI responded (button disabled state or text)
    // You can also inspect store state if desired:
    const items = store.getState().cart.items;
    expect(items.length).toBeGreaterThanOrEqual(1);
    const added = items.find((it) => it.id === mockProduct.id);
    expect(added).toBeTruthy();
  });

  it("renders recommendations when initialRecs are provided", () => {
    const recs = [
      { id: "2", title: "Rec 1", price: 10, image: null },
      { id: "3", title: "Rec 2", price: 20, image: null },
    ];

    renderWithStore(
      <ProductDetailClient product={mockProduct} initialRecs={recs as any} />
    );

    expect(screen.getByText("Rec 1")).toBeInTheDocument();
    expect(screen.getByText("Rec 2")).toBeInTheDocument();
  });
});
