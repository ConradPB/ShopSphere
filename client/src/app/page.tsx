import { getProducts } from "@/lib/supabase";
import SearchAndFilterClient from "@/components/SearchAndFilterClient";

export default async function HomePage() {
  const { data: products, error } = await getProducts();

  if (error) {
    return <p className="text-center text-red-500">Failed to load products.</p>;
  }

  return <SearchAndFilterClient initialProducts={products ?? []} />;
}
