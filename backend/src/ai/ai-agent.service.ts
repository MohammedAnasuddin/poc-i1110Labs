import { groqClient, DEFAULT_COMPLETION_OPTIONS } from "./groq.client.js";

import type { AIResponse } from "./conversation.types.js";
import { toolDefinitions } from "../tools/tool-definitions.js";
import { ToolRegistry } from "./tool-registry.js";
import { SessionService } from "../sessions/session.service.js";
import { SYSTEM_PROMPT } from "./system-prompt.js";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
import { analyticsService } from "../container.js";
import { Prisma } from "../generated/prisma/client";

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
    try {
      // ================= USER =================

      this.sessionService.appendMessage(sessionId, {
        role: "user",
        content: userMessage,
      });

      await analyticsService.recordConversation();

      await analyticsService.log({
        sessionId,
        type: "USER",
        message: userMessage,
      });

      const startedAt = Date.now();

      let messages: ChatCompletionMessageParam[];

      let finalResponse: Awaited<
        ReturnType<typeof groqClient.chat.completions.create>
      > | null = null;

      let iteration = 0;
      let llmLogId: any = null;

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

        const choice = response.choices[0];

        if (!choice) {
          throw new Error("No LLM choice returned.");
        }

        console.log("\n========== LLM RESPONSE ==========");
        console.dir(choice.message, { depth: null });
        console.log("=================================\n");

        const assistantMessage = choice.message;

        if (!assistantMessage) {
          throw new Error("No response received.");
        }

        // ================= LLM =================

        const log = await analyticsService.log({
          sessionId,
          type: "LLM",
          message: assistantMessage.content ?? "",
          promptTokens: response.usage?.prompt_tokens ?? null,
          completionTokens: response.usage?.completion_tokens ?? null,
        });

        llmLogId = log.id;

        if (!assistantMessage.tool_calls?.length) {
          finalResponse = response;
          break;
        }

        this.sessionService.appendMessage(sessionId, {
          role: "assistant",
          content: assistantMessage.content ?? "",
          tool_calls: assistantMessage.tool_calls,
        });

        // ================= TOOLS =================

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

          this.sessionService.recordToolCall(sessionId);

          await analyticsService.log({
            sessionId,

            type: "TOOL",

            toolName,

            toolArguments: toolArgs as Prisma.InputJsonValue,

            toolResponse: JSON.parse(
              JSON.stringify(result),
            ) as Prisma.InputJsonValue,

            success: true,
          });

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
      }

      if (!finalResponse) {
        throw new Error(
          `Maximum tool iterations (${MAX_TOOL_ITERATIONS}) exceeded.`,
        );
      }

      const latency = Date.now() - startedAt;

      const promptTokens = finalResponse.usage?.prompt_tokens ?? 0;

      const completionTokens = finalResponse.usage?.completion_tokens ?? 0;

      this.sessionService.recordTurn(
        sessionId,
        promptTokens,
        completionTokens,
        latency,
      );

      await analyticsService.recordTurn({
        latency,
        promptTokens,
        completionTokens,
        cost: 0,
      });

      if (llmLogId !== null) {
        await analyticsService.updateLogLatency(llmLogId, latency);
      }

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
    } catch (error) {
      await analyticsService.log({
        sessionId,

        type: "ERROR",

        message: error instanceof Error ? error.message : String(error),

        success: false,
      });

      throw error;
    }
  }
}
