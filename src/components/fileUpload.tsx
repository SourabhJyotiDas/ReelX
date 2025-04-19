"use client";
import { IKUpload } from "imagekitio-next";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function FileUpload() {
  const [url, setUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <IKUpload
        fileName="my-upload"
        useUniqueFileName={true}
        folder="/ReelX" // Optional: creates or uses this folder in ImageKit
        tags={["nextjs", "imagekit", "upload"]}
        customCoordinates="10,10,100,100"
        isPrivateFile={false} // Set to true if you want restricted access

        onUploadStart={() => {
          setUploading(true);
          setProgress(0);
          setError(null);
        }}

        onUploadProgress={(event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
          }
        }}

        onSuccess={(res) => {
          console.log("Uploaded:", res);
          setUrl(res.url);
          setUploading(false);
        }}

        onError={(err) => {
          console.error("Upload Error:", err);
          setError(err?.message || "Upload failed");
          setUploading(false);
        }}
      />

      {uploading && (
        <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>Uploading... {progress}%</span>
        </div>
      )}

      {error && <div className="mt-2 text-red-500">{error}</div>}

      {url && (
        <div className="mt-4">
          <p className="mb-1">Uploaded Image:</p>
          <img src={url} alt="Uploaded" className="w-64 h-auto rounded border" />
        </div>
      )}
    </div>
  );
}
