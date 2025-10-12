export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export const fallbackProducts: Product[] = [
  {
    id: "1",
    title: "Nike Air Zoom Pegasus 40",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1600180758890-6ff9c1f69d4d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Bose QuietComfort 45",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1617734471336-44bdbbb9b7ba?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Apple Watch Series 9",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1556402524-379b1de8d5c8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "North Face Puffer Jacket",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3f4c?auto=format&fit=crop&w=800&q=80",
  },
];

/**
 * ✅ Simulate fetching all products
 * (In production, this could call Supabase or another API)
 */
export async function getAllProducts(): Promise<Product[]> {
  return Promise.resolve(fallbackProducts);
}

/**
 * ✅ Simulate fetching a single product by ID
 */
export async function getProductB(id: string): Promise<Product | undefined> {
  const product = fallbackProducts.find((p) => p.id === id);
  return Promise.resolve(product);
}

export function getProductById(id: string) {
  const product = fallbackProducts.find((p) => p.id === id);
  return Promise.resolve({ data: product });
}

export function getRecommendations(id: string, count: number) {
  const recs = fallbackProducts.filter((p) => p.id !== id).slice(0, count);
  return Promise.resolve({ data: recs });
}
