import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

test("contact page renders", () => {
  // Call the page function to get JSX
  render(<>{ContactPage()}</>);

  expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
});
