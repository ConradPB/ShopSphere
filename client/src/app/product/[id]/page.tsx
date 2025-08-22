import { getProductById, getRecommendations } from "@/lib/supabase";
import ProductDetailClient from "./ProductDetailClient";
import type { Product } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>; // ✅ Next.js 15+ params are async
}

export default async function ProductPage({ params }: PageProps) {
  // ✅ await params to avoid type errors
  const { id } = await params;

  // ✅ fetch product from supabase
  const { data: product, error } = await getProductById(id);

  if (error || !product) {
    return <div>Product not found</div>;
  }

  // ✅ Ensure product matches our unified Product type
  const typedProduct: Product = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    description: product.description ?? undefined,
    category: product.category ?? undefined,
  };

  return (
    <ProductDetailClient
      product={typedProduct}
      fetchRecs={async (id: string, count?: number) => {
        "use server"; // ✅ marks as server action
        return getRecommendations(id, count);
      }}
    />
  );
}
