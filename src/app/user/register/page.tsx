"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import Loading from "@/LoadingSkeletons/RegisterSkeleton";

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) router.replace("/");
  }, [session]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const createUser = async () => {
        try {
          setLoading(true);
          await axios.post("/api/user/create", {
            name: session.user.name,
            email: session.user.email,
            imageUrl: session.user.image || "",
          });
          setLoading(false);
        } catch (error) {
          toast.error("Error creating user.");
          setLoading(false);
        }
      };
      createUser();
    }
  }, [status, session, router]);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === "loading") return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center mb-4 tracking-tight">Join ReelX</h1>
        <p className="text-center text-gray-400 text-sm">
          Sign up to discover and share reels, connect with creators, and have fun!
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-md bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 rounded-md bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-md bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-pink-600 hover:bg-pink-700 transition-colors duration-300 text-white py-3 rounded-md font-semibold cursor-pointer">
          Sign up
        </button>

        <div className="flex items-center gap-2">
          <div className="flex-grow border-t border-gray-600" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-600" />
        </div>

        <button
          onClick={() => {
            setLoading(true);
            signIn("google");
          }}
          className="w-full bg-white text-black hover:bg-gray-200 transition-colors duration-300 py-3 rounded-md font-semibold flex items-center justify-center gap-3 cursor-pointer">
          <FaGoogle /> Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/user/signin" className="text-pink-500 font-semibold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
