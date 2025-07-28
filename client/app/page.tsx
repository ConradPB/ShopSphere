import type { FC } from "react";

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to ShopSphere
          </h1>
          <p className="text-xl mb-8">
            Discover the best deals on electronics, fashion, and more!
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
          >
            Shop Now
          </a>
        </div>
      </section>
      {/* Product Highlights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for product cards */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                <h3 className="text-lg font-semibold">Product {item}</h3>
                <p className="text-gray-600">.99</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
