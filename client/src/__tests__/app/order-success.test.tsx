import { render, screen } from "@testing-library/react";
import OrderSuccessPage from "@/app/order-success/page";

test("order success page renders", async () => {
  const page = await OrderSuccessPage();
  render(page as React.ReactElement);
  // look for common success words
  expect(screen.getByText(/success|thank you|order/i)).toBeDefined();
});
