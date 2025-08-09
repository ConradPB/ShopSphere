import { render } from "@testing-library/react";
import Home from "@/app/page";
import { supabase } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
    })),
  },
}));

describe("Home Page", () => {
  const mockProducts = [
    {
      id: 1,
      created_at: "2025-08-07T05:52:01.624794+00:00",
      name: "Laptop",
      price: 999.99,
      image_url: "https://placehold.co/400x300",
    },
    {
      id: 2,
      created_at: "2025-08-07T05:52:01.624794+00:00",
      name: "Headphones",
      price: 99.99,
      image_url: "https://placehold.co/400x300",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product cards when products are available", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: mockProducts, error: null }),
    });

    // If Home uses getStaticProps, pass mock props
    const { getByText, getAllByRole } = render(<Home />);
    expect(getByText("ShopSphere Products")).toBeInTheDocument();
    expect(getByText("Laptop")).toBeInTheDocument();
    expect(getByText("Headphones")).toBeInTheDocument();
    expect(getAllByRole("img")).toHaveLength(2);
  });

  it("displays error message when Supabase fails", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest
        .fn()
        .mockResolvedValue({ data: null, error: { message: "DB error" } }),
    });

    const { getByText } = render(<Home />);
    expect(getByText("Error loading products: DB error")).toBeInTheDocument();
  });

  it("displays no products message when no products are available", async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    });

    const { getByText } = render(<Home />);
    expect(getByText("No products available.")).toBeInTheDocument();
  });
});
