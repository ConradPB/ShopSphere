"use client";

import React from "react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
