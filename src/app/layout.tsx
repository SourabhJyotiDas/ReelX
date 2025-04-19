import Navbar from "@/components/Header"; // ✅ Import the Navbar
import Providers from "@/components/providers";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

const Poppinss = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // use bolds for headers, regular for body
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Poppinss.className}>
        <Providers>
        <ToastContainer />
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
