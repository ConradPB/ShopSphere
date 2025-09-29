"use client";

import React from "react";
import cn from "classnames";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asLink?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const sizeMap: Record<Size, string> = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantMap: Record<Variant, string> = {
    primary: "btn-primary",
    ghost: "btn-ghost",
  };

  const classes = cn(base, sizeMap[size], variantMap[variant], className);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
