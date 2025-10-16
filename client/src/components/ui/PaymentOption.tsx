"use client";

import React from "react";

interface PaymentOptionProps {
  value: string;
  label: string;
  selected: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function PaymentOption({
  value,
  label,
  selected,
  onChange,
  className = "",
}: PaymentOptionProps) {
  const isSelected = selected === value;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onChange(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onChange(value);
        }
      }}
      className={`${className} flex items-center justify-between rounded-xl cursor-pointer transition`}
    >
      <span
        className={`font-medium ${isSelected ? "text-white" : "text-gray-200"}`}
      >
        {label}
      </span>
      <input
        type="radio"
        name="payment-option"
        value={value}
        checked={isSelected}
        readOnly
        className="hidden"
      />
    </div>
  );
}
