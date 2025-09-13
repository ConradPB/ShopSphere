import React from "react";
import ProductGrid from "@/components/ProductGrid";
import SearchAndFilterClient from "@/components/SearchAndFilterClient";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";

export default async function ShopPage() {
  // server-side fetch
  const { data, error } = await getProducts();
  const products: Product[] = data ?? [];

  // optionally handle error: log, show message, etc.
  if (error) {
    console.error("getProducts error:", error);
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-heading-lg">Shop</h1>
            <p className="text-body-base text-neutral-600 mt-1">
              Browse all products — curated and recommended for you.
            </p>
          </div>
        </div>

        {/* Pass the server-fetched products to the client filter component */}
        <div className="mt-6">
          <SearchAndFilterClient initialProducts={products} />
        </div>
      </div>

      {/* ProductGrid will also render the same list (initialProducts) */}
      <section className="bg-neutral-50">
        <ProductGrid initialProducts={products} />
      </section>
    </div>
  );
}
