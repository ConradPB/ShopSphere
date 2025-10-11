import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import * as productsLib from "@/lib/products";

jest.mock("@/lib/products");

const mockProducts = [
  { id: "1", title: "Laptop", price: 999 },
  { id: "2", title: "Phone", price: 799 },
];

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (productsLib.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it("renders product cards correctly", async () => {
    const page = await HomePage();
    render(page as React.ReactElement);

    const cards = await screen.findAllByTestId("product-card");
    expect(cards.length).toBeGreaterThan(0);
  });
});
