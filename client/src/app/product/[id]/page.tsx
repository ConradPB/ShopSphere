import { getProductById, getAllProducts } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  // use lib/products so tests can mock it
  const product = await getProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Product not found.</p>
      </main>
    );
  }

  // Build recommendations from the simple product store
  const all = (await getAllProducts()) ?? [];
  const recs = all.filter((p) => p.id !== id).slice(0, 4);

  return <ProductDetailClient product={product} initialRecs={recs} />;
}
