// src/__tests__/components/ProductCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { CartProvider } from "@/context/CartContext";

const mockProduct = {
  id: "1",
  title: "Test Product",
  price: 100,
  image: "/test.jpg",
};

describe("ProductCard", () => {
  it("renders product name, price, and image", () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/test.jpg");
  });

  it("handles missing name with default", () => {
    const productWithoutName = { ...mockProduct, title: "" };

    render(
      <CartProvider>
        <ProductCard product={productWithoutName} />
      </CartProvider>
    );

    expect(screen.getByText("Unnamed Product")).toBeInTheDocument();
  });
});
