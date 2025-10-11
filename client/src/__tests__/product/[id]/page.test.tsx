import { render, screen, act } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";

// ✅ Define a type for the resolved params
interface ProductPageParams {
  id: string;
}

describe("ProductPage", () => {
  it("renders the product page with correct product info", async () => {
    const params: ProductPageParams = { id: "1" };

    // ✅ Explicitly type this as JSX.Element | null to fix 'Cannot find namespace JSX'
    let page: React.ReactElement | null = null;

    await act(async () => {
      // ✅ Next.js dynamic routes expect a promise for params
      const resolvedPage = await ProductPage({
        params: Promise.resolve(params),
      });
      page = resolvedPage as React.ReactElement;
    });

    // ✅ Render the resolved React element
    render(await page);

    // ✅ Check that product content appears
    const laptopTexts = screen.getAllByText(/laptop/i);
    expect(laptopTexts.length).toBeGreaterThan(0);

    const price = screen.getByText(/\$/i);
    expect(price).toBeInTheDocument();
  });
});
