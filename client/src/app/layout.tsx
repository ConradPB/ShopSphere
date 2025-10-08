import "./global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/redux/Provider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ShopSphere",
  description: "AI-powered E-commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <ReduxProvider>
          {/* Navbar is fixed and overlays the hero */}
          <Navbar />

          {/* Main no longer has top padding — hero will start at the top and sit under the navbar */}
          <main className="flex-1 w-full">{children}</main>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
