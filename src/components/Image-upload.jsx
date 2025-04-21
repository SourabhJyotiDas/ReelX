"use client";

import { useState } from "react";

const UploadImage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    file: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // If a file is selected, create an image preview
    if (name === "file" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploading Image:", form);
    // TODO: API call to upload image
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-gray-50 p-4 rounded-lg shadow">
      <div>
        {imagePreview && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Image Preview</h3>
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full mt-2 rounded"
            />
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Select Image
        </label>
        <input
          name="file"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full mt-1 border p-2 rounded bg-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mt-1 border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mt-1 border p-2 rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tags (comma separated)
        </label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="w-full mt-1 border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition">
        Upload Image
      </button>
    </form>
  );
};

export default UploadImage;
