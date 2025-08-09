"use client";

import Image from "next/image";
import type { Product } from "@/lib/supabase";

type HomeProps = {
  products: Product[];
  error?: string | null;
};

export default function Home({ products, error }: HomeProps) {
  if (error) return <div>Error loading products: {error}</div>;
  if (!products || products.length === 0)
    return <div>No products available.</div>;
}
