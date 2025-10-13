import { render, screen } from "@testing-library/react";
import Page from "@/app/checkout/page";

describe("Checkout Page", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  });
});
