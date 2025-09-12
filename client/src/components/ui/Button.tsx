"use client";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asLink?: boolean; // if true, renders <a> with role button
  href?: string;
}

const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  asLink = false,
  href,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantMap: Record<Variant, string> = {
    primary: "bg-primary text-white shadow-card hover:bg-primary-dark",
    secondary: "bg-secondary text-white shadow-sm hover:bg-secondary-dark",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
  };

  const classes = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  if (asLink && href) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href={href} className={classes} role="button" {...(rest as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
