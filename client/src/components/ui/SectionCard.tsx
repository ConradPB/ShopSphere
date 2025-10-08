"use client";

import React from "react";

export interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionCard = ({
  title,
  children,
  className = "",
}: SectionCardProps) => {
  return (
    <section
      className={`bg-white/90 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm ${className}`}
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
};

export default SectionCard;
