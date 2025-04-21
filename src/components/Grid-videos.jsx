import Image from "next/image";
import React from "react";

export default function GridVideos({user}) {
  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      {user.posts.map((thumb, index) => (
        <div key={index} className="relative w-full aspect-[9/16] bg-black">
          <Image
            src={thumb}
            alt={`post-${index}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
