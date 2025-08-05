import { Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({ subsets: ["latin"], display: "swap" });
const RootLayout = ({ children }) => {
    return (<html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>);
};
export default RootLayout;
