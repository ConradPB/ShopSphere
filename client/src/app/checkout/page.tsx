"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5 : 0; // dummy flat shipping
  const total = subtotal + shipping;

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In real app: send order to backend here
    console.log("Order placed:", { ...form, cartItems, total });

    // Redirect to success page
    router.push("/order-success");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Shipping form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "address", "city", "country", "zip"].map(
            (field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={(form as any)[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border p-2 rounded"
                required
              />
            )
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Right: Cart Summary */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <ul className="divide-y">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
