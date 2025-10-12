import { getProductById, Product, getAllProducts } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params; // Next.js 15+ async params

  const product: Product | undefined = await getProductById(id);
  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Product not found.</p>
      </main>
    );
  }

  // Temporary recommendations: just get all products except this one
  const recs = (await getAllProducts()).filter((p) => p.id !== id).slice(0, 4);

  return <ProductDetailClient product={product} initialRecs={recs} />;
}
