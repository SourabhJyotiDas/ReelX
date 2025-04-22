"use client";

import Image from "next/image";
import Link from "next/link";

const SuggestedAccounts = ({ suggestions = [] }) => {
  return (
    <div className="bg-white text-black p-4 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Suggested Accounts</h2>

      <ul className="space-y-4">
        {suggestions.map((user) => (
          <li key={user.id} className="flex items-center justify-between">
            <Link href={`/profile/${user._id || user.id}`}>
              <div className="flex items-center gap-3">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.username}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.name}</p>
                </div>
              </div>
            </Link>

            <button
              className="ml-3 px-4 py-1 border rounded text-xs hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                // Add your follow logic here
              }}>
              Follow
            </button>
          </li>
        ))}
      </ul>

      {suggestions.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          No suggestions available.
        </p>
      )}
    </div>
  );
};

export default SuggestedAccounts;
