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
      {/* HERO / Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-24">
        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg">
            Welcome to Shopsphere
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-white/90">
            Discover amazing products from trusted sellers — curated,
            recommended, and powered by smart tooling.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#featured"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Shop Now
            </a>
            <a
              href="/wishlist"
              className="border border-white/40 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition"
            >
              View Wishlist
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid initialProducts={featured} title="Featured Products" />
        </div>
      </section>
    </main>
  );
}
