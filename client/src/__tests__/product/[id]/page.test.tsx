import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Product } from "@/types/product";

// --- Define Props type based on your page.tsx ---
interface PageProps {
  params: { id: string };
}

// --- Sample product data ---
const testProduct: Product = {
  id: "1",
  title: "Laptop",
  price: 999.99,
  image: "https://placehold.co/400x300",
  description: "Test laptop",
  category: "Electronics",
};

const testRecommendations: Product[] = [
  {
    id: "2",
    title: "Headphones",
    price: 99.99,
    image: "https://placehold.co/400x300",
    description: "Test headphones",
    category: "Electronics",
  },
];

// --- Mock supabase functions locally in test ---
const mockGetProductById = jest.fn(
  async (
    id: string
  ): Promise<{ data: Product | null; error: string | null }> => {
    return { data: id === "1" ? testProduct : null, error: null };
  }
);

const mockGetRecommendations = jest.fn(
  async (
    _productId: string
  ): Promise<{ data: Product[]; error: string | null }> => {
    return { data: testRecommendations, error: null };
  }
);

// --- Mock module imports if your page uses supabase ---
jest.mock("@/lib/supabase", () => ({
  getProductById: (id: string) => mockGetProductById(id),
  getRecommendations: (id: string) => mockGetRecommendations(id),
}));

describe("Product Page", () => {
  it("renders product details", async () => {
    const pageElement = await ProductPage({ params: { id: "1" } } as PageProps);

    render(<Provider store={store}>{pageElement}</Provider>);

    expect(await screen.findByText(testProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${testProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("renders recommendations", async () => {
    const pageElement = await ProductPage({ params: { id: "1" } } as PageProps);

    render(<Provider store={store}>{pageElement}</Provider>);

    for (const rec of testRecommendations) {
      expect(await screen.findByText(rec.title)).toBeInTheDocument();
    }
  });

  it("handles notFound case", async () => {
    mockGetProductById.mockResolvedValueOnce({ data: null, error: null });

    let notFoundThrown = false;
    try {
      await ProductPage({ params: { id: "999" } } as PageProps);
    } catch {
      notFoundThrown = true; // no need to use `e`
    }

    expect(notFoundThrown).toBe(true);
  });
});
