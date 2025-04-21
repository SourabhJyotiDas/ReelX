"use client";

import { useSession } from "next-auth/react";
import ImageCard from "@/components/ImageCard"


export default function Home() {
  const { data: session, status } = useSession();

  console.log(session);

  return <>
   <div className="min-h-screen bg-white pt-4">
      {/* <ImageCard
        username="shannbailee"
        displayName="Shannbailee"
        // userAvatar="/avatar.jpg" // public/avatar.jpg
        description="Dolores Madrigal! 🧡"
        hashtags={[
          '#doloresmadrigal',
          '#dolores',
          '#encanto',
          '#doloresencanto',
          '#cosplay',
          '#encantocosplay',
        ]}
        audio="original sound - nsara reigns"
        // videoSrc="/video.mp4" // public/video.mp4
        likes="75.6K"
        comments="298"
        shares="288"
      /> */}
    </div>
  </>;
}
