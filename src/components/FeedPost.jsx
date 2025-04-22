"use client";
import CommentSection from "@/components/CommentSection";
import LikesSection from "@/components/LikeSection"; // Uncommented this
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBookmark, FaHeart, FaRegComment } from "react-icons/fa";

const FeedPost = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  // Calculate total likes count
  const totalLikes = Array.isArray(post.likes)
    ? post.likes.length + (liked ? 1 : 0)
    : (post.likes || 0) + (liked ? 1 : 0);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setComments((prev) => [
      ...prev,
      { id: Date.now(), text: comment, user: "You" },
    ]);
    setComment("");
  };

  return (
    <div className="bg-white shadow rounded-lg mb-6">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <Image
          src={post.user.avatar}
          width={40}
          height={40}
          className="rounded-full"
          alt="avatar"
        />
        <Link href={`/profile/${post.user._id || post.user.id}`}>
          <div className="ml-3 cursor-pointer hover:underline">
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-sm text-gray-500">@{post.user.username}</p>
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
      </div>

      {/* Title and Tags */}
      <div className="px-4 pb-2">
        <h3 className="font-semibold">{post.title}</h3>
        <p className="text-sm text-blue-500">
          {post.tags.split(",").map((tag) => (
            <span key={tag} className="mr-1">
              #{tag.trim()}
            </span>
          ))}
        </p>
      </div>

      {/* Media */}
      <div className="w-full aspect-[9/16] bg-black relative">
        {post.fileType.startsWith("image") ? (
          <Image src={post.mediaUrl} alt="post" fill className="object-cover" />
        ) : (
          <video
            src={post.mediaUrl}
            controls
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setLiked(!liked);
                // Only show likes section when clicking the likes count, not the heart icon
              }}>
              <FaHeart
                className={`w-5 h-5 ${
                  liked ? "text-red-500" : "text-gray-500"
                }`}
              />
            </button>
            <button onClick={() => setShowComments((prev) => !prev)}>
              <FaRegComment className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)}>
            <FaBookmark
              className={`w-5 h-5 ${saved ? "text-blue-500" : "text-gray-500"}`}
            />
          </button>
        </div>

        <div className="flex gap-2 text-sm text-gray-700">
          <button
            onClick={() => setShowLikes(true)}
            className="hover:underline">
            {totalLikes} likes
          </button>
          <span>•</span>
          <button
            onClick={() => setShowComments(true)}
            className="hover:underline">
            {comments.length} comments
          </button>
        </div>
      </div>

      {/* Showing Comments */}
      {showComments && (
        <CommentSection comments={comments} setShowComments={setShowComments} />
      )}

      {/* Showing Likes */}
      {showLikes && (
        <LikesSection
          likes={Array.isArray(post.likes) ? post.likes : []}
          setShowLikes={setShowLikes}
        />
      )}

      {/* Comment Box */}
      <form
        onSubmit={handleCommentSubmit}
        className="px-4 pb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-all duration-200 ${
            comment.trim() ? "pr-1" : ""
          }`}
        />
        {comment.trim() && (
          <button className="px-3 py-2 border rounded text-sm hover:bg-gray-100">
            Send
          </button>
        )}
      </form>
      <div className="ml-auto text-xs text-gray-400 px-4 pb-3">
        {"1 hours ago"}
      </div>
    </div>
  );
};

export default FeedPost;
