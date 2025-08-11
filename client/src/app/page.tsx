import { getProducts } from "@/lib/supabase";

export default async function Page() {
  const { data: products, error } = await getProducts();

  if (error) {
    return (
      <main className="flex items-center justify-center h-screen text-red-500 text-lg">
        Failed to load products: {error}
      </main>
    );
  }

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Featured Products
      </h1>
      {products && products.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image_url || "/placeholder.png"}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {product.title}
                </h2>
                <p className="text-indigo-600 font-bold mt-2">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </main>
  );
}
