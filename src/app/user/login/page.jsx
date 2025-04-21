"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/LoadingSkeletons/RegisterSkeleton";
import { toast } from "react-toastify";
import { FaGoogle, FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const createUser = async () => {
        try {
          setLoading(true);
          await axios.post("/api/user/create", {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || "",
          });
          setLoading(false);
        } catch (error) {
          toast.error("Error creating user.");
          setLoading(false);
        }
      };
      createUser();
    }
  }, [status, session]);

  const handleSignIn = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/user/profile");
    }
  };

  if (loading || status === "loading") return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center mb-4 tracking-tight">Welcome Back to ReelX</h1>
        <p className="text-center text-gray-400 text-sm">
          Log in to watch, create, and engage with your favorite creators!
        </p>

        {/* Email */}
        <div className="mb-4 flex items-center border-b border-gray-600 px-3 py-2 focus-within:border-pink-500">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full bg-transparent focus:outline-none text-white placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4 flex items-center border-b border-gray-600 px-3 py-2 focus-within:border-pink-500">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full bg-transparent focus:outline-none text-white placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-pink-600 hover:bg-pink-700 transition-all text-white py-3 rounded-md font-semibold shadow-lg transform hover:scale-105 cursor-pointer">
          Sign In
        </button>

        {/* OR Separator */}
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-700" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-700" />
        </div>

        {/* Google Login */}
        <button
          onClick={() => {
            setLoading(true);
            signIn("google");
          }}
          className="w-full bg-white text-black hover:bg-gray-200 transition-all py-3 rounded-md font-semibold flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 cursor-pointer">
          <FaGoogle /> Sign in with Google
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link href="/user/register" className="text-pink-500 hover:underline cursor-pointer font-medium">
            Join ReelX
          </Link>
        </p>
      </div>
    </div>
  );
}
