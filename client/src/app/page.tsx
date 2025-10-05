import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/supabase";

export default async function HomePage() {
  // server-side fetch (same as you had)
  const { data: products, error } = await getProducts();
  if (error) console.error("Error fetching products:", error);

  const featured = (products ?? []).slice(0, 6);

  return (
    <>
      <Hero />

      {/* secondary banner / supporting section (keeps visual weight after hero) */}
      <section className="relative bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-600 text-white py-24 shadow-lg overflow-hidden mt-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold font-display drop-shadow-lg">
            Welcome to ShopSphere
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover the best products, curated just for you. Shop smarter, live
            better.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/products"
              className="bg-accent-green hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              Shop Now
            </a>
            <a
              href="/about"
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="featured" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid initialProducts={featured} title="Featured Products" />
        </div>
      </section>
    </>
  );
}
