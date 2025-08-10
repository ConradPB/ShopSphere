"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <img
              src={p.image_url}
              alt={p.name}
              style={{ width: "100px", marginRight: "10px" }}
            />
            {p.name} — ${p.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
