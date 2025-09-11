// src/app/layout.tsx
import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import CartDebugger from "@/components/CartDebugger";

const ENABLE_CART_DEBUG = process.env.NEXT_PUBLIC_ENABLE_CART_DEBUG === "true";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* TEMPORARY: add a known Tailwind utility to test if styles are loaded */}
      <body className="min-h-screen bg-blue-50 text-gray-900">
        <ReduxProvider>
          {children}
          {ENABLE_CART_DEBUG ? <CartDebugger /> : null}
        </ReduxProvider>
      </body>
    </html>
  );
}
