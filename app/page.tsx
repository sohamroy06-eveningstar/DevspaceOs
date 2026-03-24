"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* 🔥 Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              animate={{
                x: [0, Math.random() * 300 - 150],
                y: [0, Math.random() * 300 - 150],
              }}
              transition={{
                duration: 6 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 🔝 Navbar */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-white/10">
        <h1 className="text-base sm:text-lg font-semibold">DevSpaceOS</h1>

        <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm items-center">
          <Link href="/login" className="hover:underline">
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-white text-black px-3 sm:px-4 py-1.5 rounded-full"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* 🚀 Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 mt-16 sm:mt-20">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-6xl font-bold leading-tight"
        >
          AI-Powered Developer Workspace
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-md sm:max-w-xl text-xs sm:text-sm md:text-base text-white/70"
        >
          Build, manage, and debug projects faster with your personal AI assistant.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full sm:w-auto"
        >
          <Link
            href="/login"
            className="bg-white text-black px-6 py-2 rounded-full text-sm text-center"
          >
            Start Building
          </Link>

          <Link
            href="/assistant"
            className="border border-white/20 px-6 py-2 rounded-full text-sm text-center"
          >
            Try AI
          </Link>
        </motion.div>

      </section>

      {/* ⚡ Features */}
      <section className="mt-16 sm:mt-24 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">

        {[
          {
            title: "AI Assistant",
            desc: "Generate, debug and explain code instantly.",
          },
          {
            title: "Project Manager",
            desc: "Organize and track all your development work.",
          },
          {
            title: "Modern UI",
            desc: "Clean, minimal interface built for focus.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="border border-white/10 rounded-xl p-5 sm:p-6 bg-white/5 backdrop-blur"
          >
            <h3 className="text-base sm:text-lg font-semibold">{f.title}</h3>
            <p className="text-xs sm:text-sm text-white/70 mt-2">{f.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* 🧠 Mongo-style visual */}
      <section className="mt-16 sm:mt-24 px-4 sm:px-6 text-center">

        <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold">
          Structured like a database. Fast like your mind.
        </h2>

        <p className="text-white/60 mt-3 text-xs sm:text-sm">
          Inspired by document databases — flexible, scalable, powerful.
        </p>

        <div className="mt-8 sm:mt-10 flex justify-center gap-4 sm:gap-6 flex-wrap">

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
              }}
              className="w-14 h-14 sm:w-16 sm:h-16 border border-white/20 rounded-lg flex items-center justify-center text-[10px] sm:text-xs"
            >
              Doc {i + 1}
            </motion.div>
          ))}

        </div>
      </section>

      {/* 📌 Footer */}
      <footer className="mt-16 sm:mt-24 text-center text-[10px] sm:text-xs text-white/40 pb-6">
        © 2026 DevSpaceOS — Built for developers
      </footer>

    </div>
  );
}