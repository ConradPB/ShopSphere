import { getProducts } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const { data: products, error } = await getProducts();

  if (error) {
    return <p className="text-center text-red-500">Failed to load products.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products?.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="border rounded-lg p-4 hover:shadow"
        >
          <Image
            src={product.image ?? "/fallback-image.jpg"}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded mb-3"
          />
          <h2 className="font-semibold">{product.title}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  );
}
