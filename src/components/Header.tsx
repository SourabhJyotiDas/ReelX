"use client"

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <div className="space-x-4">
        <Link href="/user/login" className="hover:text-gray-200">
          Login
        </Link>
        <Link href="/user/register" className="hover:text-gray-200">
          Register
        </Link>
        <Link
          href="/user/register"
          className="hover:text-gray-200"
          onClick={() => signOut()}>
          Logout
        </Link>
      </div>
    </nav>
  );
}
