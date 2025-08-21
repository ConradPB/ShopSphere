import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// ✅ Mock Supabase + recommendations
const mockGetProductById = jest.fn();
jest.mock("@/lib/supabase", () => ({
  getProductById: (...args: any[]) => mockGetProductById(...args),
}));

const mockGetRecommendations = jest.fn();
jest.mock("@/lib/recommendations", () => ({
  getRecommendations: (...args: any[]) => mockGetRecommendations(...args),
}));

describe("Product Page", () => {
  it("renders product detail without crashing", async () => {
    mockGetProductById.mockResolvedValueOnce({
      data: { id: "1", title: "Test Product", price: 9.99, image: null },
      error: null,
    });
    mockGetRecommendations.mockResolvedValueOnce([]);

    const ui = await ProductPage({ params: { id: "1" } });
    render(<Provider store={store}>{ui}</Provider>);

    expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();
    expect(await screen.findByText(/\$9.99/)).toBeInTheDocument();
  });

  it("renders 404 page when product not found", async () => {
    mockGetProductById.mockResolvedValueOnce({
      data: null,
      error: "Not found",
    });
    mockGetRecommendations.mockResolvedValueOnce([]);

    const ui = await ProductPage({ params: { id: "999" } });
    render(<Provider store={store}>{ui}</Provider>);

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});
