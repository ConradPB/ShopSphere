import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import * as productsLib from "@/lib/products";

jest.mock("@/lib/products");

const mockProduct = {
  id: "1",
  title: "Laptop",
  description: "High performance laptop",
  price: 1200,
  image: "/laptop.png",
};

describe("ProductPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the product page with correct product info", async () => {
    (productsLib.getProduct as jest.Mock).mockResolvedValue(mockProduct);

    const params = { id: "1" };
    const page = await ProductPage({ params: Promise.resolve(params) });
    render(page as React.ReactElement);

    expect(await screen.findByText(/laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1200/i)).toBeInTheDocument();
  });
});
