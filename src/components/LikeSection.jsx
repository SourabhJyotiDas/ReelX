"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LikesSection = ({ likes, setShowLikes }) => {
  const router = useRouter();

  const handleNavigateToProfile = (userId) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Sticky Header with Close */}
      <div className="sticky top-0 bg-white z-50 px-4 pt-6 pb-4 border-b shadow-sm">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-lg text-gray-800">Likes</h4>
          <button
            onClick={() => setShowLikes(false)}
            className="text-gray-500 hover:text-gray-800 transition text-lg">
            Close
          </button>
        </div>
      </div>

      {/* Scrollable Likes List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {likes.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">
            No likes yet. Be the first one!
          </p>
        ) : (
          <div className="space-y-4 pb-8">
            {likes.map((like, index) => (
              <div key={index} className="flex items-center justify-between space-x-3">
                <Link href={`/user/${like.userId}`} passHref>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 cursor-pointer" />
                    <div className="flex-1">
                      <div className="cursor-pointer text-sm font-semibold text-gray-800 hover:text-blue-500">
                        {like.name}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        @{like.username}
                      </p>
                    </div>
                  </div>
                </Link>
                <button className=" px-4 py-1 border rounded text-sm hover:bg-gray-100">
                  Follow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesSection;
