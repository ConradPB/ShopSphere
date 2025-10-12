jest.mock("@/lib/products", () => ({
  getAllProducts: jest.fn(),
}));

import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import ProductGrid from "@/components/ProductGrid";
import * as productsLib from "@/lib/products";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

const mockGetAllProducts = productsLib.getAllProducts as jest.MockedFunction<
  () => Promise<Product[]>
>;

const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("ProductGrid", () => {
  const mockProducts: Product[] = [
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

  beforeEach(() => {
    mockGetAllProducts.mockReset();
    jest.clearAllMocks();
  });

  it("renders static title while loading", async () => {
    mockGetAllProducts.mockResolvedValueOnce([]);

    await act(async () => {
      renderWithProvider(<ProductGrid title="Featured Products" />);
    });

    expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
  });

  it("renders products after fetching", async () => {
    mockGetAllProducts.mockResolvedValueOnce(mockProducts);

    await act(async () => {
      renderWithProvider(<ProductGrid />);
    });

    await waitFor(() => {
      expect(screen.getByText("Mock Product")).toBeInTheDocument();
      expect(screen.getByText("Another Product")).toBeInTheDocument();
    });
  });

  it("renders empty grid if fetch fails", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Simulate fetch failure by throwing (ProductGrid catches and sets products=[]).
    mockGetAllProducts.mockRejectedValueOnce(new Error("failed"));

    await act(async () => {
      renderWithProvider(<ProductGrid />);
    });

    await waitFor(() => {
      expect(screen.queryByText("Mock Product")).not.toBeInTheDocument();
    });

    spy.mockRestore();
  });
});
