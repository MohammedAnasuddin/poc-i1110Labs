export interface Analytics {
  conversations: number;
  turns: number;
  ordersPlaced: number;
  toolCalls: number;
  successfulToolCalls: number;
  failedToolCalls: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  averageLatency: number;
  successRate: number;
  totalCost: number;
}

export type ConversationAnalytics = {
  id: string;
  sessionId: string;

  promptTokens: number;
  completionTokens: number;
  totalTokens: number;

  latency: number;
  turns: number;
  toolCalls: number;

  startedAt: string;
  endedAt: string;
};
