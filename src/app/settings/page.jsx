"use client";

import Link from "next/link";
import { FaChevronRight, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const SettingsPage = () => {
  const { data: session, status } = useSession();

  const dummyLinks = [
    { title: "Account", href: "/user/edit-profile" },
    { title: "Privacy", href: "/settings/privacy" },
    { title: "Notifications", href: "/settings/notifications" },
    { title: "Security", href: "/settings/security" },
    { title: "Help & Support", href: "/settings/help" },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/user/login" }); // Redirect to home page after logout
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Profile Summary */}
        <div className="flex items-center mb-6 space-x-4">
        <Image
          src={session?.data?.image}
          width={50}
          height={50}
          alt="avatar"
          className="rounded-full"
        />
          <div>
            <h2 className="text-lg font-semibold">{session?.data?.name}</h2>
            <p className="text-sm text-gray-500">@{session?.data?.username}</p>
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-4">
          {dummyLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="flex items-center justify-between p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
              <div className="flex items-center space-x-2">
                <FaUserCog />
                <span>{link.title}</span>
              </div>
              <FaChevronRight />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full flex items-center justify-center space-x-2 text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-50 transition">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
