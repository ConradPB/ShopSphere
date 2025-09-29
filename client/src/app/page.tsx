import { getProducts } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";

export default async function HomePage() {
  // Fetch products server-side
  const { data: products, error } = await getProducts();

  if (error) {
    console.error("Error fetching products:", error);
  }

  const featured = (products ?? []).slice(0, 6);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO (simple, uses theme tokens) */}
      <section className="bg-gradient-to-r from-primary-light to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-heading-xl font-bold">
            Welcome to Shopsphere
          </h1>
          <p className="mt-3 text-body-lg max-w-2xl mx-auto text-white/90">
            Discover amazing products from trusted sellers — curated,
            recommended, and powered by smart tooling.
          </p>
        </div>
      </section>
      <div className="grid grid-cols-3 gap-4 bg-red-100 p-4">
        <div className="bg-blue-200 p-4">Box 1</div>
        <div className="bg-blue-200 p-4">Box 2</div>
        <div className="bg-blue-200 p-4">Box 3</div>
        <div className="bg-blue-200 p-4">Box 4</div>
      </div>

      {/* Featured products */}
      <ProductGrid initialProducts={featured} title="Featured Products" />
    </main>
  );
}
