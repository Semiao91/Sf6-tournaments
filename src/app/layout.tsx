import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/component/footer";
import "./globals.css";
import Navbar from "@/components/component/navbar";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SF 6 Tournanments",
  description: "Get the latest Street Fighter 6 tournament information for the EU region at a glance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
