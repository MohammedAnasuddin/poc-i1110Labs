import { LoaderCircle, Mic, Volume2 } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { useVoiceRecorder } from "@/hooks/use-voice-recorder";
import { VoiceWave } from "./VoiceWave";

import type { VoiceState } from "@/types/voice";

function VoiceIcon({ state }: { state: VoiceState }) {
  switch (state) {
    case "idle":
      return <Mic size={46} />;

    case "listening":
      return <Mic size={46} className="animate-pulse" />;

    case "thinking":
      return <LoaderCircle size={46} className="animate-spin" />;

    case "speaking":
      return <Volume2 size={46} className="animate-pulse" />;

    default:
      return <Mic size={46} />;
  }
}

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

function StatusDot({ state }: { state: VoiceState }) {
  return (
    <span
      className={`
        h-3
        w-3
        rounded-full
        transition-all
        ${
          state === "listening"
            ? "bg-red-500 animate-pulse"
            : state === "thinking"
              ? "bg-amber-500"
              : state === "speaking"
                ? "bg-green-500 animate-pulse"
                : "bg-[var(--muted-foreground)]"
        }
      `}
    />
  );
}
function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);

  const remaining = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remaining
    .toString()
    .padStart(2, "0")}`;
}

export function VoiceRecorder({ sessionId }: { sessionId: string }) {
  const { state, duration, startRecording, stopRecording } =
    useVoiceRecorder(sessionId);
  if (!sessionId) {
    return (
      <div className="rounded-lg border p-6 text-center text-gray-500">
        Click <strong>Start Conversation</strong> to begin.
      </div>
    );
  }

  const handleClick = () => {
    if (state === "idle") {
      startRecording();
      return;
    }

    if (state === "listening") {
      stopRecording();
    }
  };

  return (
    <Card className="px-12 py-14">
      <div className="flex flex-col items-center gap-8">
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
          aria-label="Voice conversation"
          onClick={handleClick}
          disabled={state === "thinking" || state === "speaking"}
          className="
            relative
            flex
            h-32
            w-32
            items-center
            justify-center
            rounded-full
            bg-[var(--primary)]
            text-white
            shadow-md
            transition-all
            duration-200
            hover:scale-105
            hover:bg-[var(--primary-hover)]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-80
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-[var(--ring)]
          "
        >
          <VoiceIcon state={state} />
        </button>

        {/* Timer */}
        <p className="font-mono text-2xl font-semibold text-[var(--foreground)]">
          {formatDuration(duration)}
        </p>

        {/* Audio Wave */}
        <VoiceWave active={state === "listening" || state === "speaking"} />

        {/* Status */}
        <div className="flex flex-col items-center gap-3">
          <StatusDot state={state} />

          <p className="text-base font-medium text-[var(--foreground)]">
            <VoiceLabel state={state} />
          </p>

          <p className="text-sm text-[var(--muted)]">
            Speak naturally. I'll handle the rest.
          </p>
        </div>
      </div>
    </Card>
  );
}
