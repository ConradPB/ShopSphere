import { getProducts } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";

export default async function HomePage() {
  const { data: products, error } = await getProducts();
  if (error) console.error("Error fetching products:", error);
  const featured = (products ?? []).slice(0, 6);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO / Banner */}
      <section
        className="text-white py-20 relative overflow-hidden"
        style={{
          // inline gradient ensures color appears even if Tailwind class wasn't applied
          background: "linear-gradient(90deg,#06b6d4 0%, #0ea5b9 100%)",
        }}
      >
        {/* subtle pattern overlay (pointer-events-none so it doesn't block clicks) */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/pattern-geo.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "140px 140px",
            backgroundPosition: "center",
            opacity: 0.06, // very subtle; increase to 0.12 to make it stronger
            mixBlendMode: "overlay", // soft blend — remove if it looks odd
          }}
        />

        {/* content (keeps above the overlay) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="hero-title font-bold">Welcome to Shopsphere</h1>
          <p className="mt-3 text-body-lg max-w-2xl mx-auto text-white/90">
            Discover amazing products from trusted sellers — curated,
            recommended, and powered by smart tooling.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a href="/shop" className="btn-primary">
              Shop Now
            </a>
            <a
              className="btn-ghost text-white border-white/40 hover:bg-white/10"
              href="/about"
            >
              Learn More
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
