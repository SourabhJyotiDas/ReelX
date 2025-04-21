// components/VideoPost.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaCommentDots, FaShare } from 'react-icons/fa';

const ImageCard = ({
  username,
  userAvatar,
  displayName,
  description,
  hashtags,
  audio,
  videoSrc,
  likes,
  comments,
  shares,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto p-4 border-b border-gray-200 bg-white">
      {/* Video */}
      <div className="flex-shrink-0 w-full md:w-2/3 bg-black rounded-lg overflow-hidden">
        <video
          src={videoSrc}
          className="w-full aspect-[9/16] object-cover"
          controls
          loop
          autoPlay
          muted
        ></video>
      </div>

      {/* Sidebar */}
      <div className="md:ml-6 mt-4 md:mt-0 flex-1 space-y-3">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Image
            src={userAvatar}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <Link href={`/user/${username}`} className="font-bold text-sm">
              {username}
            </Link>
            <p className="text-sm text-gray-500">{displayName}</p>
          </div>
          <button className="ml-auto text-sm text-pink-600 border border-pink-500 px-3 py-1 rounded hover:bg-pink-50">
            Follow
          </button>
        </div>

        {/* Description + Hashtags */}
        <p className="text-sm text-gray-800">
          {description}{' '}
          {hashtags.map((tag, idx) => (
            <Link key={idx} href={`/tag/${tag.replace('#', '')}`} className="text-blue-600">
              {tag}{' '}
            </Link>
          ))}
        </p>

        {/* Audio Info */}
        <p className="text-sm text-gray-500">🎵 {audio}</p>

        {/* Icons */}
        <div className="flex items-center space-x-6 mt-4 text-gray-700 text-xl">
          <div className="flex flex-col items-center">
            <FaHeart className="hover:text-red-500 cursor-pointer" />
            <span className="text-sm">{likes}</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCommentDots className="hover:text-blue-500 cursor-pointer" />
            <span className="text-sm">{comments}</span>
          </div>
          <div className="flex flex-col items-center">
            <FaShare className="hover:text-green-500 cursor-pointer" />
            <span className="text-sm">{shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
