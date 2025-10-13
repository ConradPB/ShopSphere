import { render, screen } from "@testing-library/react";
import CartDrawer from "@/components/CartDrawer";

describe("CartDrawer Component", () => {
  it("renders the drawer", () => {
    render(<CartDrawer />);
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  it("displays empty cart message when no items", () => {
    render(<CartDrawer />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
