jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import ProductGrid from "@/components/ProductGrid";
import * as supabaseLib from "@/lib/supabase";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const mockGetProducts = supabaseLib.getProducts as jest.MockedFunction<
  typeof supabaseLib.getProducts
>;

const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("ProductGrid", () => {
  const mockProducts = [
    {
      id: "1",
      title: "Mock Product",
      description: "Mock description",
      price: 10,
      image: null,
      category: "Test",
    },
    {
      id: "2",
      title: "Another Product",
      description: "Second mock",
      price: 20,
      image: null,
      category: "Test",
    },
  ];

  beforeEach(() => {
    mockGetProducts.mockReset();
  });
});
