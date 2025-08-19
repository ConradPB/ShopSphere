import { notFound } from "next/navigation";
import { getProductById } from "@/lib/supabase";
import { getRecommendations } from "@/lib/recommendations";
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

  // Server-side fetch of recommendations
  const recs = await getRecommendations(id);

  return (
    <div className="py-12">
      <ProductDetailClient
        product={product}
        initialRecs={recs}
        fetchRecs={getRecommendations}
      />
    </div>
  );
}
