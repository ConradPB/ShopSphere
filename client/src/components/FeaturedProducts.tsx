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
      try {
        const data = await getAllProducts();
        if (data && data.length > 0) {
          const subset = (data as Product[]).slice(0, 6);
          setProducts([...subset, ...subset]); // duplicate for smooth loop
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
}
