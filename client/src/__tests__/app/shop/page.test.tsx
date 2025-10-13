"use client";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { fetchProducts } from "@/lib/products";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  return (
    <main>
      <h1>Shop</h1>
      <ProductGrid products={products} />
    </main>
  );
}
