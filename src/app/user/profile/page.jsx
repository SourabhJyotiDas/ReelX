"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaCog } from "react-icons/fa";
import GridVideos from "../../../components/Grid-videos";
import { FaCheckCircle } from "react-icons/fa"; // Import the check-circle icon
import { GoVerified } from "react-icons/go";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("posts"); // Active tab state

  const user = {
    username: session?.data?.username || "shannbailee",
    name: session?.data?.name || "Shannbailee",
    avatar: session?.data?.image || "/avatar.jpg",
    bio: session?.data?.bio || "Dolores Madrigal cosplay lover ✨🎀",
    verify: session?.data?.verify,
    posts: session?.data?.posts || [
      "/thumb1.jpg",
      "/thumb2.jpg",
      "/thumb3.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb4.jpg",
      "/thumb5.jpg",
      "/thumb6.jpg",
    ],
    saves: session?.data?.saves || ["/thumb1.jpg", "/thumb2.jpg"],
    videos: session?.data?.videos || ["/video-thumb1.jpg", "/video-thumb2.jpg"],
    stats: {
      following: session?.data?.stats?.following || 120,
      followers: session?.data?.stats?.followers || "10.5K",
      likes: session?.data?.stats?.likes || "345.6K",
    },
  };

  const isOwner = session?.data;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="w-full border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">@{user.username}</h1>
        <Link href="/settings" className="text-gray-600 hover:text-black">
          <FaCog className="w-5 h-5 " />
        </Link>
      </div>

      {/* Profile Info */}
      <div className="p-4 flex flex-col items-center">
        <Image
          src={user.avatar}
          width={96}
          height={96}
          alt="avatar"
          className="rounded-full"
        />
        <h2 className="mt-2 text-lg font-semibold flex items-center">
          {user.name}
          {/* Conditionally render the verification icon */}
          {user.verify && (
            <GoVerified className="ml-2 text-red-500" title="Verified" />
          )}
        </h2>

        {/* Show Edit or Follow Button */}
        {!isOwner && (
          <button className="mt-2 px-4 py-1 border rounded text-sm hover:bg-gray-100">
            Follow
          </button>
        )}

        <p className="mt-2 text-sm text-center text-gray-700">{user.bio}</p>

        {/* Stats */}
        <div className="mt-4 flex space-x-6 text-sm text-center">
          <div>
            <p className="font-bold">{user.stats.following}</p>
            <p className="text-gray-500">Following</p>
          </div>
          <div>
            <p className="font-bold">{user.stats.followers}</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-bold">{user.stats.likes}</p>
            <p className="text-gray-500">Likes</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-t border-b sticky top-10 z-50 bg-white">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 p-3 text-center font-semibold ${
            activeTab === "posts" ? "border-b-2 border-black" : "text-gray-500"
          }`}>
          Posts
        </button>

        <button
          onClick={() => setActiveTab("videos")}
          className={`flex-1 p-3 text-center font-semibold ${
            activeTab === "videos" ? "border-b-2 border-black" : "text-gray-500"
          }`}>
          Videos
        </button>

        <button
          onClick={() => setActiveTab("saves")}
          className={`flex-1 p-3 text-center font-semibold ${
            activeTab === "saves" ? "border-b-2 border-black" : "text-gray-500"
          }`}>
          Saves
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "posts" && (
          <GridVideos videos={user?.videos} user={user} />
        )}

        {activeTab === "saves" && (
          <GridVideos videos={user?.videos} user={user} />
        )}

        {activeTab === "videos" && (
          <GridVideos videos={user?.videos} user={user} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
