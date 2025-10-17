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

  // Smooth auto-scroll loop
  useEffect(() => {
    if (!products.length) return;
    const runLoop = async () => {
      while (true) {
        await controls.start({
          x: ["0%", "-50%"],
          transition: {
            duration: 25, // slightly faster
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
      <p className="text-center py-10 text-gray-400 animate-pulse">
        Loading featured products...
      </p>
    );
  }

  return (
    <section className="relative py-16 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 text-transparent bg-clip-text drop-shadow-md">
          Featured Products
        </h2>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 via-neutral-900/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 via-neutral-900/80 to-transparent z-20" />

          <motion.div
            ref={containerRef}
            animate={controls}
            drag="x"
            dragConstraints={{ left: -300, right: 300 }}
            dragElastic={0.2}
            whileTap={{ cursor: "grabbing" }}
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() =>
              controls.start({
                x: ["0%", "-50%"],
                transition: {
                  duration: 25,
                  ease: "linear",
                  repeat: Infinity,
                },
              })
            }
            className="flex gap-6 cursor-grab select-none will-change-transform touch-pan-x overflow-x-auto scroll-smooth"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
            }}
          >
            {products.map((product, i) => (
              <motion.div
                key={`${product.id}-${i}`}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                className="relative group min-w-[280px] flex-shrink-0"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-teal-400/30 to-purple-500/30 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500" />
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
