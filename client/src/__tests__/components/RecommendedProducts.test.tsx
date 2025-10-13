import { render, screen } from "@testing-library/react";
import RecommendedProducts from "@/components/RecommendedProducts";

describe("RecommendedProducts", () => {
  it("renders a heading for recommended products", () => {
    render(<RecommendedProducts products={[]} />);
    expect(screen.getByText(/Recommended/i)).toBeInTheDocument();
  });

  it("renders product cards when provided", () => {
    const mockProducts = [
      { id: "1", title: "Product A", price: 25, image: "/imgA.png" },
      { id: "2", title: "Product B", price: 40, image: "/imgB.png" },
    ];

    render(<RecommendedProducts products={mockProducts} />);

    // Check that each product title is visible
    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });
});
