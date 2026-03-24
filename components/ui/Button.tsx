"use client";

import { motion } from "framer-motion";

export default function Button({ children, ...props }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
      {...props}
    >
      {children}
    </motion.button>
  );
}