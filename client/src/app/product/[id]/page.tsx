import { getProductById } from "@/lib/supabase";
import { getRecommendationsMock } from "@/lib/recommendations"; // ✅ mock for now
import ProductDetailClient from "@/components/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ id: string }>; // ✅ params is async
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; // ✅ must await

  const { data: product, error } = await getProductById(id);
  const recommendations = await getRecommendationsMock(id, 4); // ✅ force mock version

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
        recommendations={recommendations} // ✅ pass directly
      />
    </div>
  );
}
