import type { Analytics } from "../types/analytics";

const API_URL = "http://localhost:3000/api";

export async function getAnalytics(): Promise<Analytics> {
  const response = await fetch(`${API_URL}/analytics`);

  if (!response.ok) {
    throw new Error("Failed to fetch analytics.");
  }

  return response.json();
}
