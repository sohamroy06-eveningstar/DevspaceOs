"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone, // optional metadata
        },
      },
    });

    if (error) return alert(error.message);

    alert("Account created successfully 🚀");
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f5]">
      <div className="w-full max-w-md px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-sm font-medium text-black flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-black rounded-sm"></span>
            DevspaceOs
          </h1>

          <h2 className="text-3xl font-semibold text-black mt-3">Sign up</h2>

          <p className="text-black text-sm mt-2">
            Manage bookings, track clients, send reminders,
            and accept payments all in one place.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-black">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full mt-1 px-4 py-3 rounded-xl text-black border bg-gray-100 outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-black">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 text-black border py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-black">Phone number</label>
            <input
              type="text"
              placeholder="+1 (000) 000-00-00"
              className="w-full mt-1 px-4 py-3 rounded-xl text-black border bg-gray-100 outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Button Row */}
          <div className="flex items-center gap-3 mt-4">
            
            {/* Back Button */}
            <Link
              href="/login"
              className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              <ArrowLeft color="black" size={18} />
            </Link>

            {/* Continue Button */}
            <button
              onClick={signup}
              className="flex-1 bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
            >
              Continue
            </button>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-black mt-4">
            By clicking you agree to our <br />
            Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}