import type { Analytics, ConversationAnalytics } from "../types/analytics";

const API_URL = "http://localhost:3000/api";

export async function getAnalytics(): Promise<Analytics> {
  const response = await fetch(`${API_URL}/analytics`);

  if (!response.ok) {
    throw new Error("Failed to fetch analytics.");
  }

  return response.json();
}

export async function getConversationAnalytics(): Promise<
  ConversationAnalytics[]
> {
  const response = await fetch(`${API_URL}/analytics/conversations`);

  if (!response.ok) {
    throw new Error("Failed to fetch conversation analytics.");
  }

  return response.json();
}
