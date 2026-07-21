import type { Cart } from "../cart/cart.types.js";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
export declare enum SessionStatus {
    ACTIVE = "ACTIVE",
    TERMINATED = "TERMINATED"
}
export interface Session {
    id: string;
    status: SessionStatus;
    cart: Cart;
    createdAt: Date;
    updatedAt: Date;
    messages: ChatCompletionMessageParam[];
    analytics: {
        promptTokens: number;
        completionTokens: number;
        latency: number;
        turns: number;
        toolCalls: number;
        startedAt: Date;
    };
}
export interface CreateSessionResponse {
    sessionId: string;
}
