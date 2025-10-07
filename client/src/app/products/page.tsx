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
    <main className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-slate-900 to-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 font-display tracking-tight">
            Explore Our Products
          </h1>
        </Reveal>

        {loading ? (
          <p className="text-center py-12 text-gray-400 animate-pulse">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center py-12 text-gray-400">
            No products available yet.
          </p>
        ) : (
          <div className="relative z-10">
            <ProductGrid initialProducts={products} />
          </div>
        )}
      </div>

      {/* Subtle neon glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>
    </main>
  );
}
