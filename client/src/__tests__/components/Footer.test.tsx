import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText(/©/i)).toBeInTheDocument();
  });

  it("renders contact or link info", () => {
    render(<Footer />);
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });
});
