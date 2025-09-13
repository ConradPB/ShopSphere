import React from "react";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";

export default async function HomePage() {
  // Fetch products from Supabase
  const { data, error } = await getProducts();
  const products: Product[] = data ?? [];

  if (error) {
    console.error("getProducts error:", error);
  }

  // Limit to first 4-6 products for Featured section
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Temporary Hero */}
      <section className="bg-neutral-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
        <p className="mt-2 text-lg">Shop the best products, curated for you.</p>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h2 className="font-display text-heading-md">Featured Products</h2>
          <p className="text-body-base text-neutral-600 mt-2">
            Handpicked items you’ll love.
          </p>
        </header>

        <ProductGrid products={featuredProducts} />

        <div className="mt-8 text-center">
          <a
            href="/shop"
            className="inline-block rounded-2xl bg-neutral-900 text-white px-6 py-3 text-body-base font-medium hover:bg-neutral-700 transition"
          >
            View All Products
          </a>
        </div>
      </section>
    </main>
  );
}
