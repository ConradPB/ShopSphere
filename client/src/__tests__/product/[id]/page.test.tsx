jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
  getProductById: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import * as supabaseLib from "@/lib/supabase";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

const mockGetProducts = supabaseLib.getProducts as jest.MockedFunction<
  typeof supabaseLib.getProducts
>;
const mockGetProductById = supabaseLib.getProductById as jest.MockedFunction<
  typeof supabaseLib.getProductById
>;

describe("Product Page (server)", () => {
  const fakeProducts: Product[] = [
    {
      id: "1",
      title: "Laptop",
      price: 999.99,
      image: "https://placehold.co/400x300",
      description: "",
      category: "General",
    },
  ];

  beforeEach(() => {
    mockGetProducts.mockReset();
    mockGetProductById.mockReset();
  });

  it("renders product title and price", async () => {
    mockGetProductById.mockResolvedValue({
      data: fakeProducts[0],
      error: null,
    });
    mockGetProducts.mockResolvedValue({ data: fakeProducts, error: null });

    // call the server component function with params
    const page = await ProductPage({ params: { id: "1" } } as any);
    render(<Provider store={store}>{page}</Provider>);

    const matches = await screen.findAllByText(fakeProducts[0].title);
    expect(matches.length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(`$${fakeProducts[0].price.toFixed(2)}`).length
    ).toBeGreaterThan(0);
  });

  it("renders fallback when product fetch fails", async () => {
    mockGetProductById.mockResolvedValue({ data: null, error: "Nope" });
    mockGetProducts.mockResolvedValue({ data: null, error: "Nope" });

    const page = await ProductPage({ params: { id: "999" } } as any);
    render(<Provider store={store}>{page}</Provider>);

    // the app may show a "Not found" or fallback text; accept either
    const fallback = await screen.findByText(
      /(?:Not found|No products found|Failed to load products)/i
    );
    expect(fallback).toBeInTheDocument();
  });
});
