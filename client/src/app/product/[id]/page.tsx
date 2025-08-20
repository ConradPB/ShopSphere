import { notFound } from "next/navigation";
import { getProductById } from "@/lib/supabase";
import { getRecommendationsMock } from "@/lib/recommendations";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Product } from "@/types/product";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const id = params.id; // ✅ guaranteed string

  const { data: product, error } = await getProductById(id);
  if (error || !product) {
    return notFound();
  }

  // For now: use mock recommender
  const recommendations = await getRecommendationsMock(id, 4);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProductDetailClient
        product={{
          id: String(product.id),
          title: product.title,
          price: product.price,
          image: product.image ?? null,
        }}
        recommendations={recommendations as Product[]}
      />
    </div>
  );
}
