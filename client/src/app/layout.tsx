import "./global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <Navbar />
        <main className="min-h-screen max-w-7xl mx-auto px-4 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
