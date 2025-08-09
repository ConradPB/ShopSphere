"use client";

import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <Image
        src={product.image_url || "/fallback-image.jpg"}
        alt={product.name || "Unnamed Product"}
        width={400}
        height={300}
        className="w-full h-48 object-cover rounded-md mb-4"
        unoptimized={true}
      />
      <h2 className="text-lg font-semibold">
        {product.name || "Unnamed Product"}
      </h2>
      <p className="text-gray-600">${(product.price || 0).toFixed(2)}</p>
    </div>
  );
}
