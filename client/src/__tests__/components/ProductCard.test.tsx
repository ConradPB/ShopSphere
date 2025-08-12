import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";

describe("ProductCard", () => {
  it("renders correctly with given props", () => {
    render(
      <ProductCard id="1" name="Test Product" image="/test.jpg" price={100} />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/\$100(\.00)?/)).toBeInTheDocument();
  });

  it("renders default name when none is provided", () => {
    render(<ProductCard id="2" image="/test2.jpg" price={100} />);

    expect(screen.getByText("Unnamed Product")).toBeInTheDocument();
    expect(screen.getByText(/\$100(\.00)?/)).toBeInTheDocument();
  });
});
