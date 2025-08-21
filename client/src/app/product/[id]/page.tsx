import { getProductById, getRecommendations } from "@/lib/supabase";
import { Product } from "@/types/product";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;

  const { data: product, error } = await getProductById(id);
  if (error || !product) {
    return notFound();
  }

  // Optional: fetch recommendations (or mock later in tests)
  const { data: recommendations } = await getRecommendations(id);

  return (
    <ProductDetailClient
      initialRecs={recommendations}
      product={product}
      fetchRecs={() => {}}
    />
  );
}
