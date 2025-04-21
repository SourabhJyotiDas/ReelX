"use client";

import { useState } from "react";
import ImageUploadForm from "@/components/Image-upload";
import VideoUploadForm from "@/components/Video-upload";

const UploadMediaPage = () => {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="min-h-screen bg-white text-black p-6 max-w-3xl mx-auto">
      <div className="border-b border-gray-300 mb-6">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-center font-medium transition-all ${
              activeTab === "image"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("image")}
          >
            Image
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-all ${
              activeTab === "video"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("video")}
          >
            Video
          </button>
        </div>
      </div>

      {activeTab === "image" ? <ImageUploadForm /> : <VideoUploadForm />}
    </div>
  );
};

export default UploadMediaPage;
