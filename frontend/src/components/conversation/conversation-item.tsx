import type { ConversationMessage } from "@/types/conversation";

type Props = {
  message: ConversationMessage;
};

export function ConversationItem({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-subtlest)]">
        {isUser ? "You" : "Assistant"}
      </p>

      <p className="text-[15px] leading-7 text-[var(--text)]">{message.text}</p>
    </div>
  );
}
