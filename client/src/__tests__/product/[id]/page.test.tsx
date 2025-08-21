import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import * as supabaseLib from "@/lib/supabase";
import { Product } from "@/types/product";
import * as nextNavigation from "next/navigation";

// Mock supabase getProductById
jest.mock("@/lib/supabase");
const mockGetProductById = supabaseLib.getProductById as jest.Mock;

// Spy on notFound
jest.spyOn(nextNavigation, "notFound").mockImplementation(() => {
  throw new Error("notFound called");
});

describe("Product Page", () => {
  const fakeProduct: Product = {
    id: "1",
    title: "Laptop",
    price: 999.99,
    image: "https://placehold.co/400x300",
    description: "Test laptop",
    category: "Electronics",
  };

  beforeEach(() => {
    mockGetProductById.mockReset();
  });

  it("renders product details", async () => {
    mockGetProductById.mockResolvedValue({ data: fakeProduct, error: null });

    const pageElement: React.ReactNode = await ProductPage({
      params: { id: "1" },
    });

    render(<Provider store={store}>{pageElement}</Provider>);

    expect(await screen.findByText(fakeProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${fakeProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("handles notFound case", async () => {
    mockGetProductById.mockResolvedValue({ data: null, error: "Not found" });

    await expect(ProductPage({ params: { id: "999" } })).rejects.toThrow(
      "notFound called"
    );
  });
});
