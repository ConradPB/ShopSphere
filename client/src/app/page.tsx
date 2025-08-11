"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase";
import type { Product } from "@/types/product";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await getProducts();
      if (!mounted) return;
      if (error) {
        setError(error);
        setProducts([]);
      } else {
        setProducts(data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 py-12">Error: {error}</p>;
  if (products.length === 0)
    return <p className="text-center py-12">No products found.</p>;

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          ShopSphere
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover curated products — clean design, great prices.
        </p>
      </section>

      {/* Products Grid */}
      <section id="products" aria-labelledby="featured-heading">
        <h2
          id="featured-heading"
          className="text-2xl font-semibold text-gray-900 mb-8 text-center"
        >
          Featured Products
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image ?? "/fallback-image.jpg"}
                  alt={product.title}
                  className="w-full h-52 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {product.title}
                </h3>
                <p className="text-indigo-600 font-bold mt-2">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
