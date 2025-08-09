import { render, screen } from "@testing-library/react";
import Hello from "@/components/Hello";

test("renders a greeting", () => {
  render(<Hello name="World" />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});
