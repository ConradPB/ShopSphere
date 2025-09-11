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
      <body className="min-h-screen bg-blue-50 text-gray-900 flex items-center justify-center">
        <ReduxProvider>
          <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
            {children}
            {ENABLE_CART_DEBUG ? <CartDebugger /> : null}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
