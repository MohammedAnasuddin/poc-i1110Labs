import { type Session } from "./session.types.js";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
export declare class SessionService {
    private readonly sessions;
    createSession(): Session;
    getSession(sessionId: string): Session;
    hasSession(sessionId: string): boolean;
    endSession(sessionId: string): void;
    resetSession(sessionId: string): void;
    getAllSessions(): Session[];
    appendMessage(sessionId: string, message: ChatCompletionMessageParam): void;
    getConversation(sessionId: string): ChatCompletionMessageParam[];
    clearConversation(sessionId: string): void;
}
