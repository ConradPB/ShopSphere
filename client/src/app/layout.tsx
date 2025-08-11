import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar"; // 👈 Import the navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopSphere",
  description: "Your one-stop e-commerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar /> {/* 👈 Add it here so it’s always visible */}
        <main className="pt-16">{children}</main>{" "}
        {/* 👈 Push content below navbar */}
      </body>
    </html>
  );
}
