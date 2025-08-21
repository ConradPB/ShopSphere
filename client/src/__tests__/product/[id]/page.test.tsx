import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Product } from "@/types/product";

interface PageProps {
  params: { id: string };
}

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

jest.mock("@/lib/supabase", () => ({
  getProductById: jest.fn(async (_id: string) => ({
    data: testProduct,
    error: null,
  })),
  getRecommendations: jest.fn(async (_id: string) => ({
    data: testRecommendations,
    error: null,
  })),
}));

describe("Product Page", () => {
  it("renders product details", async () => {
    const element = await ProductPage({ params: { id: "1" } } as PageProps);
    render(<Provider store={store}>{element}</Provider>);
    expect(await screen.findByText(testProduct.title)).toBeInTheDocument();
  });

  it("renders recommendations", async () => {
    const element = await ProductPage({ params: { id: "1" } } as PageProps);
    render(<Provider store={store}>{element}</Provider>);
    for (const rec of testRecommendations) {
      expect(await screen.findByText(rec.title)).toBeInTheDocument();
    }
  });
});
