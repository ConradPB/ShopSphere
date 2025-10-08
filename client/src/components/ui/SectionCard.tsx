"use client";

import React from "react";
import clsx from "clsx"; // ensures clean merging of className safely

export interface SectionCardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionCard — clean reusable card wrapper for sections
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <section
      className={clsx(
        "bg-white/90 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm",
        className
      )}
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
