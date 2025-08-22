import { getProductById, getRecommendations } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Product } from "@/types/product";

interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Next.js sometimes provides params as a promise in newer versions — support both:
  const resolvedParams =
    params && typeof (params as any).then === "function"
      ? await (params as Promise<{ id: string }>)
      : (params as { id: string });

  const id = resolvedParams.id;

  const { data: product, error: productErr } = await getProductById(String(id));
  if (productErr || !product) {
    return (
      <div className="p-6 text-center text-gray-500">Product not found</div>
    );
  }

  // Get recommendations server-side (so we don't pass functions to client)
  const { data: recs, error: recErr } = await getRecommendations(String(id), 4);
  const initialRecs: Product[] = recs ?? [];

  return <ProductDetailClient product={product} initialRecs={initialRecs} />;
}
