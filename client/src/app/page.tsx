import { fallbackProducts } from "@/lib/products";

export default function Page() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Featured Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fallbackProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-4 font-semibold text-lg text-gray-800">
              {product.title}
            </h2>
            <p className="text-indigo-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
