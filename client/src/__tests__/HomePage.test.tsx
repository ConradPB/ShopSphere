import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page"; // adjust if your home component path differs

describe("HomePage", () => {
  it("renders main heading", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("displays a welcome message", () => {
    render(<HomePage />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
