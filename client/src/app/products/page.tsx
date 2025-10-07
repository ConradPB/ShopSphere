"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getProducts();
      if (error) {
        console.error("Error loading products:", error);
      } else {
        setProducts(data ?? []);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-slate-900 to-neutral-950 text-white py-20">
      {/* Decorative light glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[110px] rounded-full" />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 font-display tracking-tight">
            Explore Our Products
          </h1>
        </Reveal>

        {/* Loading / Error / Grid States */}
        {loading ? (
          <p className="text-center py-20 text-gray-400 animate-pulse">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center py-20 text-gray-400">
            No products available yet.
          </p>
        ) : (
          <div className="relative z-10 fade-mask">
            <ProductGrid initialProducts={products} />
          </div>
        )}
      </div>

      {/* Faint top & bottom gradient fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
    </main>
  );
}
