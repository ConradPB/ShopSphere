import { getProducts } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";

export default async function HomePage() {
  const { data: products, error } = await getProducts();
  if (error) console.error("Error fetching products:", error);
  const featured = (products ?? []).slice(0, 6);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO / Banner */}

      {/* Featured Products */}
      <section id="featured" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid initialProducts={featured} title="Featured Products" />
        </div>
      </section>
    </main>
  );
}
