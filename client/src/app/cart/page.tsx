import { getProductById } from "@/lib/supabase";
import { getRecommendations } from "@/lib/recommendations";
import ProductDetailClient from "@/components/ProductDetailClient";

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const { data: product, error } = await getProductById(params.id);

  if (!product || error) {
    return <p className="text-center py-10 text-red-500">Product not found</p>;
  }

  return (
    <ProductDetailClient
      product={product}
      fetchRecs={() => getRecommendations(product.id)}
    />
  );
}
