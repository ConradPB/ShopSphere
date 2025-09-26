"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  initialProducts?: Product[];
  title?: string; // optional section title (e.g., "Featured Products")
};

export default function ProductGrid({ initialProducts, title }: Props) {
  const [products, setProducts] = useState<Product[] | null>(
    initialProducts ?? null
  );
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
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
      <p className="text-center py-10 text-gray-500 animate-pulse">
        Loading products...
      </p>
    );
  }

  const list = products ?? [];

  if (list.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">No products found.</p>
    );
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>
      )}

      <div className="">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
