"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { calculateCartTotal } from "@/types/cart"; // <-- import helper

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.items);

  // ✅ calculate subtotal here instead of reading state.cart.total
  const subtotal = calculateCartTotal(cart);
  const shipping = 5; // placeholder flat rate
  const total = subtotal + shipping;

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePlaceOrder = () => {
    // For now just redirect to confirmation
    router.push("/order-confirmation");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Shipping Form */}
      <div className="bg-white shadow p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-semibold">Shipping Details</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border p-2 rounded md:col-span-2"
          />
          <input
            type="text"
            placeholder="Street Address"
            className="border p-2 rounded md:col-span-2"
          />
          <input
            type="text"
            placeholder="City"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="State/Province"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Zip/Postal Code"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Country"
            className="border p-2 rounded"
          />
        </form>
      </div>

      {/* Payment Options */}
      <div className="bg-white shadow p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Credit/Debit Card
          </label>
          {paymentMethod === "card" && (
            <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Card Number"
                className="border p-2 rounded md:col-span-2"
              />
              <input
                type="text"
                placeholder="MM/YY"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="CVC"
                className="border p-2 rounded"
              />
            </div>
          )}

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="crypto"
              checked={paymentMethod === "crypto"}
              onChange={() => setPaymentMethod("crypto")}
            />
            Pay with Crypto
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition"
      >
        Place Order
      </button>
    </div>
  );
}
