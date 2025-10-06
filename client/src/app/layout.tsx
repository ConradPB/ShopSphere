import "./global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/redux/Provider";

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
          {/* Navbar is fixed; add top padding on the main content */}
          <Navbar />
          <main className="flex-1 pt-20">
            {" "}
            {/* pt-20 accounts for fixed navbar height */}
            {children}
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
