// Mock supabase BEFORE importing the page so the module that creates a client
// (which uses env vars) never runs in tests.
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import * as supabaseLib from "@/lib/supabase";
import HomePage from "@/app/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

// typed reference to mocked function (no `any`)
const mockGetProducts = supabaseLib.getProducts as jest.MockedFunction<
  typeof supabaseLib.getProducts
>;

describe("Home Page", () => {
  const fakeProducts: Product[] = [
    {
      id: "1",
      title: "Laptop",
      price: 999.99,
      image: "https://placehold.co/400x300",
      description: "",
      category: "General",
    },
    {
      id: "2",
      title: "Headphones",
      price: 99.99,
      image: "https://placehold.co/400x300",
      description: "",
      category: "General",
    },
  ];

  beforeEach(() => {
    mockGetProducts.mockReset();
  });

  it("renders product cards without crashing", async () => {
    mockGetProducts.mockResolvedValue({ data: fakeProducts, error: null });

    // HomePage is an async server component in your app so call it and render the result
    const page = await HomePage();
    render(<Provider store={store}>{page}</Provider>);

    // The page intentionally may render products in multiple places (featured + grid).
    // Assert that each product title appears at least once.
    for (const product of fakeProducts) {
      const matches = await screen.findAllByText(product.title);
      expect(matches.length).toBeGreaterThan(0);
      // price should appear at least once as well
      const priceMatches = screen.getAllByText(`$${product.price.toFixed(2)}`);
      expect(priceMatches.length).toBeGreaterThan(0);
    }
  });

  it("shows fallback message when products fail to load", async () => {
    mockGetProducts.mockResolvedValue({ data: null, error: "Failed" });

    const page = await HomePage();
    render(<Provider store={store}>{page}</Provider>);

    // The app may render different fallback messages depending on component,
    // accept either "Failed to load products" or the visible "No products found."
    const fallback = await screen.findByText(
      /(?:Failed to load products|No products found)/i
    );
    expect(fallback).toBeInTheDocument();
  });
});
