import { api } from "./api";

export async function createSession() {
  const { data } = await api.post("/sessions");

  return data;
}
