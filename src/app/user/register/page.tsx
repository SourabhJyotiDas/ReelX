"use client";
import RegisterSkeleton from "@/app/LoadingSkeletons/RegisterSkeleton";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Register() {
  const data = useSession();
  console.log(data);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "", 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/user/register",
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[90vh]">
        {loading ? (
          <RegisterSkeleton />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded">
              Register
            </button>
          </form>
        )}
      </div>
    </>
  );
}
