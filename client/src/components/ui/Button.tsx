"use client";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asLink?: false;
  href?: undefined;
}

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  asLink: true;
  href: string;
}

type ButtonProps = BaseButtonProps | LinkButtonProps;

const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...restProps
  } = props as ButtonProps & { className?: string; children?: React.ReactNode };

  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantMap: Record<Variant, string> = {
    primary: "bg-primary text-white shadow-card hover:bg-primary-dark",
    secondary: "bg-secondary text-white shadow-sm hover:bg-secondary-dark",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
  };

  const classes = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  // If asLink is true, render an anchor with anchor props
  if ((props as LinkButtonProps).asLink) {
    const linkProps =
      restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  // Otherwise render a normal button
  const buttonProps =
    restProps as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
