"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import Sidebar from "@/components/layout/sidebar";

const userId = "11111111-1111-1111-1111-111111111111";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [original, setOriginal] = useState<any>(null);
  const [status, setStatus] = useState<"saved" | "saving" | "changed">("saved");

  const { data, isLoading } = trpc.user.getProfile.useQuery({ id: userId });
  const update = trpc.user.updateProfile.useMutation();

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setBio(data.bio || "");
      setAvatar(data.avatar_url || null);
      setOriginal(data);
    }
  }, [data]);

  useEffect(() => {
    if (!original) return;

    if (
      name !== original.name ||
      email !== original.email ||
      bio !== original.bio ||
      avatar !== original.avatar_url
    ) {
      setStatus("changed");
    } else {
      setStatus("saved");
    }
  }, [name, email, bio, avatar, original]);

  const uploadAvatar = async (file: File) => {
    const filePath = `${userId}/avatar.png`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      toast.error("Upload failed");
      return;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    setAvatar(data.publicUrl + `?t=${Date.now()}`);
    setStatus("changed");

    toast.success("Image updated");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white">

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-black p-6">
            <Sidebar />
          </div>

          <div
            className="flex-1 bg-black/60"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white text-black border-r border-white/10 p-6">
        <Sidebar />
      </aside>

      {/* Main */}
      <main className="flex-1 px-4 sm:px-6 md:px-10 py-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>

          <span
            className={`text-xs px-3 py-1 rounded-full ${
              status === "saved"
                ? "bg-green-500/10 text-green-400"
                : status === "saving"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-blue-500/10 text-blue-400"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Card */}
        <div className="max-w-xl bg-[#161b22] border border-white/10 rounded-xl p-5 sm:p-6 shadow-lg">

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-black/40">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <label className="mt-3 text-xs cursor-pointer text-blue-400 hover:underline">
              Change Photo
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadAvatar(file);
                }}
              />
            </label>
          </div>

          {/* Inputs */}
          <div className="space-y-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2.5 bg-black/40 border border-white/10 rounded"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2.5 bg-black/40 border border-white/10 rounded"
            />

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              className="w-full p-2.5 bg-black/40 border border-white/10 rounded"
            />

            <button
              onClick={() => {
                setStatus("saving");
                const t = toast.loading("Saving...");

                update.mutate(
                  {
                    id: userId,
                    name,
                    email,
                    bio,
                    avatar_url: avatar,
                  },
                  {
                    onSuccess: () => {
                      setOriginal({ name, email, bio, avatar_url: avatar });
                      setStatus("saved");
                      toast.success("Saved", { id: t });
                    },
                    onError: () => {
                      setStatus("changed");
                      toast.error("Error", { id: t });
                    },
                  }
                );
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Save
            </button>

          </div>
        </div>

      </main>
    </div>
  );
}