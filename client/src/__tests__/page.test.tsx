jest.mock("@/lib/products", () => ({
  getAllProducts: jest.fn(),
}));

import React from "react";
import { render, screen, act } from "@testing-library/react";
import * as productsLib from "@/lib/products";
import HomePage from "@/app/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

const mockGetAllProducts = productsLib.getAllProducts as jest.MockedFunction<
  () => Promise<Product[]>
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
    mockGetAllProducts.mockReset();
    jest.clearAllMocks();
  });

  it("renders product list successfully", async () => {
    mockGetAllProducts.mockResolvedValue(fakeProducts);

    let page: React.ReactElement | null = null;
    await act(async () => {
      const component = await HomePage();
      page = <Provider store={store}>{component}</Provider>;
    });

    render(page!);

    // Use findAllByText/getAllByText to allow multiple occurrences and assert there is at least one
    for (const product of fakeProducts) {
      const titleEls = await screen.findAllByText(product.title);
      expect(titleEls.length).toBeGreaterThan(0);

      const priceEls = screen.getAllByText(`$${product.price.toFixed(2)}`);
      expect(priceEls.length).toBeGreaterThan(0);
    }

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it("shows 'No products found' when products fail to load", async () => {
    // silence expected console errors coming from components during fetch failure
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    mockGetAllProducts.mockRejectedValue(new Error("Failed"));

    let page: React.ReactElement | null = null;
    await act(async () => {
      const component = await HomePage();
      page = <Provider store={store}>{component}</Provider>;
    });

    render(page!);

    // The UI displays "No products found." when fetch fails in your current implementation
    expect(await screen.findByText(/No products found/i)).toBeInTheDocument();

    spy.mockRestore();
  });
});
