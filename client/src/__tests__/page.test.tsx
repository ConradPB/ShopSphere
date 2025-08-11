import { render, screen, waitFor } from "@testing-library/react";
import Page from "@/app/page";
import { getProducts } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

const mockProducts = [
  { id: 1, title: "Product 1", price: 10, image_url: null },
  { id: 2, title: "Product 2", price: 20, image_url: null },
];

describe("Page", () => {
  it("renders products from getProducts", async () => {
    (getProducts as jest.Mock).mockResolvedValue({
      data: mockProducts,
      error: null,
    });

    render(await Page());

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});
