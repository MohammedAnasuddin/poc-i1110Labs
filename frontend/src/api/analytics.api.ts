import { api } from "@/api/api";
import type { Analytics, ConversationAnalytics } from "../types/analytics";

export async function getAnalytics(): Promise<Analytics> {
  const { data } = await api.get<Analytics>("/analytics");
  return data;
}

export async function getConversationAnalytics(): Promise<
  ConversationAnalytics[]
> {
  const { data } = await api.get<ConversationAnalytics[]>(
    "/analytics/conversations",
  );

  return data;
}
