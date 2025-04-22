"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CommentSection = ({ comments, setShowComments }) => {
  const router = useRouter();

  const handleNavigateToProfile = (userId) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Sticky Header with Close - Higher z-index */}
      <div className="sticky top-0 bg-white z-50 px-4 pt-6 pb-4 border-b shadow-sm">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-lg text-gray-800">All Comments</h4>
          <button
            onClick={() => setShowComments(false)}
            className="text-gray-500 hover:text-gray-800 transition text-lg">
            Close
          </button>
        </div>
      </div>

      {/* Scrollable Comments List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">
            No comments yet. Be the first one!
          </p>
        ) : (
          <div className="space-y-4 pb-8">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/user/${c.userId}`}
                      className="flex flex-col items-center hover:text-blue-500">
                      <span className="text-sm font-semibold text-gray-800 cursor-pointer">
                        {c.user}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        @JohnDoe_dev
                      </p>
                    </Link>
                    <button
                      className="ml-3 px-4 py-1 border rounded text-sm hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add your follow logic here
                      }}>
                      Follow
                    </button>
                  </div>
                  <p className="text-sm text-gray-800 mt-1">{c.text}</p>
                  <p className="text-xs text-gray-400 mt-1">Just now</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
