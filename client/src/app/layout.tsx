import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen max-w-7xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
