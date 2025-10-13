import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("renders layout correctly", () => {
    const { container } = render(
      <RootLayout>
        <p>Child content</p>
      </RootLayout>
    );

    // ✅ Just check that content renders correctly
    expect(screen.getByText("Child content")).toBeInTheDocument();

    // ✅ Check metadata values (title & description)
    expect(metadata.title).toBe("ShopSphere");
    expect(metadata.description).toBe("AI-powered E-commerce Platform");

    // ✅ Optional: ensure a general HTML structure exists
    const main = container.querySelector("main");
    expect(main).not.toBeNull();
  });
});
