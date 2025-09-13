// src/app/layout.tsx
import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import CartDebugger from "@/components/cartDebugger";
import Navbar from "@/components/Navbar";

const ENABLE_CART_DEBUG = process.env.NEXT_PUBLIC_ENABLE_CART_DEBUG === "true";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 font-sans antialiased">
        <ReduxProvider>
          <Navbar />
          {/* Global wrapper */}
          <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            {/* add top padding to account for fixed navbar */}
            {children}
            {ENABLE_CART_DEBUG ? <CartDebugger /> : null}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
