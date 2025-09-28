"use client";

import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import SectionCard from "@/components/ui/SectionCard";
import PaymentOption from "@/components/ui/PaymentOption";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Billing + Payment) */}
        <div className="space-y-6 md:col-span-2">
          {/* Billing Info */}
          <SectionCard title="Billing Information">
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
          <SectionCard title="Payment Method">
            <div className="space-y-3">
              <PaymentOption
                value="credit-card"
                label="Credit / Debit Card"
                selected={paymentMethod}
                onChange={setPaymentMethod}
              />
              <PaymentOption
                value="paypal"
                label="PayPal"
                selected={paymentMethod}
                onChange={setPaymentMethod}
              />
              <PaymentOption
                value="crypto"
                label="Crypto (USDT / BTC / ETH)"
                selected={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>
          </SectionCard>
        </div>

        {/* Right Column (Order Summary) */}
        <div className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <SectionCard title="Order Summary">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Product 1</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between">
                  <span>Product 2</span>
                  <span>$30</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$80</span>
                </div>
              </div>
            </SectionCard>

            {/* Place Order Button */}
            <Button className="w-full">Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
