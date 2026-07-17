import { api } from "./api";

type ConversationMessage = {
  role: "user" | "assistant" | "tool";
  content: string;
  tool_calls?: unknown;
  tool_call_id?: string;
};

export async function getConversation(
  sessionId: string,
): Promise<ConversationMessage[]> {
  const { data } = await api.get(`/sessions/${sessionId}/messages`);

  return data.messages;
}