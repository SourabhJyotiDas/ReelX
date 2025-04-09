import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/components/providers";
import Navbar from "@/app/components/Header"; // ✅ Import the Navbar

export const metadata: Metadata = {
  title: "My App",
  description: "A cool Next.js app with login and register",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar /> {/* ✅ Add Navbar here */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
