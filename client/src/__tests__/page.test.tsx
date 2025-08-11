import { render, screen, waitFor } from "@testing-library/react";
import Page from "../app/page";
import { getProducts } from "../lib/supabase";

jest.mock("../lib/supabase", () => ({
  getProducts: jest.fn(),
}));

describe("Page", () => {
  it("renders products from getProducts", async () => {
    (getProducts as jest.Mock).mockResolvedValue([
      { id: "1", name: "Product 1", image_url: "", price: 10 },
      { id: "2", name: "Product 2", image_url: "", price: 20 },
    ]);

    render(await Page());

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});
