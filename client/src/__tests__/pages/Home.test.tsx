// src/__tests__/pages/Home.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page"; // adjust path if needed
import { getProducts } from "@/lib/supabase"; // mocked

jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

describe("Home Page", () => {
  it("renders product cards when products are available", async () => {
    (getProducts as jest.Mock).mockResolvedValueOnce([
      { id: 1, name: "Laptop", image_url: "/laptop.png" },
      { id: 2, name: "Headphones", image_url: "/headphones.png" },
    ]);

    render(<Home />);

    expect(await screen.findByText("ShopSphere Products")).toBeInTheDocument();
    expect(await screen.findByText("Laptop")).toBeInTheDocument();
    expect(await screen.findByText("Headphones")).toBeInTheDocument();

    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("displays error message when Supabase fails", async () => {
    (getProducts as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

    render(<Home />);

    expect(
      await screen.findByText("Error loading products: DB error")
    ).toBeInTheDocument();
  });

  it("displays no products message when no products are available", async () => {
    (getProducts as jest.Mock).mockResolvedValueOnce([]);

    render(<Home />);

    expect(
      await screen.findByText("No products available.")
    ).toBeInTheDocument();
  });
});
