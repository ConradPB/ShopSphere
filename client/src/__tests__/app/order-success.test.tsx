import { render, screen } from "@testing-library/react";
import page from "@/app/order-success/page";

test("order success page renders", () => {
  render(page as React.ReactElement);
  // look for any success-related text — multiple allowed
  const successMessages = screen.getAllByText(/success|thank you|order/i);
  expect(successMessages.length).toBeGreaterThan(0);
});
