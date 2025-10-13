import { render, screen } from "@testing-library/react";
import Page from "@/app/cart/page";

describe("Cart Page", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});
