"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaCog } from "react-icons/fa";
import GridVideos from "../../../components/Grid-videos";
import { GoVerified } from "react-icons/go";
import FollowingSection from "../../../components/FollowingSection";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("posts");
  const [showFollowing, setShowFollowing] = useState(false);

  // Enhanced user data with following list
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
    following: [
      {
        id: "1",
        name: "Emma Watson",
        username: "emmawatson",
        avatar: "/avatars/emma.jpg",
        verified: true,
      },
      {
        id: "2",
        name: "Tom Holland",
        username: "tomholland",
        avatar: "/avatars/tom.jpg",
        verified: true,
      },
      {
        id: "3",
        name: "Zendaya",
        username: "zendaya",
        avatar: "/avatars/zendaya.jpg",
        verified: true,
      },
    ],
  };

  const isOwner = session?.data;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="w-full border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">@{user.username}</h1>
        <Link href="/settings" className="text-gray-600 hover:text-black">
          <FaCog className="w-5 h-5" />
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
          {user.verify && (
            <GoVerified className="ml-2 text-blue-500" title="Verified" />
          )}
        </h2>

        {!isOwner && (
          <button className="mt-2 px-4 py-1 border rounded text-sm hover:bg-gray-100">
            Follow
          </button>
        )}

        <p className="mt-2 text-sm text-center text-gray-700">{user.bio}</p>

        {/* Stats */}
        <div className="mt-4 flex space-x-6 text-sm text-center">
          <div>
            <p className="font-bold">{user.stats.likes}</p>
            <p className="text-gray-500">Posts</p>
          </div>

          <div
            className="cursor-pointer"
            onClick={() => setShowFollowing(true)}>
            <p className="font-bold">{user.stats.followers}</p>
            <p className="text-gray-500">Followers</p>
          </div>

          <div
            className="cursor-pointer"
            onClick={() => setShowFollowing(true)}>
            <p className="font-bold">{user.stats.following}</p>
            <p className="text-gray-500">Following</p>
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
      <div className="">
        {activeTab === "posts" && (
          <GridVideos videos={user?.posts} user={user} />
        )}

        {activeTab === "saves" && (
          <GridVideos videos={user?.saves} user={user} />
        )}

        {activeTab === "videos" && (
          <GridVideos videos={user?.videos} user={user} />
        )}
      </div>

      {/* Following Modal */}
      {showFollowing && (
        <FollowingSection
          following={user.following}
          setShowFollowing={setShowFollowing}
        />
      )}
    </div>
  );
};

export default ProfilePage;
