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
    endSession(sessionId: string): void;
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
            price: any;
            quantity: number;
            modifiers: import("../menu/menu.types.js").SelectedModifier[];
            subtotal: number;
        }[];
        totalItems: number;
        subtotal: number;
        total: number;
    };
}
