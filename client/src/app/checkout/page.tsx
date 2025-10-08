"use client";

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/cartSlice";
import InputField from "@/components/ui/InputField";
import SectionCard from "@/components/ui/SectionCard";
import PaymentOption from "@/components/ui/PaymentOption";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [loading, setLoading] = useState(false);

  // Billing info state
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (field: string, value: string) => {
    setBilling((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(billing)) {
      if (!value.trim()) {
        toast.error(`Please fill in your ${key.replace(/([A-Z])/g, " $1")}`);
        return false;
      }
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    toast.loading("Placing your order...");

    // Simulate API delay
    setTimeout(() => {
      toast.dismiss();
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      setLoading(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty.</h2>
        <p>
          Browse products and add items to your cart to proceed to checkout.
        </p>
      </div>
    );
  }

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
              <InputField
                label="First Name"
                placeholder="John"
                value={billing.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              <InputField
                label="Last Name"
                placeholder="Doe"
                value={billing.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              <InputField
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={billing.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <InputField
                label="Phone"
                type="tel"
                placeholder="+123456789"
                value={billing.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <InputField
                label="Address"
                placeholder="123 Main Street"
                className="md:col-span-2"
                value={billing.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              <InputField
                label="City"
                placeholder="New York"
                value={billing.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
              <InputField
                label="Postal Code"
                placeholder="10001"
                value={billing.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
              />
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
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </SectionCard>

            <Button
              className="w-full"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
