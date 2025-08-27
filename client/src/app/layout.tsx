import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import CartDebugger from "@/components/CartDebugger";

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
          <CartDebugger />
        </ReduxProvider>
      </body>
    </html>
  );
}
