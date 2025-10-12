"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { getAllProducts } from "@/lib/products";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const data = await getAllProducts();
      if (data) {
        const subset = data.slice(0, 6);
        setProducts([...subset, ...subset]); // duplicate for smooth loop
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (!products.length) return;
    const runLoop = async () => {
      while (true) {
        await controls.start({
          x: ["-50%", "0%"],
          transition: {
            duration: 30,
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
    <section className="relative py-16 bg-gradient-to-b from-neutral-900 via-black to-neutral-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 text-transparent bg-clip-text drop-shadow-md">
          Featured Products
        </h2>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-900 via-neutral-900/80 to-transparent z-20" />
        </div>
      </div>
    </section>
  );
}
