"use client";

import React from "react";
import clsx from "clsx"; // ✅ optional utility for cleaner class merging (auto-installed in Next.js)

export interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <section
      className={clsx(
        "bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm transition-colors duration-200",
        className
      )}
    >
      {title && (
        <header className="mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {title}
          </h3>
        </header>
      )}

      <div className="text-neutral-800 dark:text-neutral-200">{children}</div>
    </section>
  );
};

export default SectionCard;
