"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { useRouter } from "next/navigation"; // ✅ added
import { Sparkle, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter(); // ✅ added

  const { data, isLoading, refetch } = trpc.project.getAll.useQuery();

  const create = trpc.project.create.useMutation({
    onSuccess: () => {
      setName("");
      refetch();
    },
  });

  const deleteProject = trpc.project.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const updateProject = trpc.project.update.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white">

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-white p-6 border-r border-white/10">
            <Sidebar />
          </div>

          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-white/10 p-6">
        <Sidebar />
      </aside>

      {/* Main */}
      <main className="flex-1 p-3 sm:p-4 md:p-8">

        <Topbar
          onMenuClick={() => setOpen(true)}
          name={name}
          setName={setName}
          onCreate={() => {
            if (!name.trim()) return;
            create.mutate({ name });
          }}
        />

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {data?.map((p: any) => (
            <div
              key={p.id}
              className="
                group relative
                bg-[#161b22]
                border border-white/10
                rounded-xl
                p-5
                shadow-md
                hover:shadow-2xl
                hover:border-white/20
                transition-all duration-300
                overflow-hidden
              "
            >
              {/* Top Glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold mb-2 break-words">
                {p.name}
              </h3>

              {/* Subtext */}
              <p className="text-xs text-gray-400 mb-4">
                Project workspace • Ready to use
              </p>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-4" />

              {/* Actions */}
              <div className="flex flex-wrap gap-2">

                {/* EDIT */}
                <button
                  onClick={() => {
                    const newName = prompt("Edit project", p.name);
                    if (!newName) return;
                    updateProject.mutate({
                      id: p.id,
                      name: newName,
                    });
                  }}
                  className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => {
                    if (!confirm("Delete project?")) return;
                    deleteProject.mutate({ id: p.id });
                  }}
                  className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                >
                  Delete
                </button>

                {/* ✅ VIEW (logic added) */}
                <button
                  onClick={() => router.push(`/project/${p.id}`)}
                  className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
                >
                  View
                </button>

                {/* ✅ RUN (logic added) */}
                <button
                  onClick={() => {
                    if (!p.run_url) {
                      alert("No run URL set");
                      return;
                    }
                    window.open(p.run_url, "_blank");
                  }}
                  className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                >
                  Run
                </button>

              </div>

              {/* Bottom glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent blur-xl transition pointer-events-none" />
            </div>
          ))}

        </div>

      </main>

{/* 🤖 AI Assistant Floating Button */}
<button
  onClick={() => router.push("/assistant")}
  className="fixed bottom-6 right-6 z-50 group"
>
  <div
    className="
      relative w-14 h-14 rounded-full
      bg-gradient-to-br from-white/20 to-white/5
      backdrop-blur-xl
      border border-white/10
      shadow-[0_10px_30px_rgba(0,0,0,0.6)]
      flex items-center justify-center
      transition-all duration-300
      group-hover:scale-110
      group-active:scale-95
    "
  >
    {/* Glow */}
    <div className="absolute inset-0 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition" />

    {/* ✅ NEW ICON */}
    <Sparkles size={20} className="text-yellow-400" />
  </div>

  {/* Tooltip */}
  <div
    className="
      absolute right-16 bottom-1/2 translate-y-1/2
      bg-[#161b22] text-white text-xs px-3 py-1.5 rounded-md
      border border-white/10
      opacity-0 group-hover:opacity-100
      transition
      whitespace-nowrap
    "
  >
    DevSpace AI
  </div>
</button>
      
    </div>

  );
}