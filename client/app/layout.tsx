import type { FC } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const robo = Roboto({ subsets: ["latin"], display: "swap" });

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
