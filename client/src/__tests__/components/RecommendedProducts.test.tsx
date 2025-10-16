import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import RecommendedProducts from "@/components/RecommendedProducts";

const mockProducts = [
  {
    id: "1",
    title: "Test Product 1",
    price: 99.99,
    description: "Test description 1",
    image: "test-image-1.jpg",
  },
  {
    id: "2",
    title: "Test Product 2",
    price: 149.99,
    description: "Test description 2",
    image: "test-image-2.jpg",
  },
];

describe("RecommendedProducts", () => {
  it("renders product titles", () => {
    render(
      <Provider store={store}>
        <RecommendedProducts products={mockProducts} />
      </Provider>
    );

    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles.length).toBeGreaterThan(0);
  });
});
