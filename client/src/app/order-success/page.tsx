"use client";

import Link from "next/link";

export default function OrderSuccessPage() {
  const orderId = Date.now().toString().slice(-6); // dummy order ID

  return (
    <div className="max-w-2xl mx-auto text-center p-10">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Order Placed!
      </h1>
      <p className="mb-2">Thank you for your purchase.</p>
      <p className="mb-6">
        Your order number is: <span className="font-mono">{orderId}</span>
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
