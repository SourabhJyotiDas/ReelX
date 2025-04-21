'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUserFriends, FaVideo } from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'For You', icon: <FaHome className="text-xl" />, href: '/' },
    { name: 'Following', icon: <FaUserFriends className="text-xl" />, href: '/following' },
    { name: 'LIVE', icon: <FaVideo className="text-xl" />, href: '/live' },
  ];

  return (
    <div className="h-screen bg-gray-400 w-64 p-4">
      {/* <div className="flex items-center space-x-4 mb-8">
        <div className="text-2xl font-bold">ReelX</div>
      </div> */}

      {/* Sidebar Navigation Links */}
      <div className="space-y-4">
        {navItems.map(({ name, icon, href }) => (
          <Link key={name} href={href}>
            <div
              className={`flex items-center space-x-2 font-semibold cursor-pointer my-4 ${
                pathname === href ? 'text-red-500' : 'text-gray-800'
              }`}
            >
              {icon}
              <span>{name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Suggested Accounts Section */}
      <div className="mt-8">
        <div className="font-semibold">Suggested accounts</div>
        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-600 p-2 rounded-full">
              <img src="https://via.placeholder.com/30" alt="Profile" className="w-8 h-8 rounded-full" />
            </div>
            <span className="text-sm">tate mcrae</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-gray-600 p-2 rounded-full">
              <img src="https://via.placeholder.com/30" alt="Profile" className="w-8 h-8 rounded-full" />
            </div>
            <span className="text-sm">Ryan Reynolds</span>
          </div>
        </div>
      </div>

      {/* Following Accounts Section */}
      <div className="mt-8">
        <div className="font-semibold">Following</div>
        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-600 p-2 rounded-full">
              <img src="https://via.placeholder.com/30" alt="Profile" className="w-8 h-8 rounded-full" />
            </div>
            <span className="text-sm">Asante</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-gray-600 p-2 rounded-full">
              <img src="https://via.placeholder.com/30" alt="Profile" className="w-8 h-8 rounded-full" />
            </div>
            <span className="text-sm">scottkress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
