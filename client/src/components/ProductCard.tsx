import React from "react";

export type UiProduct = {
  id: string;
  name: string;
  price: number;
  image: string | null;
};

export default function ProductCard({ product }: { product: UiProduct }) {
  return (
    <article
      className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transform transition hover:-translate-y-1"
      role="group"
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={product.image ?? "/fallback-image.jpg"}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-indigo-600 font-bold mt-2">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>
    </article>
  );
}
