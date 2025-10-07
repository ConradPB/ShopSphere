"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await getProducts();
      if (!error && data) {
        // Duplicate products for smooth looping illusion
        const subset = data.slice(0, 6);
        setProducts([...subset, ...subset]);
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  // Auto-scroll animation loop
  useEffect(() => {
    if (!products.length) return;
    const runLoop = async () => {
      while (true) {
        await controls.start({
          x: ["0%", "-50%"],
          transition: {
            duration: 30, // adjust for speed
            ease: "linear",
            repeat: Infinity,
          },
        });
      }
    };
    runLoop();
  }, [products, controls]);

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

        {/* Carousel wrapper */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={controls}
            className="flex gap-6"
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() =>
              controls.start({
                x: ["0%", "-50%"],
                transition: {
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                },
              })
            }
          >
            {products.map((product, i) => (
              <motion.div
                key={`${product.id}-${i}`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative group min-w-[300px] flex-shrink-0"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-teal-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                <div className="relative">
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
