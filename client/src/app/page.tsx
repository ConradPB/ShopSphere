import { getProducts } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";
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
      <section className="test-hero text-white py-20 relative overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pattern.svg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
              href="/about"
              className="btn-ghost text-white border-white/40 hover:bg-white/10"
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
