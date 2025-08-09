import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";

describe("ProductCard", () => {
  const product = {
    id: 1,
    name: "Laptop",
    price: 999.99,
    image_url: "https://placehold.co/400x300",
  };

  it("renders product name, price, and image", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("$999.99")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Laptop" })).toHaveAttribute(
      "src",
      expect.stringContaining("placehold.co")
    );
  });

  it("handles null image_url with fallback", () => {
    const productNoImage = { ...product, image_url: null };
    render(<ProductCard product={productNoImage} />);
    expect(screen.getByRole("img", { name: "Laptop" })).toHaveAttribute(
      "src",
      expect.stringContaining("fallback-image.jpg")
    );
  });

  it("handles missing name with default", () => {
    const productNoName = { ...product, name: "" };
    render(<ProductCard product={productNoName} />);
    expect(screen.getByText("Unnamed Product")).toBeInTheDocument();
  });
});
