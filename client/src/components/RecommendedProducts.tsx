import Link from "next/link";
import { Product } from "@/types/product";

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
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="border rounded-lg p-4 hover:shadow"
          >
            <img
              src={product.image ?? "/fallback-image.jpg"}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
