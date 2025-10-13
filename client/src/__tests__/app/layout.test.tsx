import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("renders children inside Providers", () => {
    render(
      <RootLayout>
        <div data-testid="child">Hello Layout</div>
      </RootLayout>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies html lang and body class correctly", () => {
    const { container } = render(<RootLayout>Content</RootLayout>);
    const html = container.querySelector("html");
    const body = container.querySelector("body");

    expect(html).toHaveAttribute("lang", "en");
    expect(body?.className).toContain("inter");
  });

  it("has proper metadata", () => {
    expect(metadata.title).toBe("ShopSphere");
    expect(metadata.description).toBe("A modern ecommerce platform");
  });
});
