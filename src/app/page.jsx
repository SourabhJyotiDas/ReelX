"use client";

import { useSession } from "next-auth/react";
import FeedPost from "@/components/FeedPost";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [filter, setFilter] = useState("explore"); // Default filter

  const dummyPosts = [
    {
      id: 1,
      user: {
        name: "Shann Bailee",
        username: "shannbailee",
        avatar: "/avatars/1.jpg",
      },
      title: "Dolores Madrigal cosplay ✨🎀",
      tags: "cosplay,disney,encanto",
      mediaUrl: "/posts/1.jpg",
      fileType: "image/jpeg",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      comments: [
        {
          id: 1,
          text: "Absolutely stunning!",
          user: "cosplayqueen",
          userId: 101,
        },
        { id: 2, text: "You nailed it 🔥", user: "kevinart", userId: 102 },
      ],
      likes: [
        {
          id: 101,
          name: "Emma Watson",
          username: "emmawatson",
          avatar: "/avatars/101.jpg",
        },
        {
          id: 102,
          name: "Tom Holland",
          username: "tomholland",
          avatar: "/avatars/102.jpg",
        },
        {
          id: 103,
          name: "Zendaya",
          username: "zendaya",
          avatar: "/avatars/103.jpg",
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Leo King",
        username: "leoking",
        avatar: "/avatars/2.jpg",
      },
      title: "Cinematic drone shot 🌅",
      tags: "drone,nature,sunset",
      mediaUrl: "/posts/2.mp4",
      fileType: "video/mp4",
      createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      comments: [
        {
          id: 1,
          text: "This is wallpaper material!",
          user: "photolover",
          userId: 104,
        },
      ],
      likes: [
        {
          id: 104,
          name: "Robert Downey Jr.",
          username: "robertdowneyjr",
          avatar: "/avatars/104.jpg",
        },
        {
          id: 105,
          name: "Chris Evans",
          username: "chrisevans",
          avatar: "/avatars/105.jpg",
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Nina Torres",
        username: "nina_t",
        avatar: "/avatars/3.jpg",
      },
      title: "Quick skincare routine 🌿",
      tags: "skincare,health,glow",
      mediaUrl: "/posts/3.jpg",
      fileType: "image/jpeg",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      comments: [
        {
          id: 1,
          text: "What moisturizer do you use?",
          user: "skinfan",
          userId: 106,
        },
      ],
      likes: [
        {
          id: 106,
          name: "Jennifer Lawrence",
          username: "jenniferlawrence",
          avatar: "/avatars/106.jpg",
        },
        {
          id: 107,
          name: "Natalie Portman",
          username: "natalieportman",
          avatar: "/avatars/107.jpg",
        },
        {
          id: 108,
          name: "Margot Robbie",
          username: "margotrobbie",
          avatar: "/avatars/108.jpg",
        },
      ],
    },
    {
      id: 4,
      user: {
        name: "Ayan Dev",
        username: "ayan.codes",
        avatar: "/avatars/4.jpg",
      },
      title: "My coding setup 💻✨ #devlife",
      tags: "developer,setup,workspace",
      mediaUrl: "/posts/4.jpg",
      fileType: "image/jpeg",
      createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      comments: [
        { id: 1, text: "Clean setup!", user: "webdev", userId: 109 },
        { id: 2, text: "What monitor is that?", user: "techguy", userId: 110 },
      ],
      likes: [
        {
          id: 109,
          name: "Elon Musk",
          username: "elonmusk",
          avatar: "/avatars/109.jpg",
        },
        {
          id: 110,
          name: "Bill Gates",
          username: "billgates",
          avatar: "/avatars/110.jpg",
        },
        {
          id: 111,
          name: "Mark Zuckerberg",
          username: "zuck",
          avatar: "/avatars/111.jpg",
        },
        {
          id: 112,
          name: "Satya Nadella",
          username: "satyanadella",
          avatar: "/avatars/112.jpg",
        },
      ],
    },
    {
      id: 5,
      user: {
        name: "Mia Chen",
        username: "miachen",
        avatar: "/avatars/5.jpg",
      },
      title: "Weekend baking session 🍪",
      tags: "baking,food,cookies",
      mediaUrl: "/posts/5.jpg",
      fileType: "image/jpeg",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      comments: [
        { id: 1, text: "Recipe please!", user: "bakingmom", userId: 113 },
        {
          id: 2,
          text: "These look delicious",
          user: "foodcritic",
          userId: 114,
        },
      ],
      likes: [
        {
          id: 113,
          name: "Gordon Ramsay",
          username: "gordonramsay",
          avatar: "/avatars/113.jpg",
        },
        {
          id: 114,
          name: "Jamie Oliver",
          username: "jamieoliver",
          avatar: "/avatars/114.jpg",
        },
      ],
    },
  ];

  // Filter posts based on selection
  const filteredPosts = () => {
    switch (filter) {
      case "older":
        return [...dummyPosts].sort((a, b) => a.createdAt - b.createdAt);
      case "liked":
        // Return posts that the current user has liked
        return dummyPosts.filter((post) =>
          post.likes.some((like) => like.username === session?.user?.username)
        );
      case "following":
        // Return posts from users you follow (would need following data)
        return dummyPosts; // Implement your following logic
      case "saved":
        // Return posts the user has saved (would need saved posts data)
        return dummyPosts; // Implement your saved posts logic
      case "trending":
        // Return posts with most likes
        return [...dummyPosts].sort((a, b) => b.likes.length - a.likes.length);
      default: // "explore"
        return dummyPosts;
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="explore">Explore</option>
          <option value="trending">Trending</option>
          <option value="older">Older Posts</option>
          <option value="liked">Liked Posts</option>
          <option value="following">Following</option>
          <option value="saved">Saved</option>
        </select>
      </div>

      {/* Posts */}
      {filteredPosts().map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
}
