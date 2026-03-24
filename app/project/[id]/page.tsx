"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/lib/trpc";

export default function ProjectViewPage() {
  const { id } = useParams();

  const { data, isLoading } = trpc.project.getAll.useQuery();

  const project = data?.find((p: any) => p.id === id);

  if (isLoading) return <div className="p-6 text-white">Loading...</div>;
  if (!project) return <div className="p-6 text-white">Not found</div>;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">{project.name}</h1>

      <div className="bg-[#161b22] p-4 rounded-lg border border-white/10">
        <p className="text-sm text-gray-400 mb-2">Project ID:</p>
        <p className="text-sm">{project.id}</p>

        <p className="text-sm text-gray-400 mt-4">Run URL:</p>
        <p className="text-sm">{project.run_url || "Not set"}</p>
      </div>
    </div>
  );
}