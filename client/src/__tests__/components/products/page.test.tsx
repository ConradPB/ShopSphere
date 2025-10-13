import { render, screen } from "@testing-library/react";
import ProductsPage from "@/app/products/page";
import ProductGrid from "@/components/ProductGrid";

jest.mock("@/components/ProductGrid", () =>
  jest.fn(() => <div>Mocked Grid</div>)
);

describe("ProductsPage", () => {
  it("renders page title and product grid", () => {
    render(<ProductsPage />);
    expect(screen.getByText("All Products")).toBeInTheDocument();
    expect(screen.getByText("Mocked Grid")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ProductsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
