import { getProducts, type Product } from "@/lib/supabase";

export default async function Page() {
  const { data: products, error } = await getProducts();

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

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          ShopSphere
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover curated products — clean design, great prices. Fast shipping,
          secure checkout.
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

        {products && products.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: Product) => (
              <article
                key={product.id}
                className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transform transition hover:-translate-y-1"
                role="group"
              >
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url ?? "/fallback-image.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-2">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </section>
    </main>
  );
}
