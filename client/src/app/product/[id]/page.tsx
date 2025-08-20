import { notFound } from "next/navigation";
import { getProductById } from "@/lib/supabase";
import { getRecommendationsMock } from "@/lib/recommendations";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Product } from "@/types/product";

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
  const id = params.id;

  const { data: product, error } = await getProductById(id);
  if (error || !product) {
    return notFound();
  }

  // Force the mock recommender for now
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
