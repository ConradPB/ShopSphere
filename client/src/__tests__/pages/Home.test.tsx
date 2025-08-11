import { render, screen } from "@testing-library/react";
import Home from "@/components/Home";

const mockProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    image_url: "https://placehold.co/400x300",
  },
  {
    id: 2,
    name: "Headphones",
    price: 99.99,
    image_url: "https://placehold.co/400x300",
  },
];

describe("Home Page", () => {
  it("renders product cards when products are available", () => {
    render(<Home products={mockProducts} />);

    expect(screen.getByText("Featured Products")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Headphones")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("displays error message when Supabase fails", () => {
    render(<Home products={[]} error="DB error" />);
    expect(
      screen.getByText("Error loading products: DB error")
    ).toBeInTheDocument();
  });

  it("displays no products message when no products are available", () => {
    render(<Home products={[]} />);
    expect(screen.getByText("No products available.")).toBeInTheDocument();
  });
});
