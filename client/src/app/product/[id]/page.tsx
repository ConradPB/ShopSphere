import { notFound } from "next/navigation";
import { getProductById } from "@/lib/supabase";
import { getRecommendations } from "@/lib/recommendations"; // ✅ updated import
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Product } from "@/types/product";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const { data: product, error } = await getProductById(id);
  if (error || !product) {
    return notFound();
  }

  // ✅ use real DB-driven recommendations
  const recommendations = await getRecommendations(id, 4);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProductDetailClient
        product={{
          id: String(product.id),
          title: product.title,
          price: product.price,
          image: product.image ?? null,
          description: product.description ?? "No description available",
          category: product.category ?? "Uncategorized",
        }}
        recommendations={recommendations as Product[]}
      />
    </div>
  );
}
