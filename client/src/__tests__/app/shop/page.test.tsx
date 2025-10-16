import { render, screen } from "@testing-library/react";
import ShopPage from "@/app/shop/page";
import * as supabase from "@/lib/supabase";

jest.mock("@/lib/supabase");

describe("ShopPage", () => {
  it("renders the Shop heading and fetches products", async () => {
    (supabase.getProducts as jest.Mock).mockResolvedValueOnce({
      data: [],
      error: null,
    });

    const Shop = await ShopPage();
    render(Shop);

    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(supabase.getProducts).toHaveBeenCalledTimes(1);
  });
});
