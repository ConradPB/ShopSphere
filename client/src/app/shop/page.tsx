import React from "react";
import SearchAndFilterClient from "@/components/SearchAndFilterClient";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";

export default async function ShopPage() {
  const { data, error } = await getProducts();
  const products: Product[] = data ?? [];

  if (error) {
    console.error("getProducts error:", error);
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="font-display text-heading-lg">Shop</h1>
          <p className="text-body-base text-neutral-600 mt-2">
            Browse our curated collection. Use search and filters to find
            exactly what you’re looking for.
          </p>
        </header>

        {/* Single source of truth: Search + Filter + Grid + Pagination */}
        <SearchAndFilterClient initialProducts={products} />
      </section>
    </main>
  );
}
