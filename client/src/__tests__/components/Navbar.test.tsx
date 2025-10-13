import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";

describe("Navbar Component", () => {
  it("renders the brand or logo text", () => {
    render(
      <Provider store={mockStore}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });
});
