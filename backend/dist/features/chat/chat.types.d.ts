import type { AIResponse } from "../../ai/conversation.types.js";
export interface ChatRequest {
    sessionId: string;
    message: string;
}
export interface ChatResponse {
    success: boolean;
    data: AIResponse;
}
