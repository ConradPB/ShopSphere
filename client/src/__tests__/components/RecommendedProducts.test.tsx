import { render, screen } from "@testing-library/react";
import RecommendedProducts from "@/components/RecommendedProducts";
import { Product } from "@/types/product";

describe("RecommendedProducts", () => {
  it("renders product titles", () => {
    const mockProducts: Product[] = [
      {
        id: "1", // ✅ id is now a string
        title: "Test Product",
        price: 29.99,
        image: "/test.jpg",
        description: "Nice item",
      },
    ];

    render(<RecommendedProducts products={mockProducts} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});
