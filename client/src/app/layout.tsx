import "./globals.css";
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
    <html lang="en" className="w-full overflow-x-hidden">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 overflow-x-hidden antialiased">
        <ReduxProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
