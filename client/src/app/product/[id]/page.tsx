import { getProductById, getRecommendations } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Product } from "@/types/product";

interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
}

/*
 * Type guard that tells us whether `p` is a Promise resolving to { id: string }.
 * Uses `unknown` and checks for a callable `then` property without using `any`.
 */
function isPromiseParams(p: unknown): p is Promise<{ id: string }> {
  return !!p && typeof (p as { then?: unknown }).then === "function";
}

export default async function ProductPage({ params }: PageProps) {
  // Resolve params whether it's a plain object or a Promise
  const resolvedParams = isPromiseParams(params) ? await params : params;
  const id = String(resolvedParams.id);

  const { data: product } = await getProductById(id);
  if (!product) {
    return (
      <div className="p-6 text-center text-gray-500">Product not found</div>
    );
  }

  // Only keep data; we don't need the error variable here
  const { data: recs } = await getRecommendations(id, 4);
  const initialRecs: Product[] = recs ?? [];

  return <ProductDetailClient product={product} initialRecs={initialRecs} />;
}
