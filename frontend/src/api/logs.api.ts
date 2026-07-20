// api/logs.api.ts

import type { AgentLog } from "../types/AgentLog";

const API_URL = "http://localhost:3000/api";

export async function getLogs(): Promise<AgentLog[]> {
  const response = await fetch(`${API_URL}/analytics/logs`);

  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }

  return response.json();
}