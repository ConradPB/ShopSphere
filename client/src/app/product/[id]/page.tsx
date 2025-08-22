import { getProduct, getRecommendations } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Product } from "@/types/product";

interface PageProps {
  params: { id: string }; // ✅ Next.js gives plain object, not Promise
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  // ✅ Already returns the correct shape from supabase
  const typedProduct: Product = {
    id: String(product.id),
    title: product.title,
    price: product.price,
    image: product.image,
  };

  return (
    <ProductDetailClient
      product={typedProduct}
      fetchRecs={getRecommendations}
    />
  );
}
