import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

jest.mock("@/lib/supabase", () => ({
  getProductById: jest.fn(async (_id: string) => ({
    data: {
      id: "1",
      title: "Laptop",
      price: 999.99,
      image: "https://placehold.co/400x300",
    },
    error: null,
  })),
}));

describe("Product Page", () => {
  it("renders product details", async () => {
    const element = await ProductPage({ params: { id: "1" } });
    render(<Provider store={store}>{element}</Provider>);

    expect(await screen.findByText("Laptop")).toBeInTheDocument();
    expect(await screen.findByText("$999.99")).toBeInTheDocument();
  });
});
