"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { getAllProducts } from "@/lib/products";
import { Product as ProductType } from "@/types/product";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = (await getAllProducts()) as unknown as ProductType[];
        if (data && data.length) {
          const subset = data.slice(0, 6);
          // duplicate for smooth loop
          setProducts([...subset, ...subset]);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Auto-scroll animation (left to right)
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
    runLoop().catch(() => {});
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

          <motion.div
            ref={containerRef}
            animate={controls}
            drag="x"
            dragConstraints={{ left: -300, right: 300 }}
            dragElastic={0.15}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-6 cursor-grab select-none"
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() =>
              controls.start({
                x: ["-50%", "0%"],
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
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative group min-w-[300px] flex-shrink-0"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-teal-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                <div className="relative">
                  <ProductCard product={product as ProductType} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
