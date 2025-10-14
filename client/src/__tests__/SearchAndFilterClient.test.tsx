import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndFilterClient from "@/components/SearchAndFilterClient";
import "@testing-library/jest-dom";

const mockProducts = [
  {
    id: "1",
    title: "Apple",
    price: 1.5,
    image: "/apple.jpg",
    description: "Fresh apple",
    category: "fruits",
  },
  {
    id: "2",
    title: "Banana",
    price: 1.0,
    image: "/banana.jpg",
    description: "Sweet banana",
    category: "fruits",
  },
  {
    id: "3",
    title: "Carrot",
    price: 0.8,
    image: "/carrot.jpg",
    description: "Healthy carrot",
    category: "vegetables",
  },
  {
    id: "4",
    title: "Detergent",
    price: 3.2,
    image: "/detergent.jpg",
    description: "Powerful cleaner",
    category: "household",
  },
];

describe("SearchAndFilterClient", () => {
  it("renders all products initially", () => {
    render(<SearchAndFilterClient initialProducts={mockProducts} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Carrot")).toBeInTheDocument();
    expect(screen.getByText("Detergent")).toBeInTheDocument();
  });

  it("filters products by search input", () => {
    render(<SearchAndFilterClient initialProducts={mockProducts} />);
    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "apple" } });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
    expect(screen.queryByText("Carrot")).not.toBeInTheDocument();
  });

  it("filters products by category", () => {
    render(<SearchAndFilterClient initialProducts={mockProducts} />);
    const categorySelect = screen.getAllByRole("combobox")[0]; // first select (category)
    fireEvent.change(categorySelect, { target: { value: "vegetables" } });

    expect(screen.getByText("Carrot")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });

  it("sorts products by price low to high", () => {
    render(<SearchAndFilterClient initialProducts={mockProducts} />);
    const sortSelect = screen.getAllByRole("combobox")[1]; // second select (sort)
    fireEvent.change(sortSelect, { target: { value: "low-to-high" } });

    const prices = screen
      .getAllByText(/\$/)
      .map((el) => parseFloat(el.textContent?.replace("$", "") || "0"));

    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it("sorts products by price high to low", () => {
    render(<SearchAndFilterClient initialProducts={mockProducts} />);
    const sortSelect = screen.getAllByRole("combobox")[1];
    fireEvent.change(sortSelect, { target: { value: "high-to-low" } });

    const prices = screen
      .getAllByText(/\$/)
      .map((el) => parseFloat(el.textContent?.replace("$", "") || "0"));

    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
