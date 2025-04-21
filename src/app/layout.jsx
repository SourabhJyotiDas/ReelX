import Navbar from "@/components/Header"; // ✅ Import the Navbar
import Sidebar from "@/components/Sidebar"; // ✅ Import the Navbar
import Providers from "@/components/providers";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";

const Poppinss = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // use bolds for headers, regular for body
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <ToastContainer />
        <body className={`${Poppinss.className} flex`}>
          <Sidebar />
          <div className="w-full">
            <Header />
            <main>{children}</main>
          </div>
        </body>
      </Providers>
    </html>
  );
}
