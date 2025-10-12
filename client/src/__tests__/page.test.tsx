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
    // Make the call return an empty value or throw so page renders failure UI.
    mockGetAllProducts.mockRejectedValue(new Error("Failed"));

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
