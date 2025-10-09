import { getProductById, getRecommendations } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params; // await params (Next.js 15+)

  const { data: product } = await getProductById(id);
  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Product not found.</p>
      </main>
    );
  }

  const { data: recs } = await getRecommendations(id, 4);

  return <ProductDetailClient product={product} initialRecs={recs ?? []} />;
}
