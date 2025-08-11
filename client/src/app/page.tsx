// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getProducts } from "../lib/supabase";
import { Product } from "../types/product";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await getProducts();
      if (error) {
        setError(error);
      } else {
        setProducts(data);
      }
    }
    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>Loading...</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
