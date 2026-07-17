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