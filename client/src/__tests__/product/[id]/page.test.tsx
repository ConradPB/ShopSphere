jest.mock("@/lib/supabase", () => ({
  getProductById: jest.fn(),
  getRecommendations: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import * as supabaseLib from "@/lib/supabase";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

const mockGetProductById = supabaseLib.getProductById as jest.MockedFunction<
  typeof supabaseLib.getProductById
>;
const mockGetRecommendations =
  supabaseLib.getRecommendations as jest.MockedFunction<
    typeof supabaseLib.getRecommendations
  >;

describe("Product Page", () => {
  const product: Product = {
    id: "17",
    title: "Laptop",
    price: 999.99,
    image: "https://placehold.co/400x300",
    description: "A nice laptop",
    category: "Electronics",
  };

  beforeEach(() => {
    mockGetProductById.mockReset();
    mockGetRecommendations.mockReset();
  });

  it("renders product details", async () => {
    // both functions return { data, error } as your supabase helpers do
    mockGetProductById.mockResolvedValue({ data: product, error: null });
    mockGetRecommendations.mockResolvedValue([
      {
        id: "18",
        title: "Accessory",
        price: 49.99,
        image: "/fallback-image.jpg",
        description: "",
        category: "Electronics",
      },
    ]);

    // ProductPage expects { params: Promise<{ id: string }> } per your code, so pass a Promise
    const tree = await ProductPage({
      params: Promise.resolve({ id: product.id }),
    });
    render(<Provider store={store}>{tree}</Provider>);

    expect(await screen.findByText(product.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${product.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("handles not found", async () => {
    mockGetProductById.mockResolvedValue({ data: null, error: "Not found" });

    const tree = await ProductPage({ params: Promise.resolve({ id: "999" }) });
    render(<Provider store={store}>{tree}</Provider>);

    // your page returns a "Product not found" div when missing
    expect(await screen.findByText(/Product not found/i)).toBeInTheDocument();
  });
});
