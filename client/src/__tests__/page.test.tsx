import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { getProducts } from "@/lib/supabase";

// Mock getProducts
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

const mockProducts = [
  { id: "1", title: "Laptop", price: 999.99, image: "/laptop.jpg" },
  { id: "2", title: "Headphones", price: 99.99, image: "/headphones.jpg" },
];

describe("Home Page", () => {
  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue({
      data: mockProducts,
      error: null,
    });
  });

  it("renders products without crashing", async () => {
    // HomePage is async
    const { findByText } = render(<HomePage />);

    // Check that product titles appear
    for (const product of mockProducts) {
      expect(await findByText(product.title)).toBeInTheDocument();
    }
  });

  it("renders error message if fetch fails", async () => {
    (getProducts as jest.Mock).mockResolvedValue({
      data: null,
      error: "Fetch error",
    });
    const { findByText } = render(<HomePage />);
    expect(await findByText(/Failed to load products/i)).toBeInTheDocument();
  });
});
