import type { Metadata } from "next";
import Home from "@/components/Home";
import { getProducts } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "ShopSphere",
  description: "ShopSphere storefront",
};

export default async function Page() {
  const { data: products, error } = await getProducts();
  // products is always an array (possibly empty), error is string | null
  return <Home products={products} error={error} />;
}
