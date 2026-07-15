import type { AIResponse } from "./conversation.types.js";
import { ToolRegistry } from "./tool-registry.js";
import { SessionService } from "../sessions/session.service.js";
export declare class AIAgentService {
    private readonly toolRegistry;
    private readonly sessionService;
    constructor(toolRegistry: ToolRegistry, sessionService: SessionService);
    processMessage(sessionId: string, userMessage: string): Promise<AIResponse>;
}
