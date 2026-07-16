import { ConversationItem } from "./conversation-item";
import type { ConversationMessage } from "@/types/conversation";

const messages: ConversationMessage[] = [
  {
    id: "1",
    role: "user",
    text: "I'd like one large margherita pizza.",
  },
  {
    id: "2",
    role: "assistant",
    text: "Certainly! I've added one large margherita pizza to your cart.",
  },
];

export function ConversationList() {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-raised)]">
      <header className="border-b border-[var(--border)] px-6 py-4">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Conversation
        </h2>
      </header>

      <div className="space-y-8 p-6">
        {messages.map((message) => (
          <ConversationItem
            key={message.id}
            message={message}
          />
        ))}
      </div>
    </section>
  );
}