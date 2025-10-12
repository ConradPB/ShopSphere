// src/__tests__/product/[id]/page.test.tsx
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import * as productsLib from "@/lib/products";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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
    // lib/products.getProductById returns Product | undefined in your current implementation,
    // so mock it to return the product directly.
    (productsLib.getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const params = { id: "1" };
    const page = await ProductPage({ params: Promise.resolve(params) });

    // Wrap the server-generated element in the redux Provider so client components using hooks work.
    render(<Provider store={store}>{page as React.ReactElement}</Provider>);

    expect(await screen.findByText(/laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1200/i)).toBeInTheDocument();
  });
});
