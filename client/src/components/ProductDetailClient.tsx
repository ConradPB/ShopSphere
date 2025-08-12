"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();

  if (!product) {
    return <p>Product not found</p>;
  }

  const { id, title, image, price, description } = product;

  return (
    <div className="product-detail">
      <div className="image-container">
        <Image
          src={image}
          alt={title || "Unnamed Product"}
          width={400}
          height={400}
        />
      </div>

      <div className="details">
        <h1>{title || "Unnamed Product"}</h1>
        <p className="price">${price.toFixed(2)}</p>
        {description && <p className="description">{description}</p>}

        <button
          onClick={() => addToCart(product, 1)}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
