"use client";

import React, { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  initialRecs?: Product[];
  fetchRecs?: (id: string) => Promise<Product[]>;
};

export default function ProductDetailClient({
  product,
  initialRecs = [],
  fetchRecs,
}: Props) {
  const dispatch = useAppDispatch();
  const [recs, setRecs] = useState<Product[]>(initialRecs ?? []);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if ((!initialRecs || initialRecs.length === 0) && fetchRecs) {
      fetchRecs(product.id)
        .then(setRecs)
        .catch(() => setRecs([]));
    }
  }, [initialRecs, fetchRecs, product.id]);

  function handleAdd(qty = 1) {
    setAdding(true);
    dispatch(addToCart({ product, quantity: qty }));
    setTimeout(() => setAdding(false), 250);
  }

  function handleBuyNow() {
    dispatch(addToCart({ product, quantity: 1 }));
    router.push("/cart");
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <img
            src={product.image ?? "/fallback-image.jpg"}
            alt={product.title}
            className="w-full h-[420px] object-cover rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
}
