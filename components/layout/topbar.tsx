"use client";

import { Menu, Plus } from "lucide-react";

export default function Topbar({
  onMenuClick,
  name,
  setName,
  onCreate,
}: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold text-white">
          Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <input
          placeholder="New project..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 md:w-64 px-3 py-2 rounded-lg text-black bg-white border outline-none"
        />

        <button
          onClick={onCreate}
          className="flex items-center justify-center gap-1 bg-white text-black px-4 py-2 rounded-lg"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
}