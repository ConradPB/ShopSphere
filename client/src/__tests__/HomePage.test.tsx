import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import * as productsLib from "@/lib/products";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

jest.mock("@/lib/products");

const mockProducts = [
  { id: "1", title: "Laptop", price: 999, image: "/laptop.png" },
  { id: "2", title: "Phone", price: 799, image: "/phone.png" },
];

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (productsLib.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it("renders product cards correctly", async () => {
    const page = await HomePage();
    render(<Provider store={store}>{page as React.ReactElement}</Provider>);

    const cards = await screen.findAllByTestId("product-card");
    expect(cards.length).toBeGreaterThan(0);
  });
});
