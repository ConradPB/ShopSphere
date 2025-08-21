import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import * as supabaseLib from "@/lib/supabase";
import { Product } from "@/types/product";

// Mock supabase getProducts
jest.mock("@/lib/supabase");
const mockGetProducts = supabaseLib.getProducts as jest.Mock;

describe("Home Page", () => {
  const fakeProducts: Product[] = [
    {
      id: "1",
      title: "Laptop",
      price: 999.99,
      image: "https://placehold.co/400x300",
      description: "Test laptop",
      category: "Electronics",
    },
    {
      id: "2",
      title: "Headphones",
      price: 99.99,
      image: "https://placehold.co/400x300",
      description: "Test headphones",
      category: "Electronics",
    },
  ];

  beforeEach(() => {
    mockGetProducts.mockReset();
  });

  it("renders product cards without crashing", async () => {
    mockGetProducts.mockResolvedValue({ data: fakeProducts, error: null });

    // Await async page
    const page = await HomePage();

    render(<Provider store={store}>{page}</Provider>);

    for (const product of fakeProducts) {
      expect(await screen.findByText(product.title)).toBeInTheDocument();
      expect(
        screen.getByText(`$${product.price.toFixed(2)}`)
      ).toBeInTheDocument();
    }
  });

  it("shows error message when products fail to load", async () => {
    mockGetProducts.mockResolvedValue({ data: null, error: "Failed" });

    const page = await HomePage();
    render(<Provider store={store}>{page}</Provider>);

    expect(
      await screen.findByText(/Failed to load products/i)
    ).toBeInTheDocument();
  });
});
