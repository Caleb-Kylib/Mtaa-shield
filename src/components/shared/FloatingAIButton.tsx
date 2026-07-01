"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FloatingAIButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <Link href="/ai-assistant">
        <motion.button
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl shadow-emerald-900/30 transition-colors h-14 pl-4 pr-5"
        >
          <div className="relative">
            <Bot size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-emerald-600" />
          </div>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
            className="text-sm font-semibold whitespace-nowrap overflow-hidden"
          >
            AI Advisor
          </motion.span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
