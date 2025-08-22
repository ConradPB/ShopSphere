import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import * as supabaseLib from "@/lib/supabase";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

jest.mock("@/lib/supabase");

const mockGetProducts = supabaseLib.getProducts as jest.MockedFunction<
  () => Promise<{ data: Product[] | null; error: string | null }>
>;

describe("Home Page", () => {
  const fakeProducts: Product[] = [
    {
      id: "1",
      title: "Laptop",
      price: 999.99,
      image: "https://placehold.co/400x300",
    },
    {
      id: "2",
      title: "Headphones",
      price: 99.99,
      image: "https://placehold.co/400x300",
    },
  ];

  beforeEach(() => {
    mockGetProducts.mockReset();
  });

  it("renders product cards without crashing", async () => {
    mockGetProducts.mockResolvedValue({ data: fakeProducts, error: null });

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
