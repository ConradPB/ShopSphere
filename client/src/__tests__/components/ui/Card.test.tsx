import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "@/components/ui/Card"; // default import

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });
});
