import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import * as supabaseLib from "@/lib/supabase";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

jest.mock("@/lib/supabase");

const mockGetProductById = supabaseLib.getProductById as jest.MockedFunction<
  (id: string) => Promise<{ data: Product | null; error: string | null }>
>;

const mockGetRecommendations =
  supabaseLib.getRecommendations as jest.MockedFunction<
    (
      id: string,
      count?: number
    ) => Promise<{ data: Product[] | null; error: string | null }>
  >;

describe("Product Page", () => {
  const product: Product = {
    id: "10",
    title: "Test Laptop",
    price: 123.45,
    image: "https://placehold.co/400x300",
    description: "Nice laptop",
    category: "Electronics",
  };

  const recs: Product[] = [
    { id: "11", title: "Mouse", price: 25.0, image: null },
    { id: "12", title: "Keyboard", price: 45.0, image: null },
  ];

  beforeEach(() => {
    mockGetProductById.mockReset();
    mockGetRecommendations.mockReset();
  });

  it("renders product details", async () => {
    mockGetProductById.mockResolvedValue({ data: product, error: null });
    mockGetRecommendations.mockResolvedValue({ data: recs, error: null });

    const page = await ProductPage({ params: { id: product.id } });
    render(<Provider store={store}>{page}</Provider>);

    expect(await screen.findByText(product.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${product.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("renders recommendations", async () => {
    mockGetProductById.mockResolvedValue({ data: product, error: null });
    mockGetRecommendations.mockResolvedValue({ data: recs, error: null });

    const page = await ProductPage({ params: { id: product.id } });
    render(<Provider store={store}>{page}</Provider>);

    for (const r of recs) {
      expect(await screen.findByText(r.title)).toBeInTheDocument();
    }
  });

  it("shows product not found message", async () => {
    mockGetProductById.mockResolvedValue({ data: null, error: "Not found" });

    const page = await ProductPage({ params: { id: "nope" } });
    render(<Provider store={store}>{page}</Provider>);

    expect(await screen.findByText(/Product not found/i)).toBeInTheDocument();
  });
});
