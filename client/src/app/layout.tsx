import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import CartDebugger from "@/components/CartDebugger";

const ENABLE_CART_DEBUG = process.env.NEXT_PUBLIC_ENABLE_CART_DEBUG === "true";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="en"></html>;
}
