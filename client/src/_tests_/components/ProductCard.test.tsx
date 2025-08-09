import { render } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";

describe("ProductCard", () => {
  const product = {
    id: 1,
    name: "Laptop",
    price: 999.99,
    image_url: "https://placehold.co/400x300",
  };

  it("renders product name, price, and image", () => {
    const { getByText, getByRole } = render(<ProductCard product={product} />);
    expect(getByText("Laptop")).toBeInTheDocument();
    expect(getByText("$999.99")).toBeInTheDocument();
    expect(getByRole("img", { name: "Laptop" })).toHaveAttribute(
      "src",
      expect.stringContaining("placehold.co")
    );
  });

  it("handles null image_url with fallback", () => {
    const productNoImage = { ...product, image_url: null };
    const { getByRole } = render(<ProductCard product={productNoImage} />);
    expect(getByRole("img", { name: "Laptop" })).toHaveAttribute(
      "src",
      expect.stringContaining("fallback-image.jpg")
    );
  });

  it("handles missing name with default", () => {
    const productNoName = { ...product, name: "" };
    const { getByText } = render(<ProductCard product={productNoName} />);
    expect(getByText("Unnamed Product")).toBeInTheDocument();
  });
});
