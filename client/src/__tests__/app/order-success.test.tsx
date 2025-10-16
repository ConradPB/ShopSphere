import { render, screen } from "@testing-library/react";
import OrderSuccessPage from "@/app/order-success/page";

test("order success page renders", () => {
  // Call the page function so it returns JSX
  render(<>{OrderSuccessPage()}</>);

  const successMessages = screen.getAllByText(/success|thank you|order/i);
  expect(successMessages.length).toBeGreaterThan(0);
});
