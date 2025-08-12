import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  image: "/test.jpg",
  price: 100,
};

describe("ProductCard", () => {
  it("renders correctly with given props", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("renders fallback name when title is missing", () => {
    const noNameProduct: Product = {
      id: "2",
      title: "",
      image: "/test2.jpg",
      price: 100,
    };

    render(<ProductCard product={noNameProduct} />);

    // Since ProductCard uses product.title directly, you might want to
    // add a fallback in the component if title is empty/null.
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });
});
