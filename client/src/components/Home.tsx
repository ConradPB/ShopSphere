"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/supabase";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul style={{ display: "grid", gap: "1rem" }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{ border: "1px solid #ccc", padding: "1rem" }}
            >
              <img src={product.image_url} alt={product.name} width={200} />
              <h2>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
