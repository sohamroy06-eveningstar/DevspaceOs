"use client";

import Link from "next/link";
import { LayoutDashboard, User, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-full">

      {/* Top */}
      <div>
        <h1 className="font-semibold text-lg mb-8">DevspaceOs</h1>

        <nav className="space-y-3">

          {/* Dashboard */}
          <Link href="/dashboard">
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer text-black hover:text-black hover:bg-gray-100">
              <LayoutDashboard size={18} />
              Dashboard
            </div>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer text-black hover:text-black hover:bg-gray-100">
              <User size={18} />
              Profile
            </div>
          </Link>

          {/* Settings */}
          <Link href="/settings">
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer text-black hover:text-black hover:bg-gray-100">
              <Settings size={18} />
              Settings
            </div>
          </Link>

        </nav>
      </div>

      {/* Bottom */}
      <div className="text-sm text-gray-400">
        © 2026 DevspaceOs
      </div>
    </div>
  );
}