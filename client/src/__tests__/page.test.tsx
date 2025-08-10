import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import { supabase } from "@/lib/supabase";

// Mock Supabase
jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({
      data: [
        {
          id: "1",
          name: "Laptop",
          price: 999.99,
          image_url: "https://placehold.co/400x300",
        },
        {
          id: "2",
          name: "Headphones",
          price: 99.99,
          image_url: "https://placehold.co/400x300",
        },
      ],
      error: null,
    }),
  },
}));

describe("Page component", () => {
  it("renders products from mock data", async () => {
    render(await Page());
    expect(await screen.findByText(/Laptop/i)).toBeInTheDocument();
    expect(await screen.findByText(/Headphones/i)).toBeInTheDocument();
  });
});
