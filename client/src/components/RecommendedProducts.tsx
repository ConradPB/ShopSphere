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
    <div className="mt-16">
      {/* Section title */}
      <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">
        You may also like
      </h2>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            {/* Product image */}
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.image ?? "/fallback-image.jpg"}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       25vw"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>

            {/* Product info */}
            <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
              {product.title}
            </h3>
            <p className="text-gray-700 font-semibold mt-1">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
