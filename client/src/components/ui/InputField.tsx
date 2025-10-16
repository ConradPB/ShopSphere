"use client";

import React, { useId } from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  wrapperClassName?: string; // apply to outer wrapper (grid span etc.)
  inputClassName?: string; // apply to <input>
  id?: string;
  defaultValue?: string;
}

export default function InputField({
  label,
  placeholder,
  type = "text",
  wrapperClassName = "",
  inputClassName = "",
  id,
  defaultValue,
}: InputFieldProps) {
  const reactId = useId();
  const inputId = id ?? `input-${reactId}`;

  const baseInput =
    "w-full rounded-lg px-3 py-2 bg-neutral-800/60 border border-neutral-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40";

  return (
    <div className={wrapperClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`${baseInput} ${inputClassName}`}
      />
    </div>
  );
}
