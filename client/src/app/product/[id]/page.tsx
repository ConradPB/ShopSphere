// src/app/product/[id]/page.tsx
import { getProductById, getRecommendations } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Product } from "@/types/product";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params; // Next.js provides plain object params here

  const { data: product, error } = await getProductById(id);

  if (error || !product) {
    return (
      <div className="p-6 text-center text-gray-500">Product not found</div>
    );
  }

  // product already has the full shape from normalizeRow
  // pass product straight through (ProductDetailClient expects Product)
  return (
    <ProductDetailClient
      product={product}
      // pass the server helper (client will call it via fetchRecs prop)
      fetchRecs={async (productId: string, count?: number) => {
        const { data, error } = await getRecommendations(productId, count);
        return data ?? [];
      }}
    />
  );
}
