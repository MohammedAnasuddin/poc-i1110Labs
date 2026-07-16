"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAgentService = void 0;
const groq_client_js_1 = require("./groq.client.js");
const tool_definitions_js_1 = require("../tools/tool-definitions.js");
const system_prompt_js_1 = require("./system-prompt.js");
const SESSION_TOOLS = new Set([
    "view_cart",
    "add_to_cart",
    "remove_from_cart",
    "update_quantity",
    "clear_cart",
    "place_order",
    "get_orders",
]);
const MAX_TOOL_ITERATIONS = 5;
class AIAgentService {
    toolRegistry;
    sessionService;
    constructor(toolRegistry, sessionService) {
        this.toolRegistry = toolRegistry;
        this.sessionService = sessionService;
    }
    async processMessage(sessionId, userMessage) {
        this.sessionService.appendMessage(sessionId, {
            role: "user",
            content: userMessage,
        });
        const startedAt = Date.now();
        let messages;
        let finalResponse = null;
        let iteration = 0;
        while (iteration < MAX_TOOL_ITERATIONS) {
            iteration++;
            messages = [
                {
                    role: "system",
                    content: system_prompt_js_1.SYSTEM_PROMPT,
                },
                ...this.sessionService.getConversation(sessionId),
            ];
            const response = await groq_client_js_1.groqClient.chat.completions.create({
                ...groq_client_js_1.DEFAULT_COMPLETION_OPTIONS,
                messages,
                tools: tool_definitions_js_1.toolDefinitions,
            });
            const assistantMessage = response.choices[0]?.message;
            if (!assistantMessage) {
                throw new Error("No response received.");
            }
            if (!assistantMessage.tool_calls?.length) {
                finalResponse = response;
                break;
            }
            this.sessionService.appendMessage(sessionId, {
                role: "assistant",
                content: assistantMessage.content ?? "",
                tool_calls: assistantMessage.tool_calls,
            });
            // Otherwise...
            // Execute every tool
            for (const toolCall of assistantMessage.tool_calls) {
                const toolName = toolCall.function.name;
                let args;
                try {
                    args = JSON.parse(toolCall.function.arguments);
                }
                catch {
                    throw new Error(`Invalid tool arguments for ${toolCall.function.name}`);
                }
                const toolArgs = {
                    ...args,
                };
                if (SESSION_TOOLS.has(toolName)) {
                    toolArgs.sessionId = sessionId;
                }
                const result = await this.toolRegistry.execute(toolName, toolArgs);
                console.log("\n========== TOOL CALL ==========");
                console.log(toolName);
                console.dir(toolArgs, { depth: null });
                console.log("===============================\n");
                this.sessionService.appendMessage(sessionId, {
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(result),
                });
            }
            // Append tool results
            // Continue loop
        }
        if (!finalResponse) {
            throw new Error(`Maximum tool iterations (${MAX_TOOL_ITERATIONS}) exceeded.`);
        }
        const latency = Date.now() - startedAt;
        this.sessionService.appendMessage(sessionId, {
            role: "assistant",
            content: finalResponse.choices[0]?.message.content ?? "",
        });
        return {
            message: finalResponse.choices[0]?.message.content ?? "",
            promptTokens: finalResponse.usage?.prompt_tokens ?? 0,
            latency,
            completionTokens: finalResponse.usage?.completion_tokens ?? 0,
            totalTokens: finalResponse.usage?.total_tokens ?? 0,
        };
    }
}
exports.AIAgentService = AIAgentService;
//# sourceMappingURL=ai-agent.service.js.map