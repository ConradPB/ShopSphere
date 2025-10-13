import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("renders layout correctly", () => {
    const { container } = render(
      <RootLayout>
        <p>Child content</p>
      </RootLayout>
    );

    // ✅ Match actual metadata
    expect(metadata.title).toBe("ShopSphere");
    expect(metadata.description).toBe("AI-powered E-commerce Platform");

    // ✅ Fix element queries
    const html = container.querySelector("html");
    const body = container.querySelector("body");

    expect(html).not.toBeNull();
    expect(body).not.toBeNull();
    expect(html).toHaveAttribute("lang", "en");
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
