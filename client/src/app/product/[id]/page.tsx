import { getProductById, getRecommendations } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";
import RecommendedProducts from "@/components/RecommendedProducts";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  // fetch main product
  const { data: product, error } = await getProductById(id);

  if (error || !product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  // fetch recommended products
  const { data: recommendations } = await getRecommendations(id);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProductDetailClient
        product={{
          id: String(product.id), // 🔹 force to string
          title: product.title,
          price: product.price,
          image: product.image ?? null, // 🔹 normalize undefined → null
        }}
      />

      {recommendations && recommendations.length > 0 && (
        <RecommendedProducts products={recommendations} />
      )}
    </div>
  );
}
