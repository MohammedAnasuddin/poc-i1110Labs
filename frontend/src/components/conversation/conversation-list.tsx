import { Card } from "@/components/ui/Card";

import { useConversation } from "@/hooks/use-conversation";

import { MessageBubble } from "./MessageBubble";
import { useRef, useState } from "react";

type ConversationListProps = {
  sessionId: string;
};

// function handleScroll() {
//   const container = containerRef.current;

//   if (!container) return;

//   const distance =
//     container.scrollHeight - container.scrollTop - container.clientHeight;

//   setShowJumpButton(distance > 120);
// }

export function ConversationList({ sessionId }: ConversationListProps) {
  const [showJumpButton, setShowJumpButton] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messages = useConversation(sessionId);

  const visibleMessages = messages
    .filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        message.content.trim() !== "",
    )
    .map((message, index) => ({
      id: `${message.role}-${index}`,
      ...message,
    }));

  function handleScroll() {
    const container = containerRef.current;

    if (!container) return;

    const distance =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    setShowJumpButton(distance > 120);
  }

  return (
    <Card>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold">Conversation</h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Your conversation appears here.
          </p>
        </div>

        <div className="max-h-[420px]  overflow-y-auto pr-2 space-y-6">
          {visibleMessages.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Start speaking to begin your conversation.
            </p>
          ) : (
            visibleMessages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role === "tool" ? "assistant" : message.role}
                message={message.content}
              />
            ))
          )}

          {/* <TypingIndicator /> */}
          {showJumpButton && (
            <button
              onClick={() =>
                bottomRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="
      sticky
      bottom-4
      left-1/2
      mx-auto
      block
      rounded-full
      bg-[var(--primary)]
      px-4
      py-2
      text-sm
      font-medium
      text-white
      shadow-lg
      transition
      hover:bg-[var(--primary-hover)]
    "
            >
              ↓ Jump to latest
            </button>
          )}

          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="relative max-h-[420px] space-y-6 overflow-y-auto pr-2"
          ></div>
          {showJumpButton && (
            <button
              onClick={() =>
                bottomRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="
      sticky
      bottom-4
      left-1/2
      mx-auto
      block
      rounded-full
      bg-[var(--primary)]
      px-4
      py-2
      text-sm
      font-medium
      text-white
      shadow-lg
      transition
      hover:bg-[var(--primary-hover)]
    "
            >
              ↓ Jump to latest
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
