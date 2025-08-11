jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import { getProducts } from "@/lib/supabase";

const mockProducts = [
  { id: "1", title: "Product 1", price: 10, image: "/test1.jpg" },
  { id: "2", title: "Product 2", price: 20, image: "/test2.jpg" },
];

describe("Page", () => {
  it("renders products from getProducts", async () => {
    (getProducts as jest.Mock).mockResolvedValue({
      data: mockProducts,
      error: null,
    });

    render(<Page />);

    // wait for async update from useEffect
    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(await screen.findByText("Product 2")).toBeInTheDocument();
  });
});
