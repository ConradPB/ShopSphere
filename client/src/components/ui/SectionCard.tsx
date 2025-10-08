"use client";

import React from "react";

export interface SectionCardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionCard
 * A small, re-usable card wrapper for form sections, sidebars, etc.
 * - Accepts an optional `title`
 * - Accepts `className` so callers (like CheckoutPage) can pass theme-specific classes
 */
export default function SectionCard({
  title,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={
        `bg-white/90 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm ` +
        className
      }
    >
      {title && (
        <header className="mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
        </header>
      )}

      <div>{children}</div>
    </section>
  );
}
