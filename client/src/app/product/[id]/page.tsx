import { getProductById } from "@/lib/supabase";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;

  const { data: product, error } = await getProductById(id);

  if (error || !product) return notFound();

  // Map product to the exact shape ProductDetailClient expects
  const clientProduct = {
    id: String(product.id), // ensure string
    title: product.title,
    price: product.price,
    image: product.image ?? null,
  };

  // Provide a stub fetchRecs that returns an empty array
  const fetchRecs = async (_id: string, _count?: number) => {
    return [];
  };

  return <ProductDetailClient product={clientProduct} fetchRecs={fetchRecs} />;
}
