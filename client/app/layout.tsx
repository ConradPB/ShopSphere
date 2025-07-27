import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "ShopSphere",
  description: "A stunning e-commerce platform",
};

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
