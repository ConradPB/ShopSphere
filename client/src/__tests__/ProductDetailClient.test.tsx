// __tests__/ProductGrid.test.tsx
import { render, screen } from "@testing-library/react";
import ProductGrid from "@/components/ProductGrid";

describe("ProductGrid", () => {
  const mockProducts = [
    {
      id: "1",
      title: "Product One",
      description: "Description One",
      price: 19.99,
      image: "https://via.placeholder.com/150",
      category: "Category A",
    },
    {
      id: "2",
      title: "Product Two",
      description: "Description Two",
      price: 29.99,
      image: "https://via.placeholder.com/150",
      category: "Category B",
    },
  ];

  it("renders a list of products", () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText("Product One")).toBeInTheDocument();
    expect(screen.getByText("Product Two")).toBeInTheDocument();
  });

  it("renders product images with correct alt text", () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByRole("img", { name: /Product One/i })).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
    expect(screen.getByRole("img", { name: /Product Two/i })).toHaveAttribute(
      "src",
      "https://via.placeholder.com/150"
    );
  });

  it("renders product prices correctly", () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText(/\$19.99/)).toBeInTheDocument();
    expect(screen.getByText(/\$29.99/)).toBeInTheDocument();
  });
});
