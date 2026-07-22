import { Card } from "@/components/ui/Card";
import { useVoiceRecorder } from "@/hooks/use-voice-recorder";
import { VoiceWave } from "./VoiceWave";
import { useEffect } from "react";
import { VoiceVisualizer } from "./VoiceVisualizer";

import type { VoiceState } from "@/types/voice";

function VoiceLabel({ state }: { state: VoiceState }) {
  switch (state) {
    case "idle":
      return <>Tap to start</>;

    case "listening":
      return <>Listening...</>;

    case "thinking":
      return <>Thinking...</>;

    case "speaking":
      return <>Speaking...</>;

    default:
      return null;
  }
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);

  const remaining = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remaining
    .toString()
    .padStart(2, "0")}`;
}

export function VoiceRecorder({ sessionId }: { sessionId: string }) {
  const { state, duration, startConversation, stopRecording } =
    useVoiceRecorder(sessionId);

  useEffect(() => {
    if (!sessionId) return;

    startConversation();
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="rounded-lg border p-6 text-center text-gray-500">
        Click <strong>Start Conversation</strong> to begin.
      </div>
    );
  }

  const handleClick = () => {
    if (state === "listening") {
      stopRecording();
    }
  };

  return (
    <Card className="px-12 py-14">
      <div className="flex flex-col items-center gap-6">
        {/* Heading */}
        <div className="space-y-3 text-center">
          {/* <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            Pizza Palace AI
          </h1> */}

          <p className="text-base text-[var(--muted)]">
            Voice ordering assistant
          </p>
        </div>

        {/* Voice Button */}
        <button
          type="button"
          onClick={handleClick}
          disabled={state === "thinking" || state === "speaking"}
          className="
            transition-transform
            hover:scale-105
            active:scale-95
            disabled:cursor-not-allowed
          "
        >
          <VoiceVisualizer state={state} />
        </button>

        {/* Timer */}
        <p className="font-mono text-2xl font-semibold text-[var(--foreground)]">
          {formatDuration(duration)}
        </p>

        {/* Audio Wave */}
        <VoiceWave active={state === "listening" || state === "speaking"} />

        {/* Status */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-base font-medium text-[var(--foreground)]">
            <VoiceLabel state={state} />
          </p>

          <p className="max-w-xs text-center text-sm leading-6 text-[var(--muted)]">
            Speak naturally. I'll listen, think, and respond automatically.
          </p>
        </div>
      </div>
    </Card>
  );
}
