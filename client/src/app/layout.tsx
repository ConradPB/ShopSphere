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
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] overflow-x-hidden">
        <ReduxProvider>
          <Navbar />
          {/* main flex-1 so footer will always be after content */}
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
