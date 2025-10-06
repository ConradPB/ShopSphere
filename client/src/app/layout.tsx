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
      <body className="min-h-screen flex flex-col bg-dark text-white">
        <ReduxProvider>
          <Provider store={store}>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
