"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  initialProducts?: Product[]; // optional - if provided, use this instead of fetching
};

export default function ProductGrid({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[] | null>(
    initialProducts ?? null
  );
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    // If initialProducts not provided, fetch client-side (backwards-compatible)
    if (!initialProducts) {
      let mounted = true;
      const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await getProducts();
        if (!mounted) return;
        if (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        } else {
          setProducts(data ?? []);
        }
        setLoading(false);
      };
      fetchProducts();
      return () => {
        mounted = false;
      };
    }
  }, [initialProducts]);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">Loading products...</p>
    );
  }

  const list = products ?? [];

  if (list.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">No products found.</p>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Featured Products
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
