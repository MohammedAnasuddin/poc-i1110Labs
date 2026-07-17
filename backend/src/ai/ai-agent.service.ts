import { groqClient, DEFAULT_COMPLETION_OPTIONS } from "./groq.client.js";

import type { AIResponse } from "./conversation.types.js";
import { toolDefinitions } from "../tools/tool-definitions.js";
import { ToolRegistry } from "./tool-registry.js";
import { SessionService } from "../sessions/session.service.js";
import { SYSTEM_PROMPT } from "./system-prompt.js";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
import { analyticsService } from "../container.js";

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

export class AIAgentService {
  constructor(
    private readonly toolRegistry: ToolRegistry,
    private readonly sessionService: SessionService,
  ) {}

  async processMessage(
    sessionId: string,
    userMessage: string,
  ): Promise<AIResponse> {
    this.sessionService.appendMessage(sessionId, {
      role: "user",
      content: userMessage,
    });
    await analyticsService.recordConversation();
    const startedAt = Date.now();

    let messages: ChatCompletionMessageParam[];

    let finalResponse: Awaited<
      ReturnType<typeof groqClient.chat.completions.create>
    > | null = null;

    let iteration = 0;

    while (iteration < MAX_TOOL_ITERATIONS) {
      iteration++;
      messages = [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...this.sessionService.getConversation(sessionId),
      ];
      const response = await groqClient.chat.completions.create({
        ...DEFAULT_COMPLETION_OPTIONS,
        messages,
        tools: toolDefinitions,
      });

      console.log("\n========== LLM RESPONSE ==========");
      console.dir(response.choices[0].message, { depth: null });
      console.log("=================================\n");

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

        let args: Record<string, unknown>;

        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          throw new Error(
            `Invalid tool arguments for ${toolCall.function.name}`,
          );
        }

        const toolArgs: Record<string, unknown> = {
          ...args,
        };

        if (SESSION_TOOLS.has(toolName)) {
          toolArgs.sessionId = sessionId;
        }

        const result = await this.toolRegistry.execute(toolName, toolArgs);

        console.log("\n========== TOOL CALL ==========");
        console.log("Tool:", toolName);

        console.log("Arguments:");
        console.dir(toolArgs, { depth: null });

        console.log("Result:");
        console.dir(result, { depth: null });

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
      throw new Error(
        `Maximum tool iterations (${MAX_TOOL_ITERATIONS}) exceeded.`,
      );
    }

    const latency = Date.now() - startedAt;

    const promptTokens = finalResponse.usage?.prompt_tokens ?? 0;

    const completionTokens = finalResponse.usage?.completion_tokens ?? 0;

    await analyticsService.recordTurn({
      latency,
      promptTokens,
      completionTokens,
      cost: 0,
    });

    this.sessionService.appendMessage(sessionId, {
      role: "assistant",
      content: finalResponse.choices[0]?.message.content ?? "",
    });

    return {
      message: finalResponse.choices[0]?.message.content ?? "",

      promptTokens,

      completionTokens,

      totalTokens: promptTokens + completionTokens,

      latency,
    };
  }
}
