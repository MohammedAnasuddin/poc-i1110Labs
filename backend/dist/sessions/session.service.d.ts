import { type Session } from "./session.types.js";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
import { MenuService } from "../menu/menu.service.js";
export declare class SessionService {
    private readonly menuService;
    private readonly sessions;
    constructor(menuService: MenuService);
    createSession(): Session;
    getSession(sessionId: string): Session;
    hasSession(sessionId: string): boolean;
    endSession(sessionId: string): Session;
    resetSession(sessionId: string): void;
    getAllSessions(): Session[];
    appendMessage(sessionId: string, message: ChatCompletionMessageParam): void;
    getConversation(sessionId: string): ChatCompletionMessageParam[];
    clearConversation(sessionId: string): void;
    getCart(sessionId: string): {
        items: {
            id: string;
            itemId: string;
            name: string;
            price: number;
            quantity: number;
            modifiers: import("../menu/menu.types.js").SelectedModifier[];
            subtotal: number;
        }[];
        totalItems: number;
        subtotal: number;
        total: number;
    };
    recordTurn(sessionId: string, promptTokens: number, completionTokens: number, latency: number): void;
    recordToolCall(sessionId: string): void;
    getConversationAnalytics(sessionId: string): {
        promptTokens: number;
        completionTokens: number;
        latency: number;
        turns: number;
        toolCalls: number;
        startedAt: Date;
    };
}
