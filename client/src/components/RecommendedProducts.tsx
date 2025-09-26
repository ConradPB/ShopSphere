import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { shimmer, toBase64 } from "@/lib/blur";

export default function RecommendedProducts({
  products,
}: {
  products: Product[];
}) {
  if (!products.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          
        ))}
      </div>
    </div>
  );
}
