import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { CartProvider } from "@/context/CartContext";

const renderWithCart = (ui: React.ReactNode) =>
  render(<CartProvider>{ui}</CartProvider>);

describe("ProductCard", () => {
  it("renders correctly with given props", () => {
    const product = {
      id: "1",
      title: "Test Product",
      image: "/test.jpg",
      price: 100,
    };

    renderWithCart(<ProductCard product={product} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/\$100(\.00)?/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test Product" })).toHaveAttribute(
      "src",
      "/test.jpg"
    );
  });

  it("renders fallback name when title is missing", () => {
    const product = { id: "2", title: "", image: "/test2.jpg", price: 100 };

    renderWithCart(<ProductCard product={product} />);

    expect(screen.getByText("Unnamed Product")).toBeInTheDocument();
    expect(screen.getByText(/\$100(\.00)?/)).toBeInTheDocument();
  });
});
