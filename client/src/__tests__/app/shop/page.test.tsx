/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ShopPage from "@/app/shop/page";

// Mock the supabase getProducts function to return fake products
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn().mockResolvedValue({
    data: [
      { id: 1, name: "Product A", price: 10 },
      { id: 2, name: "Product B", price: 20 },
    ],
    error: null,
  }),
}));

describe("Shop Page", () => {
  it("renders shop page with products", async () => {
    // Dynamically import the page since it's async
    const Page = await ShopPage();
    render(Page);

    // Wait for heading or content
    await waitFor(() => {
      const mainElement = screen.getByRole("main");
      expect(mainElement).toBeInTheDocument();
    });
  });
});
