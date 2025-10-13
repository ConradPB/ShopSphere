"use client";

import React from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

interface RecommendedProductsProps {
  products: Product[];
}

export default function RecommendedProducts({
  products,
}: RecommendedProductsProps) {
  return (
    <section className="my-12">
      <h2 className="text-heading-md font-semibold mb-6">
        Recommended Products
      </h2>

      {products.length === 0 ? (
        <p className="text-neutral-500">No recommended products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
