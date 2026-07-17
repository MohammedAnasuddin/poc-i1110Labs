import { Bot, User } from "lucide-react";

type MessageBubbleProps = {
  role: "user" | "assistant";
  message: string;
  time?: string;
};

export function MessageBubble({
  role,
  message,
  time,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : ""
      }`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
          <Bot
            size={18}
            className="text-[var(--accent-foreground)]"
          />
        </div>
      )}

      <div
        className={`max-w-[70%] rounded-[var(--radius-lg)] border px-5 py-4 ${
          isUser
            ? "border-transparent bg-[var(--primary)] text-white"
            : "border-[var(--border)] bg-[var(--surface)]"
        }`}
      >
        <p className="text-sm leading-7">
          {message}
        </p>

        {time && (
          <p
            className={`mt-3 text-xs ${
              isUser
                ? "text-white/70"
                : "text-[var(--muted)]"
            }`}
          >
            {time}
          </p>
        )}
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]">
          <User size={18} className="text-white" />
        </div>
      )}
    </div>
  );
}