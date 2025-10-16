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
    (productsLib.getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const params = { id: "1" };
    const page = await ProductPage({ params: Promise.resolve(params) });

    // wrap in Provider so client-side hooks work
    render(<Provider store={store}>{page as React.ReactElement}</Provider>);

    // Use the heading role to target the product title distinctly (avoids matching description)
    expect(
      await screen.findByRole("heading", { name: /laptop/i, level: 1 })
    ).toBeInTheDocument();

    // Price check
    expect(screen.getByText(/\$1200/i)).toBeInTheDocument();

    // Description check (explicit)
    expect(
      screen.getByText(/high performance laptop/i, { selector: "p" })
    ).toBeInTheDocument();
  });
});
