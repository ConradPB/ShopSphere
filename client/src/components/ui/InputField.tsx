"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export default function InputField({
  label,
  className = "",
  ...rest
}: InputProps) {
  return (
    <label className={`block text-sm text-neutral-700 ${className}`}>
      {label && <span className="block mb-2 font-medium">{label}</span>}
      <input
        {...rest}
        className="w-full rounded-lg border border-neutral-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </label>
  );
}
