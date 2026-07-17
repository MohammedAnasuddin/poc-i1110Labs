import { api } from "./api";

export async function createSession() {
  const { data } = await api.post("/sessions");

  return data;
}

// session.api.ts

export async function endSession(sessionId: string) {
  await api.post(`/sessions/${sessionId}/end`);
}
