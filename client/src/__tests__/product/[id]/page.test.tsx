import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// Mock Supabase before importing the page
jest.mock("@/lib/supabase", () => ({
  getProductById: jest.fn().mockResolvedValue({
    data: {
      id: "1",
      title: "Mock Product",
      description: "A test product",
      price: 99.99,
      image: "https://placehold.co/400x300",
      category: "Test",
    },
    error: null,
  }),
  getRecommendations: jest.fn().mockResolvedValue({
    data: [
      {
        id: "2",
        title: "Recommended Product",
        description: "Another one",
        price: 59.99,
        image: "https://placehold.co/400x300",
        category: "Test",
      },
    ],
    error: null,
  }),
}));

import ProductPage from "@/app/product/[id]/page";

describe("Product Page", () => {
  it("renders product details and recommendations", async () => {
    const params = { id: "1" };

    let page: React.ReactElement | null = null;
    await act(async () => {
      const component = await ProductPage({ params });
      page = <Provider store={store}>{component}</Provider>;
    });

    render(page!);

    expect(await screen.findByText(/Mock Product/i)).toBeInTheDocument();
    expect(await screen.findByText(/\$99.99/i)).toBeInTheDocument();
    expect(await screen.findByText(/Recommended Product/i)).toBeInTheDocument();
  });
});
