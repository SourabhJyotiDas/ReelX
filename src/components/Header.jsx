"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaSearch,
  FaUpload,
  FaUserCircle,
  FaCog,
  FaSignInAlt,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  console.log(status);

  return (
    <header className="flex items-center justify-between px-4 md:px-28 py-2 md:py-3 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="text-lg md:text-2xl font-bold text-black">
        <Link href="/">ReelX</Link>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4 md:space-x-6 text-base md:text-xl text-gray-800">
        {/* Search Icon */}
        <Link href="/search">
          <FaSearch className="cursor-pointer" />
        </Link>

        {/* Upload */}
        <div className="relative group">
          <Link href="/upload">
            <FaUpload className="cursor-pointer" />
          </Link>
          <span className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition text-xs md:text-sm bg-black text-white px-2 py-1 rounded-md whitespace-nowrap">
            Create
          </span>
        </div>

        {/* Sign In / Account */}
        {status == "authenticated" ? (
          <div className="relative group">
            <Link href="/user/profile">
              {session?.data?.image && (
                <Image
                  src={session?.data?.image} // Fallback if image is not available
                  alt="User Avatar"
                  className={`cursor-pointer ${
                    pathname === "/user/profile"
                      ? "border-2 border-red-500"
                      : ""
                  } rounded-full`}
                  width={30}
                  height={30}
                />
              )}
            </Link>
            <span className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition text-xs md:text-sm bg-black text-white px-2 py-1 rounded-md whitespace-nowrap">
              Profile
            </span>
          </div>
        ) : (
          <Link href="/user/login">
            <FaSignInAlt className="cursor-pointer" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
