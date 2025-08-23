import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProductGrid from "@/components/ProductGrid";
import * as supabaseLib from "@/lib/supabase";

// Mock getProducts
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

describe("ProductGrid", () => {
  const mockProducts = [
    {
      id: "1",
      title: "Mock Product",
      description: "Mock description",
      price: 10,
      image: null,
      category: "Test",
    },
    {
      id: "2",
      title: "Another Product",
      description: "Second mock",
      price: 20,
      image: null,
      category: "Test",
    },
  ];

  it("renders loading state initially", () => {
    (supabaseLib.getProducts as jest.Mock).mockResolvedValueOnce({
      data: [],
      error: null,
    });

    render(<ProductGrid />);
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
  });

  it("renders products after fetching", async () => {
    (supabaseLib.getProducts as jest.Mock).mockResolvedValueOnce({
      data: mockProducts,
      error: null,
    });

    render(<ProductGrid />);

    await waitFor(() => {
      expect(screen.getByText("Mock Product")).toBeInTheDocument();
      expect(screen.getByText("Another Product")).toBeInTheDocument();
    });
  });

  it("renders empty grid if fetch fails", async () => {
    (supabaseLib.getProducts as jest.Mock).mockResolvedValueOnce({
      data: null,
      error: new Error("failed"),
    });

    render(<ProductGrid />);

    await waitFor(() => {
      expect(screen.queryByText("Mock Product")).not.toBeInTheDocument();
    });
  });
});
