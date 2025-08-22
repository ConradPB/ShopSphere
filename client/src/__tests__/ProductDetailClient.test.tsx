// __tests__/ProductGrid.test.tsx
import { render, screen } from "@testing-library/react";
import ProductGrid from "@/components/ProductGrid";

describe("ProductGrid", () => {
  const mockProducts = [
    {
      id: "1",
      title: "Product One",
      description: "Description One",
      price: 19.99,
      image: "https://via.placeholder.com/150",
      category: "Category A",
    },
    {
      id: "2",
      title: "Product Two",
      description: "Description Two",
      price: 29.99,
      image: "https://via.placeholder.com/150",
      category: "Category B",
    },
  ];

  