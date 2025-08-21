import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import * as supabaseLib from "@/lib/supabase";
import { Product } from "@/types/product";

// Mock supabase functions
jest.mock("@/lib/supabase");

const mockGetProductById = supabaseLib.getProductById as jest.Mock;
const mockGetRecommendations = supabaseLib.getRecommendations as jest.Mock;

describe("Product Page", () => {
  const fakeProduct: Product = {
    id: "1",
    title: "Test Product",
    price: 99.99,
    image: "/test.png",
    description: "Test description",
    category: "Test Category",
  };

  const fakeRecs: Product[] = [
    {
      id: "2",
      title: "Recommended 1",
      price: 49.99,
      image: "/rec1.png",
      description: "Rec 1",
      category: "Category 1",
    },
  ];

  beforeEach(() => {
    mockGetProductById.mockReset();
    mockGetRecommendations.mockReset();
  });

  it("renders product details", async () => {
    mockGetProductById.mockResolvedValue({ data: fakeProduct, error: null });
    mockGetRecommendations.mockResolvedValue({ data: fakeRecs, error: null });

    // Await the async page component
    const page = await ProductPage({ params: { id: fakeProduct.id } });

    render(<Provider store={store}>{page}</Provider>);

    expect(await screen.findByText(fakeProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${fakeProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(fakeProduct.title)).toBeInTheDocument();
  });

  it("renders recommendations", async () => {
    mockGetProductById.mockResolvedValue({ data: fakeProduct, error: null });
    mockGetRecommendations.mockResolvedValue({ data: fakeRecs, error: null });

    const page = await ProductPage({ params: { id: fakeProduct.id } });
    render(<Provider store={store}>{page}</Provider>);

    expect(await screen.findByText("Recommended 1")).toBeInTheDocument();
  });

  it("handles notFound case", async () => {
    mockGetProductById.mockResolvedValue({ data: null, error: "Not found" });

    const notFoundMock = jest.fn();
    jest.mock("next/navigation", () => ({ notFound: notFoundMock }));

    const page = await ProductPage({ params: { id: "non-existent" } });
    render(<Provider store={store}>{page}</Provider>);

    expect(notFoundMock).toHaveBeenCalled();
  });
});
