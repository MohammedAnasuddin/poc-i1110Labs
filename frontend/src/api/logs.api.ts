import { api } from "@/api/api";
import type { AgentLog } from "../types/AgentLog";

export async function getLogs(): Promise<AgentLog[]> {
  const { data } = await api.get<AgentLog[]>("/analytics/logs");
  return data;
}
