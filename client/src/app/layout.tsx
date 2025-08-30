// src/app/layout.tsx  (server component)
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
      <body>
        <ReduxProvider>
          {children}
          {ENABLE_CART_DEBUG ? <CartDebugger /> : null}
        </ReduxProvider>
      </body>
    </html>
  );
}
