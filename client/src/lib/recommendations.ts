import type { Product } from "@/types/product";
import { supabase } from "./supabase";

// Simple real recommendation: same-category (excluding self); fallback to top N.
export async function getRecommendations(
  productId: string
): Promise<Product[]> {
  // Find the product for its category
  const { data: productRow } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .maybeSingle();

  // If we can’t find it, just return a few others
  const category = productRow?.category ?? null;

  let query = supabase
    .from("products")
    .select("*")
    .neq("id", productId)
    .limit(6);
  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  // map similarly as supabase.ts
  const mapped: Product[] = data.map((row: any) => ({
    id: String(row.id),
    title: row.title ?? row.name ?? "Untitled",
    price: Number(row.price ?? 0),
    image: row.image ?? row.image_url ?? undefined,
    description: row.description ?? "",
    category: row.category ?? "General",
  }));

  return mapped;
}

// Handy mock (stable for tests/local dev)
export function getRecommendationsMock(productId: string): Product[] {
  return [
    {
      id: "r1",
      title: "Recommended One",
      price: 19.99,
      image: "/fallback-image.jpg",
      description: "Nice pick that pairs well.",
      category: "General",
    },
    {
      id: "r2",
      title: "Recommended Two",
      price: 29.99,
      image: "/fallback-image.jpg",
      description: "People also buy this.",
      category: "General",
    },
    {
      id: "r3",
      title: "Recommended Three",
      price: 39.99,
      image: "/fallback-image.jpg",
      description: "Frequently bundled together.",
      category: "General",
    },
  ];
}
