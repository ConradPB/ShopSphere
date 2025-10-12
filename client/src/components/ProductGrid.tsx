"use client";

import React, { useEffect, useState } from "react";
import { getAllProducts, Product } from "@/lib/products";
import ProductCard from "./ProductCard";

type Props = {
  initialProducts?: Product[];
  title?: string;
};

export default function ProductGrid({ initialProducts, title }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);
  const [loading, setLoading] = useState<boolean>(!initialProducts);

  const heading = title ?? "Featured Products";

  useEffect(() => {
    if (!initialProducts) {
      let isMounted = true;
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const data = await getAllProducts();
          if (!isMounted) return;
          setProducts(data ?? []);
        } catch (err) {
          console.error("Error fetching products:", err);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
      return () => {
        isMounted = false;
      };
    }
  }, [initialProducts]);

  // 🌀 Loading state
  if (loading) {
    return (
      <section className="py-10 px-4 sm:px-6 lg:px-8 pb-0 text-center">
        <h2 className="text-2xl font-bold mb-6 text-white">{heading}</h2>
        <p className="text-gray-400 animate-pulse">Loading products...</p>
      </section>
    );
  }

  // 🚫 No products
  if (products.length === 0) {
    return (
      <section className="py-10 px-4 sm:px-6 lg:px-8 pb-0 text-center">
        <h2 className="text-2xl font-bold mb-6 text-white">{heading}</h2>
        <p className="text-gray-400">No products found.</p>
      </section>
    );
  }

  // ✅ Product grid
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 pb-0">
      <h2 className="text-2xl font-bold mb-8 text-white text-center">
        {heading}
      </h2>

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 
          animate-fadeIn
        "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
