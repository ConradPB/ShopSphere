import { getProductById, getRecommendations } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Product } from "@/types/product";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;

  const { data: product } = await getProductById(id);
  if (!product) {
    return (
      <div className="p-6 text-center text-gray-500">Product not found</div>
    );
  }

  const { data: recs } = await getRecommendations(id, 4);
  const initialRecs: Product[] = recs ?? [];

  return <ProductDetailClient product={product} initialRecs={initialRecs} />;
}
