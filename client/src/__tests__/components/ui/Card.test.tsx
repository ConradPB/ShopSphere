import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "@/components/ui/Card"; // default import

describe("Card", () => {
  it("renders title and price correctly", () => {
    render(
      <Card
        title="Test Product"
        price={19.99}
        imageSrc="/mock.jpg"
        onAdd={jest.fn()}
        href="/product/test-product"
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/\$?19\.99/)).toBeInTheDocument();
  });
});
