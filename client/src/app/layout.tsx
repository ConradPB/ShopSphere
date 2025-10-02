import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 font-sans antialiased">
        <main className="min-h-screen bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-600 text-white flex items-center justify-center">
          <h1 className="text-4xl font-bold">Tailwind is working 🎉</h1>
        </main>
      </body>
    </html>
  );
}
