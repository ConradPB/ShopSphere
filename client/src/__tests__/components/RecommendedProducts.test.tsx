/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import RecommendedProducts from "@/components/RecommendedProducts";
import { Product } from "@/types/product"; // ✅ Import Product type for safety

describe("RecommendedProducts", () => {
  it("renders the heading for recommended products", () => {
    render(<RecommendedProducts products={[]} />);
    const heading = screen.getByRole("heading", { name: /recommended/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders product cards when provided", () => {
    const mockProducts: Product[] = [
      {
        id: "1",
        title: "Mock Product", // ✅ use 'title' instead of 'name'
        price: 100,
        image: "/test.jpg",
        description: "A sample product",
        category: "Test",
      },
    ];

    render(<RecommendedProducts products={mockProducts} />);
    expect(screen.getByText(/mock product/i)).toBeInTheDocument();
  });
});
