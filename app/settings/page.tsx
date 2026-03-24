"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import toast from "react-hot-toast";
import Sidebar from "@/components/layout/sidebar";

const userId = "11111111-1111-1111-1111-111111111111";

export default function SettingsPage() {
  const [open, setOpen] = useState(false);

  // ✅ REAL SETTINGS
  const [model, setModel] = useState("mistral");
  const [temperature, setTemperature] = useState(0.7);
  const [autoSave, setAutoSave] = useState(true);

  const [original, setOriginal] = useState<any>(null);
  const [status, setStatus] = useState<"saved" | "saving" | "changed">("saved");

  const { data } = trpc.settings.get.useQuery({ userId });
  const update = trpc.settings.update.useMutation();

  useEffect(() => {
    if (data) {
      setModel(data.model || "mistral");
      setTemperature(data.temperature || 0.7);
      setAutoSave(data.autoSave ?? true);
      setOriginal(data);
    }
  }, [data]);

  useEffect(() => {
    if (!original) return;

    if (
      model !== original.model ||
      temperature !== original.temperature ||
      autoSave !== original.autoSave
    ) {
      setStatus("changed");
    } else {
      setStatus("saved");
    }
  }, [model, temperature, autoSave, original]);

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white">

      <aside className="hidden md:flex w-64 bg-white text-black p-6">
        <Sidebar />
      </aside>

      <main className="flex-1 max-w-3xl mx-auto p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-semibold">Settings</h1>

          <span className="text-xs px-3 py-1 rounded bg-white/10">
            {status}
          </span>
        </div>

        {/* AI SETTINGS */}
        <div className="bg-[#161b22] p-6 rounded-xl border border-white/10 space-y-5">

          <h2 className="text-sm text-gray-400">AI SETTINGS</h2>

          {/* MODEL */}
          <div>
            <label className="text-sm">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full mt-1 p-2 bg-black border border-white/10 rounded"
            >
              <option value="mistral">Mistral</option>
              <option value="llama">LLaMA</option>
              <option value="deepseek">DeepSeek</option>
            </select>
          </div>

          {/* TEMPERATURE */}
          <div>
            <label className="text-sm">Creativity (Temperature)</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* AUTO SAVE */}
          <div className="flex justify-between items-center">
            <p className="text-sm">Auto Save Projects</p>
            <input
              type="checkbox"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
            />
          </div>

          {/* SAVE */}
          <button
            onClick={() => {
              setStatus("saving");
              const t = toast.loading("Saving...");

              update.mutate(
                { userId, model, temperature, autoSave },
                {
                  onSuccess: () => {
                    setOriginal({ model, temperature, autoSave });
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
            Save Settings
          </button>

        </div>

      </main>
    </div>
  );
}