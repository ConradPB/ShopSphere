"use client";

import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import SectionCard from "@/components/ui/SectionCard";
import PaymentOption from "@/components/ui/PaymentOption";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-gray-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">
          Checkout
        </h1>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="space-y-8 md:col-span-2">
            {/* Billing Info */}
            <SectionCard
              title="Billing Information"
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl backdrop-blur-sm shadow-lg shadow-cyan-500/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="First Name" placeholder="John" />
                <InputField label="Last Name" placeholder="Doe" />
                <InputField
                  label="Email"
                  placeholder="john@example.com"
                  type="email"
                />
                <InputField label="Phone" placeholder="+123456789" type="tel" />
                <InputField
                  label="Address"
                  placeholder="123 Main Street"
                  className="md:col-span-2"
                />
                <InputField label="City" placeholder="New York" />
                <InputField label="Postal Code" placeholder="10001" />
              </div>
            </SectionCard>

            {/* Payment Options */}
            <SectionCard
              title="Payment Method"
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl backdrop-blur-sm shadow-lg shadow-purple-500/5"
            >
              <div className="space-y-4">
                <PaymentOption
                  value="credit-card"
                  label="💳 Credit / Debit Card"
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "credit-card"
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40"
                      : "hover:bg-neutral-800/70 border border-neutral-800"
                  }`}
                />
                <PaymentOption
                  value="paypal"
                  label="🪙 PayPal"
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "paypal"
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40"
                      : "hover:bg-neutral-800/70 border border-neutral-800"
                  }`}
                />
                <PaymentOption
                  value="crypto"
                  label="💠 Crypto (USDT / BTC / ETH)"
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "crypto"
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40"
                      : "hover:bg-neutral-800/70 border border-neutral-800"
                  }`}
                />
              </div>
            </SectionCard>
          </div>

          {/* Right Column */}
          <aside className="md:col-span-1">
            <div className="sticky top-28 space-y-6">
              <SectionCard
                title="Order Summary"
                className="bg-neutral-900/70 border border-neutral-800 rounded-2xl backdrop-blur-sm shadow-lg shadow-cyan-500/5"
              >
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Product 1</span>
                    <span className="text-gray-100 font-medium">$50</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Product 2</span>
                    <span className="text-gray-100 font-medium">$30</span>
                  </div>
                  <hr className="border-neutral-800 my-3" />
                  <div className="flex justify-between font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    <span>Total</span>
                    <span>$80</span>
                  </div>
                </div>
              </SectionCard>

              <Button
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition shadow-lg shadow-purple-500/20"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </aside>
        </div>
      </div>

      {/* Ambient glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>
    </main>
  );
}
