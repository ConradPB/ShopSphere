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
      <h2 className="">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1 bg-white"
          >
            <div className="relative w-full h-48 mb-3">
              <Image
                src={product.image ?? "/fallback-image.jpg"}
                alt={product.title}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw,
             (max-width: 1200px) 50vw,
             33vw"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <h3 className="font-medium text-lg line-clamp-1">
              {product.title}
            </h3>
            <p className="text-gray-700 font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
