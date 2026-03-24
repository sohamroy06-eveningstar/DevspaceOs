"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    // ✅ validation
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // ❌ error handling
    if (error) {
      alert(error.message);
      return;
    }

    // ❌ safety check
    if (!data.session) {
      alert("Login failed. Try again.");
      return;
    }

    // ✅ store token
    localStorage.setItem("token", data.session.access_token);

    // ✅ redirect
    window.location.href = "/dashboard";
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard", // optional but better
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
        
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="font-semibold text-lg text-black">DevSpaceOs</h1>
          <h2 className="text-2xl font-bold mt-2 text-black">
            Log In or Sign Up
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Manage your projects and collaborate smarter.
          </p>
        </div>

        

        {/* Email */}
        <div className="mb-3">
          <label className="text-sm text-black">Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full mt-1 px-3 py-2 text-black border rounded-lg outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-black">
            <label>Password</label>
            <span className="cursor-pointer text-black underline hover:underline">
              Forgot password?
            </span>
          </div>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full mt-1 px-3 py-2 border rounded-lg outline-none text-black focus:ring-2 focus:ring-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={login}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Continue
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-black">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline cursor-pointer text-black">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}