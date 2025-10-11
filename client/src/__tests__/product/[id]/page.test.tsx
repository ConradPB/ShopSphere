// src/__tests__/product/[id]/page.test.tsx
// Mock supabase BEFORE importing the page so the module that creates a client
// (which uses env vars) never runs in tests.
jest.mock("@/lib/supabase", () => ({
  getProductById: jest.fn(),
  getRecommendations: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import * as supabaseLib from "@/lib/supabase";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

/**
 * The real page expects `params` to be a Promise that resolves to the route params:
 *   export default async function ProductPage({ params }: PageProps) {
 *     const { id } = await params;
 *     ...
 *   }
 *
 * So our test must pass a Promise for `params`.
 */
interface PagePropsForTest {
  params: Promise<{ id: string }>;
}

const mockGetProductById = supabaseLib.getProductById as jest.MockedFunction<
  (id: string) => Promise<{ data: Product | null; error: string | null }>
>;

describe("ProductPage", () => {
  const fakeProduct: Product = {
    id: "17",
    title: "Test Laptop",
    price: 1299.99,
    image: null,
    description: "A great test laptop",
    category: "Test",
  };

  beforeEach(() => {
    mockGetProductById.mockReset();
  });

  it("renders product details when product exists", async () => {
    mockGetProductById.mockResolvedValue({ data: fakeProduct, error: null });

    const props: PagePropsForTest = {
      params: Promise.resolve({ id: fakeProduct.id }),
    };

    // ProductPage is an async server component, call it and render the returned tree
    const page = await ProductPage(props);

    // Wrap returned element in Provider so client components (that use Redux) work
    render(<Provider store={store}>{page}</Provider>);

    // content should appear
    expect(await screen.findByText(fakeProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${fakeProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });
});
