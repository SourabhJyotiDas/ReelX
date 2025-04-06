"use client";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

interface fileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: fileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleProgress = (evt: ProgressEvent) => {
    // console.log("Progress", progress);
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleUploadStart = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Start", evt);
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file.");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video must be 100mb.");
        return false;
      }
    } else {
      const validType = ["image/jpeg", "iamge/png", "image/webp"];
      if (!validType) {
        setError("Please upload valid image");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Video must be 10mb.");
        return false;
      }
    }
    return false;
  };

  return (
    <div className="App">
      <IKUpload
        fileName={fileType === "video" ? "ReelX-Video" : "ReelX-Image"}
        //  tags={["sample-tag1", "sample-tag2"]}
        //  customCoordinates={"10,10,10,10"}
        //  isPrivateFile={false}
        useUniqueFileName={true}
        //  responseFields={["tags"]}
        validateFile={validateFile}
        folder={fileType === "video" ? "/ReelX-Video" : "/ReelX-Image"}
        //  webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
        //  overwriteFile={true}
        //  overwriteAITags={true}
        //  overwriteTags={true}
        //  overwriteCustomMetadata={true}

        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleUploadStart}
        onUploadProgress={handleProgress}
        //   transformation={{
        //     pre: "l-text,i-Imagekit,fs-50,l-end",
        //     post: [
        //       {
        //         type: "transformation",
        //         value: "w-100",
        //       },
        //     ],
        //   }}
        style={{ display: "none" }} // hide the default input and use the custom upload button
      />
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="animate-spin w-4 h-4" />
        </div>
      )}
      {error && <div className="text-error text-sm text-red-500">{error}</div>}
    </div>
  );
}
