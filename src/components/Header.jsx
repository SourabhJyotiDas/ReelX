'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaSearch,
  FaUpload,
  FaUserCircle,
} from 'react-icons/fa';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-black">
        <Link href="/">ReelX</Link>
      </div>

      {/* Search Bar */}
      <div className="relative w-2/4">
        <input
          type="text"
          placeholder="Search accounts and videos"
          className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 focus:outline-none"
        />
        <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-6 text-xl text-gray-800">
        {/* Upload */}
        <div className="relative group">
          <Link href="/upload">
            <FaUpload className="cursor-pointer" />
          </Link>
          <span className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition text-sm bg-black text-white px-2 py-1 rounded-md">
            Create
          </span>
        </div>

        {/* Profile */}
        <div className="relative group">
          <Link href="/profile">
            <FaUserCircle
              className={`cursor-pointer ${
                pathname === '/profile' ? 'text-red-500' : ''
              }`}
            />
          </Link>
          <span className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition text-sm bg-black text-white px-2 py-1 rounded-md">
            Profile
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
