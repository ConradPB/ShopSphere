import { render, screen } from "@testing-library/react";
import ShopPage from "@/app/shop/page";

describe("Shop Page", () => {
  it("renders the shop page correctly", () => {
    render(<ShopPage />);

    // Test for common section headings or text
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();

    // Optional content test (if your page has products or categories)
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });
});
