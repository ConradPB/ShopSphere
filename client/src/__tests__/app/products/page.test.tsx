import { render, screen } from "@testing-library/react";
import ProductsPage from "@/app/products/page";

jest.mock("@/components/ProductGrid", () =>
  jest.fn(() => <div>Mocked Grid</div>)
);

describe("ProductsPage", () => {
  it("renders the products page content", async () => {
    await act(async () => {
      render(<ProductsPage />);
    });

    // Updated to match your actual text
    expect(screen.getByText(/Explore Our Products/i)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ProductsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
