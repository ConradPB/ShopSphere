import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import CartDebugger from "@/components/CartDebugger";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const ENABLE_CART_DEBUG = process.env.NEXT_PUBLIC_ENABLE_CART_DEBUG === "true";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-neutral-50 text-neutral-900 font-sans antialiased">
        <ReduxProvider>
          <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
            {ENABLE_CART_DEBUG ? <CartDebugger /> : null}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
