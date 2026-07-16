import { LoaderCircle, Mic, Volume2 } from "lucide-react";
import { useState } from "react";
import { useVoiceRecorder } from "@/hooks/use-voice-recorder";

import type { VoiceState } from "../../types/voice";
import { VoiceStatus } from "./voice-status";

function VoiceIcon({ state }: { state: VoiceState }) {
  switch (state) {
    case "idle":
      return <Mic size={44} />;

    case "listening":
      return <Mic size={44} className="animate-pulse" />;

    case "thinking":
      return <LoaderCircle size={44} className="animate-spin" />;

    case "speaking":
      return <Volume2 size={44} className="animate-pulse" />;
  }
}

export function VoiceRecorder({ sessionId }: { sessionId: string }) {
  const { state, startRecording, stopRecording } = useVoiceRecorder(sessionId);

  return (
    <section
      className="
        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        px-12
        py-12
        shadow-[var(--shadow-raised)]
      "
    >
      <div className="flex flex-col items-center gap-8">
        <div className="space-y-2 text-center">
          <h1
            className="
              text-3xl
              font-semibold
              tracking-tight
              text-[var(--text)]
            "
          >
            Pizza Palace AI
          </h1>

          <p
            className="
              text-base
              text-[var(--text-subtle)]
            "
          >
            Voice Ordering Assistant
          </p>
        </div>

        <button
          type="button"
          aria-label="Start voice conversation"
          onClick={() => {
            if (state === "idle") {
              startRecording();
            } else if (state === "listening") {
              stopRecording();
            }
          }}
          className="
    flex
    h-30
    w-30
    items-center
    justify-center
    rounded-full
    bg-[var(--brand)]
    text-white
    shadow-[var(--shadow-raised)]
    transition-all
    duration-200
    hover:scale-105
    hover:bg-[var(--brand-hover)]
    active:scale-95
    focus:outline-none
    focus:ring-4
    focus:ring-[var(--focus)]
  "
        >
          <VoiceIcon state={state} />
        </button>

        <VoiceStatus state={state} />
      </div>
    </section>
  );
}
