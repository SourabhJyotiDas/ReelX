"use client";

import { useState } from "react";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage("New passwords do not match.");
    }

    // TODO: Call your API here
    try {
      // await api.changePassword(formData);
      setMessage("Password changed successfully ✅");
    } catch (error) {
      setMessage("Failed to change password ❌");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Change Password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            className="w-full mt-1 border p-2 rounded"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="w-full mt-1 border p-2 rounded"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full mt-1 border p-2 rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded hover:opacity-90"
        >
          Update Password
        </button>
      </form>

      {message && (
        <p className="text-sm text-center mt-4 text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default ChangePasswordPage;
