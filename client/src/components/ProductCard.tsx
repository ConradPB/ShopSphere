"use client";

import Image from "next/image";
- import { useDispatch } from "react-redux";
+ import Link from "next/link";
+ import { useAppDispatch } from "@/redux/hooks"; // use typed hook
import { addToCart } from "@/redux/cartSlice";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
-  const dispatch = useDispatch();
+  const dispatch = useAppDispatch();

  const id = String(product.id);
  const title = product.title ?? "Unnamed Product";
  const price = Number(product.price ?? 0);
  const imageSrc: string = product.image ?? "/fallback-image.jpg";

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title,
        price,
        image: imageSrc,
        quantity: 1,
      })
    );
  };

  return (
    <article className="...">
      <div className="relative w-full h-48"> ... </div>

      <div className="p-4">
        ...
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            ...
          >
            Add to cart
          </button>

-         <a
-           href={`/product/${id}`}
-           className="px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
-         >
-           View
-         </a>
+         <Link
+           href={`/product/${id}`}
+           className="px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
+         >
+           View
+         </Link>
        </div>
      </div>
    </article>
  );
}
