import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans antialiased">
        {/* Global wrapper */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
