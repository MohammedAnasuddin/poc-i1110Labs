import { useEffect, useState } from "react";

import { getConversation } from "@/api/conversation.api";

type ConversationMessage = {
  role: "user" | "assistant" | "tool";
  content: string;
  tool_calls?: unknown;
  tool_call_id?: string;
};

export function useConversation(sessionId: string) {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);

  useEffect(() => {
    if (!sessionId) {
      setMessages([]);
      return;
    }

    async function load() {
      try {
        const messages = await getConversation(sessionId);
        setMessages(messages);
      } catch (error) {
        console.error(error);
      }
    }

    load();

    const interval = setInterval(load, 1000);

    return () => clearInterval(interval);
  }, [sessionId]);

  return messages;
}
