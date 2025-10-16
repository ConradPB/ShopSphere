import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

test("about page renders", async () => {
  const page = await AboutPage();
  render(page as React.ReactElement);
  expect(
    screen.getByRole("heading", { level: 1 }) || screen.getByText(/about/i)
  ).toBeDefined();
});
