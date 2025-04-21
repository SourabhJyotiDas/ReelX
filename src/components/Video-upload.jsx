"use client";

import { useState } from "react";

const UploadVideo = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    file: null,
  });
  const [videoPreview, setVideoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // If a file is selected, create a video preview
    if (name === "file" && files.length > 0) {
      const file = files[0];
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploading Video:", form);
    // TODO: API call to upload video
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 p-4 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Video</label>
        <input
          name="file"
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="w-full mt-1 border p-2 rounded bg-white"
          required
        />
      </div>

      {videoPreview && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Video Preview</h3>
          <video controls className="w-full mt-2 rounded" src={videoPreview}></video>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Video Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mt-1 border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mt-1 border p-2 rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="w-full mt-1 border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
      >
        Upload Video
      </button>
    </form>
  );
};

export default UploadVideo;
