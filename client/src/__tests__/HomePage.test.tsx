import { render, screen, act } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the main heading correctly", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    // ✅ Expect the main <h1> to exist
    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/discover products that inspire/i);
  });

  it("renders the featured products section", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    // ✅ Wait for "Featured Products" heading (could be h2)
    const sectionHeading = await screen.findByText(/featured products/i);
    expect(sectionHeading).toBeInTheDocument();
  });

  it("renders product cards correctly", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    // ✅ Ensure at least one product card is shown
    const products = await screen.findAllByTestId("product-card");
    expect(products.length).toBeGreaterThan(0);
  });
});
