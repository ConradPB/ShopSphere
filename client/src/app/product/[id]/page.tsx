import { getProductById } from "@/lib/supabase";
import { getRecommendations } from "@/lib/recommendations";
import ProductDetailClient from "@/components/ProductDetailClient";
import RecommendedProducts from "@/components/RecommendedProducts";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  const { data: product, error } = await getProductById(id);
  const recommendations = await getRecommendations(id);

  if (error || !product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProductDetailClient
        product={{
          id: String(product.id),
          title: product.title,
          price: product.price,
          image: product.image ?? null,
        }}
      />

      {/* ✅ Recommended products */}
      <RecommendedProducts products={recommendations} />
    </div>
  );
}
