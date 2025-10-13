import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@/components/ui/Button";

describe("UI Button", () => {
  it("renders children and supports props", () => {
    render(<Button data-testid="btn">Click me</Button>);
    expect(screen.getByTestId("btn")).toHaveTextContent("Click me");
  });
});
