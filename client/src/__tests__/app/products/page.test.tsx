import { render, screen, act } from "@testing-library/react";
import ProductsPage from "@/app/products/page";

describe("ProductsPage", () => {
  it("renders the products page content", async () => {
    await act(async () => {
      render(<ProductsPage />);
    });

    // Updated to match your actual text
    expect(screen.getByText(/Explore Our Products/i)).toBeInTheDocument();
  });
});
