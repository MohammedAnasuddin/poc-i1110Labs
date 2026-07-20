export type AgentLog = {
  id: string;

  sessionId: string;

  type: "USER" | "LLM" | "TOOL" | "ORDER" | "ERROR";

  toolName?: string;

  success?: boolean;

  latency?: number;

  promptTokens?: number;

  completionTokens?: number;

  toolArguments?: unknown;

  toolResponse?: unknown;

  message?: string;

  createdAt: string;
};
