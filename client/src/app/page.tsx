import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-display text-primary">ShopSphere</h1>
      <p className="text-lg text-neutral-600">
        Tailwind v4 + Custom Theme is working 🎉
      </p>

      <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium shadow-card hover:bg-primary-dark transition">
        Add to Cart
      </button>

      <div className="p-6 rounded-2xl shadow-card bg-white max-w-sm">
        <Image src="/logo.png" alt="Logo" width={120} height={120} priority />
        <h3 className="mt-4 font-semibold text-lg">Cool Product</h3>
        <p className="text-primary font-bold mt-2">$49.99</p>
      </div>
    </div>
  );
}
