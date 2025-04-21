"use client";

import { useSession } from "next-auth/react";
import ExploreFeed from "@/components/ExploreFeed"; // adjust path as needed

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session);

  const dummyPosts = [
    {
      id: 1,
      user: {
        name: "Shann Bailee",
        username: "shannbailee",
        avatar: "/avatar.jpg",
      },
      title: "Dolores Madrigal cosplay ✨🎀",
      tags: "cosplay,disney,encanto",
      mediaUrl: "/thumb1.jpg",
      fileType: "image/jpeg",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      likes: 342,
      comments: [
        { id: 1, text: "Absolutely stunning!", user: "anna" },
        { id: 2, text: "You nailed it 🔥", user: "kevin" },
        { id: 1, text: "Absolutely stunning!", user: "anna" },
        { id: 2, text: "You nailed it 🔥", user: "kevin" },
        { id: 1, text: "Absolutely stunning!", user: "anna" },
        { id: 2, text: "You nailed it 🔥", user: "kevin" },
        { id: 1, text: "Absolutely stunning!", user: "anna" },
        { id: 2, text: "You nailed it 🔥", user: "kevin" },
        { id: 1, text: "Absolutely stunning!", user: "anna" },
        { id: 2, text: "You nailed it 🔥", user: "kevin" },
      ],
    },
    {
      id: 2,
      user: {
        name: "Leo King",
        username: "leoking",
        avatar: "/avatar2.jpg",
      },
      title: "Cinematic drone shot 🌅",
      tags: "drone,nature,sunset",
      mediaUrl: "/thumb2.jpg",
      fileType: "image/jpeg",
      createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      likes: 1198,
      comments: [
        { id: 1, text: "This is a wallpaper for real!", user: "sophie" },
      ],
    },
    {
      id: 3,
      user: {
        name: "Nina Torres",
        username: "nina_t",
        avatar: "/avatar3.jpg",
      },
      title: "Quick skincare routine 🌿",
      tags: "skincare,health,glow",
      mediaUrl: "/thumb3.jpg",
      fileType: "video/mp4",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      likes: 875,
      comments: [
        { id: 1, text: "What moisturizer do you use?", user: "camila" },
      ],
    },
    {
      id: 4,
      user: {
        name: "Ayan Dev",
        username: "ayan.codes",
        avatar: "/avatar4.jpg",
      },
      title: "My coding setup 💻✨",
      tags: "developer,desksetup,workspace",
      mediaUrl: "/thumb4.jpg",
      fileType: "image/jpeg",
      createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      likes: 432,
      comments: [
        { id: 1, text: "Clean and aesthetic 🔥", user: "raj" },
        { id: 2, text: "What's the monitor size?", user: "dave" },
      ],
    },
  ];

  return (
    <div className="p-4 max-w-xl mx-auto">
      {dummyPosts.map((post) => (
        <ExploreFeed key={post.id} post={post} />
      ))}
    </div>
  );
}
