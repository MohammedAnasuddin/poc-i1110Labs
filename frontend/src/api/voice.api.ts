import { api } from "./api";

export async function sendVoice(sessionId: string, audio: Blob) {
  const formData = new FormData();

  formData.append("audio", audio, "recording.webm");

  formData.append("sessionId", sessionId);

  const response = await api.post("/voice/chat", formData, {
    responseType: "blob",
  });

  return response.data;
}
