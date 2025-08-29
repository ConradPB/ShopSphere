import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import dynamic from "next/dynamic";
import React from "react";

// client-only CartDebugger (never SSR)
const CartDebugger =
  process.env.NEXT_PUBLIC_ENABLE_CART_DEBUG === "true"
    ? dynamic(() => import("@/components/CartDebugger"), { ssr: true })
    : null;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          {CartDebugger ? <CartDebugger /> : null}
        </ReduxProvider>
      </body>
    </html>
  );
}
