"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export interface ProductDetailClientProps {
  product: Product;
  initialRecs?: Product[];
  fetchRecs?: (id: string) => Promise<Product[]>;
}

export default function ProductDetailClient({
  product,
  initialRecs = [],
  fetchRecs,
}: ProductDetailClientProps) {
  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 shadow">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-700">${product.price.toFixed(2)}</p>
        <p className="mt-2">{product.description}</p>
      </div>

      {initialRecs.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Recommended</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {initialRecs.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
