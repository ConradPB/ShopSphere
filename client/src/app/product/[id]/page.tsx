import { notFound } from "next/navigation";
import { getProductById } from "@/lib/supabase";
import { getRecommendationsMock } from "@/lib/recommendations";
import ProductDetailClient from "@/components/ProductDetailClient";

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
  const id = params.id;
  const { data: product, error } = await getProductById(id);

  if (error) {
    console.error("getProductById error:", error);
    return notFound();
  }
  if (!product) return notFound();

  // Get mock recommendations server-side (fast) — later replace with AI call
  const recs = await getRecommendationsMock(id, 6);

  return (
    <div className="py-12">
      {/* Render client-side product UI */}
      <ProductDetailClient
        product={product}
        initialRecs={recs}
        fetchRecs={getRecommendationsMock}
      />
    </div>
  );
}
