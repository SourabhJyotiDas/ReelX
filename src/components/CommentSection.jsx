"use client";
import React from "react";
import { useRouter } from "next/navigation"; // For navigation to user profile

const CommentSection = ({ comments, setShowComments }) => {
  const router = useRouter();

  const handleNavigateToProfile = (userId) => {
    router.push(`/user/${userId}`); // Navigate to the user's profile page
  };

  return (
    <div className="bg-gray-50 border-t px-4 pt-4 pb-6 rounded-b-lg">
      {/* Header with Close */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-base text-gray-800">All Comments</h4>
        <button
          onClick={() => setShowComments(false)}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          Close
        </button>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet. Be the first one!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div
                    onClick={() => handleNavigateToProfile(c.userId)}
                    className="cursor-pointer text-sm font-semibold text-gray-800 hover:text-blue-500"
                  >
                    {c.user}
                  </div>
                  <button className="text-xs text-blue-500 hover:text-blue-600">
                    Follow
                  </button>
                </div>
                <p className="text-sm text-gray-800 mt-1">{c.text}</p>
                {/* Optional: Timestamp */}
                <p className="text-xs text-gray-400 mt-1">Just now</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
