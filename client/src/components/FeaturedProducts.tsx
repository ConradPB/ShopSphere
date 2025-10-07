"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await getProducts();
      if (!error && data) {
        // Just pick 6–8 to feature
        setProducts(data.slice(0, 8));
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500 animate-pulse">
        Loading featured products...
      </p>
    );
  }

  return (
    <section className="relative py-16 bg-gradient-to-b from-neutral-50 via-white to-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 via-teal-500 to-purple-600 text-transparent bg-clip-text drop-shadow-sm">
          Featured Products
        </h2>

        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative group min-w-[300px] flex-shrink-0 snap-start"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-teal-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
              <div className="relative">
                <ProductCard product={product} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
