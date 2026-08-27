import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import SiteBackground from "@/components/SiteBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "YourBrand",
  description: "Fast, secure transfers worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#08080A] text-white">
        <SiteBackground />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
