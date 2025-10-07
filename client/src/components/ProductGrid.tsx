"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  initialProducts?: Product[];
  title?: string;
};

export default function ProductGrid({ initialProducts, title }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);
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

  if (products.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">No products found.</p>
    );
  }

  return (
    // pb-0 removes bottom padding so footer can sit directly below
    <section className="py-10 px-4 sm:px-6 lg:px-8 pb-0">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-neutral-800 text-center">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
