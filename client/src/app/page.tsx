// src/app/page.tsx
import { getProducts } from "@/lib/supabase";
import { fallbackProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type UiProduct = {
  id: string;
  name: string;
  price: number;
  image: string | null;
};

export default async function Page() {
  // getProducts() returns { data: Product[], error: string | null }
  const { data, error } = await getProducts();

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Failed to load products
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  // Normalize Supabase rows into a UI-friendly shape,
  // and fall back to nice dummy data if no rows are returned.
  const productsFromDb = (data ?? []).map((p) => ({
    id: String((p as any).id),
    name: (p as any).name ?? (p as any).title ?? "Unnamed Product",
    price: Number((p as any).price ?? 0),
    image: (p as any).image_url ?? (p as any).image ?? null,
  })) as UiProduct[];

  const fallback = fallbackProducts.map((f) => ({
    id: String(f.id),
    name: f.title,
    price: f.price,
    image: f.image,
  })) as UiProduct[];

  const productsToShow = productsFromDb.length > 0 ? productsFromDb : fallback;

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          ShopSphere
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover curated products — clean design, great prices.
        </p>
        <div className="mt-8">
          <a
            href="#products"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium shadow hover:bg-indigo-700 transition"
          >
            Browse Featured
          </a>
        </div>
      </section>

      {/* Featured products */}
      <section id="products" aria-labelledby="featured-heading">
        <h2
          id="featured-heading"
          className="text-2xl font-semibold text-gray-900 mb-6 text-center"
        >
          Featured Products
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
