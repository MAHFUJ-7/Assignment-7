import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarPage from "@/component/navbar/page";
import FooterPart from "@/component/footer/page";
import { ToastProvider } from "@heroui/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavbarPage />
        <ToastProvider />
        {children}
        <FooterPart />
      </body>
    </html>
  );
}
