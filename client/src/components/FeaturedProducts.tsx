"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getProducts();
      if (error) {
        console.error("Error loading featured products:", error);
        return;
      }
      // Just take the first 6 as "featured" for now
      setProducts(data?.slice(0, 6) ?? []);
    };
    fetchData();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("featured-scroll");
    if (container) {
      const scrollAmount = 300;
      const newScrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollPosition, behavior: "smooth" });
      setScrollPosition(newScrollPosition);
    }
  };

  if (products.length === 0)
    return (
      <p className="text-center py-10 text-gray-500">
        No featured products available.
      </p>
    );

  return (
    <section className="relative py-16 bg-gradient-to-r from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-center mb-10 text-neutral-800"
        >
          Featured Products
        </motion.h2>

        {/* Scroll Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div
            id="featured-scroll"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-[280px] flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-teal-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                  <div className="relative">
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
