import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import ProductGrid from "@/components/ProductGrid";
import * as supabaseLib from "@/lib/supabase";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// Mock getProducts
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

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

  it("renders static title while loading", async () => {
    (supabaseLib.getProducts as jest.Mock).mockResolvedValueOnce({
      data: [],
      error: null,
    });

    await act(async () => {
      renderWithProvider(<ProductGrid />);
    });

    // Check for static header instead of "Loading products"
    expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
  });

  it("renders products after fetching", async () => {
    (supabaseLib.getProducts as jest.Mock).mockResolvedValueOnce({
      data: mockProducts,
      error: null,
    });

    await act(async () => {
      renderWithProvider(<ProductGrid />);
    });

    await waitFor(() => {
      expect(screen.getByText("Mock Product")).toBeInTheDocument();
      expect(screen.getByText("Another Product")).toBeInTheDocument();
    });
  });

  it("renders empty grid if fetch fails", async () => {
    // suppress console.error noise
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    (supabaseLib.getProducts as jest.Mock).mockResolvedValueOnce({
      data: null,
      error: new Error("failed"),
    });

    await act(async () => {
      renderWithProvider(<ProductGrid />);
    });

    await waitFor(() => {
      expect(screen.queryByText("Mock Product")).not.toBeInTheDocument();
    });

    spy.mockRestore();
  });
});
