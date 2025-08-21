import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ProductPage from "@/app/product/[id]/page";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductById } from "@/lib/supabase";

// Mock supabase
jest.mock("@/lib/supabase", () => ({
  getProductById: jest.fn(),
}));

const mockProduct = {
  id: "1",
  title: "Laptop",
  price: 999.99,
  image: "/laptop.jpg",
  description: "High-end laptop",
  category: "Electronics",
};

const mockRecs = [
  {
    id: "2",
    title: "Mouse",
    price: 49.99,
    image: "/mouse.jpg",
    description: "Wireless mouse",
    category: "Electronics",
  },
];

describe("Product Page", () => {
  beforeEach(() => {
    (getProductById as jest.Mock).mockResolvedValue({
      data: mockProduct,
      error: null,
    });
  });

  it("renders product details", async () => {
    render(
      <Provider store={store}>
        <ProductDetailClient
          product={mockProduct}
          initialRecs={mockRecs}
          fetchRecs={jest.fn()}
        />
      </Provider>
    );

    // Check product title and price
    expect(await screen.findByText(mockProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("renders recommendations", async () => {
    render(
      <Provider store={store}>
        <ProductDetailClient
          product={mockProduct}
          initialRecs={mockRecs}
          fetchRecs={jest.fn()}
        />
      </Provider>
    );

    for (const rec of mockRecs) {
      expect(await screen.findByText(rec.title)).toBeInTheDocument();
    }
  });

  it("handles notFound case", async () => {
    (getProductById as jest.Mock).mockResolvedValue({
      data: null,
      error: "Not found",
    });

    // Mock notFound to prevent actual navigation error
    const notFoundMock = jest.fn();
    jest.mock("next/navigation", () => ({ notFound: notFoundMock }));

    render(
      <Provider store={store}>
        <ProductPage params={{ id: "non-existent" }} />
      </Provider>
    );

    expect(notFoundMock).toHaveBeenCalled();
  });
});
