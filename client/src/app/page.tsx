import { getProducts } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";

export default async function HomePage() {
  // Fetch products server-side
  const { data: products, error } = await getProducts();

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <main>
      {/* Hero section (optional later) */}
      <div className="bg-gray-50 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Shopsphere</h1>
        <p className="text-gray-600">
          Discover amazing products from trusted sellers
        </p>
      </div>

      {/* Product grid */}
      <ProductGrid initialProducts={products ?? []} title="Featured Products" />
    </main>
  );
}
