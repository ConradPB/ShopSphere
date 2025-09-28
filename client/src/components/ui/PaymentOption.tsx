"use client";

import React from "react";

interface PaymentOptionProps {
  value: string;
  label: string;
  selected: string;
  onChange: (value: string) => void;
}

export default function PaymentOption({
  value,
  label,
  selected,
  onChange,
}: PaymentOptionProps) {
  const isSelected = selected === value;

  return (
    <div
      className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:bg-gray-50"
      }`}
      onClick={() => onChange(value)}
    >
      <span className="font-medium">{label}</span>
      <input
        type="radio"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="hidden"
      />
    </div>
  );
}
