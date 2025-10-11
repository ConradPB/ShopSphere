jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

import React from "react";
import { render, screen, act } from "@testing-library/react";
import * as supabaseLib from "@/lib/supabase";
import HomePage from "@/app/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

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

  it("renders product list successfully", async () => {
    mockGetProducts.mockResolvedValue({ data: fakeProducts, error: null });

    let page: React.ReactElement | null = null;
    await act(async () => {
      const component = await HomePage();
      page = <Provider store={store}>{component}</Provider>;
    });

    render(page!);

    for (const product of fakeProducts) {
      expect(await screen.findByText(product.title)).toBeInTheDocument();
      expect(
        screen.getByText(`$${product.price.toFixed(2)}`)
      ).toBeInTheDocument();
    }

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it("shows error message when products fail to load", async () => {
    mockGetProducts.mockResolvedValue({ data: null, error: "Failed" });

    let page: React.ReactElement | null = null;
    await act(async () => {
      const component = await HomePage();
      page = <Provider store={store}>{component}</Provider>;
    });

    render(page!);

    expect(
      await screen.findByText(/Failed to load products/i)
    ).toBeInTheDocument();
  });
});
