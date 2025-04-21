"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Pencil } from "lucide-react"; // using lucide for icon
import Image from "next/image";
import Link from "next/link";

const EditProfilePage = () => {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    email: "",
    phone: "",
    image: "",
    gender: "male",
  });

  useEffect(() => {
    if (session?.data) {
      setFormData({
        name: session.data.name || "",
        username: session.data.username || "",
        bio: session.data.bio || "",
        email: session.data.email || "",
        phone: session.data.phone || "",
        image: session.data.image || "",
        gender: session.data.gender || "male",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = () => {
    const newImage = prompt("Enter new image URL:");
    if (newImage) {
      setFormData((prev) => ({ ...prev, image: newImage }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 max-w-md mx-auto">
      {/* Profile Picture with Edit Icon */}
      <div className="relative w-28 h-28 mx-auto mb-6">
        <Image
          src={formData.image}
          alt="Profile"
          className="object-cover rounded-full border shadow"
          width={200}
          height={200}
        />
        <button
          onClick={handleImageChange}
          className="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full hover:opacity-80">
          <Pencil size={16} />
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full mt-1 border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            className="w-full mt-1 border p-2 rounded"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            className="w-full mt-1 border p-2 rounded"
            rows={3}
            value={formData.bio}
            onChange={handleChange}></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-1 border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full mt-1 border p-2 rounded"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            className="w-full mt-1 border p-2 rounded"
            value={formData.gender}
            onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded hover:opacity-90">
          Save Changes
        </button>
      </form>

      {/* Change Password Button */}
      <Link href={"/user/change-password"}>
        <button
          className="w-full mt-4 bg-black text-white py-2 rounded hover:opacity-90">
          Change Password
        </button>
      </Link>
    </div>
  );
};

export default EditProfilePage;
