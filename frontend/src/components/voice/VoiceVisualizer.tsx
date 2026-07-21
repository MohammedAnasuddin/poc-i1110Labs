import { Mic } from "lucide-react";
import { motion } from "framer-motion";

import type { VoiceState } from "@/types/voice";

export function VoiceVisualizer({ state }: { state: VoiceState }) {
  if (state === "thinking") {
    return (
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
        }}
        className="flex h-32 w-32 items-center justify-center rounded-full bg-amber-500/20"
      >
        <Mic className="h-10 w-10 text-amber-500" />
      </motion.div>
    );
  }

  if (state === "speaking") {
    return (
      <div className="relative flex h-32 w-32 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-28 w-28 rounded-full bg-emerald-500/20 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.2,
            }}
          />
        ))}

        <Mic className="relative z-10 h-10 w-10 text-emerald-500" />
      </div>
    );
  }

  if (state === "listening") {
    return (
      <div className="flex h-32 items-end gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-full bg-[var(--primary)]"
            animate={{
              height: [12, 48, 18, 36, 20],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.7,
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[var(--primary)] text-white">
      <Mic className="h-10 w-10" />
    </div>
  );
}
