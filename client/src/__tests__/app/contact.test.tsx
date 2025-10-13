import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

test("contact page renders", async () => {
  const page = await ContactPage();
  render(page as React.ReactElement);
  expect(
    screen.getByText(/contact/i) || screen.getAllByRole("heading").length
  ).toBeDefined();
});
