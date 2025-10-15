"use client";

import React from "react";
import Link from "next/link";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  asLink?: false;
  href?: undefined;
  as?: string;
}

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  asLink: true;
  href: string;
}

type ButtonProps = BaseButtonProps | LinkButtonProps;

const sizeMap: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props as ButtonProps & { className?: string; children?: React.ReactNode };

  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variantMap: Record<Variant, string> = {
    primary:
      "text-white bg-gradient-to-r from-primary-light to-primary shadow-card hover:brightness-95",
    ghost:
      "bg-transparent border border-neutral-200 text-neutral-700 hover:bg-neutral-100",
  };

  const classes = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  // Link variant
  if ((props as LinkButtonProps).asLink && (props as LinkButtonProps).href) {
    const linkProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link
        href={(props as LinkButtonProps).href}
        className={classes}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  // Button variant
  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
