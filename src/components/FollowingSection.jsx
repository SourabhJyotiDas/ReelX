"use client";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

// New Following component
const FollowingSection = ({ following, setShowFollowing }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-50 px-4 pt-6 pb-4 border-b shadow-sm">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-lg text-gray-800">Following</h4>
          <button
            onClick={() => setShowFollowing(false)}
            className="text-gray-500 hover:text-gray-800 transition text-lg">
            Close
          </button>
        </div>
      </div>

      {/* Following List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {following.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">
            Not following anyone yet
          </p>
        ) : (
          <div className="space-y-4 pb-8">
            {following.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 flex items-center">
                      {user.name}
                      {user.verified && (
                        <GoVerified className="ml-1 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400">@{user.username}</p>
                  </div>
                </Link>
                <button className="ml-4 px-4 py-1.5 border rounded-full text-sm font-medium hover:bg-gray-100">
                  Following
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowingSection;

