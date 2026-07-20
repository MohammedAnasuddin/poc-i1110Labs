import { PrismaClient, Prisma } from "../generated/prisma/client";

import type { AnalyticsResponse, TurnMetrics } from "./analytics.types.js";
import type { Session } from "../sessions/session.types.js";

export class AnalyticsService {
  constructor(private readonly prisma: PrismaClient) {}

  private async update(data: Prisma.AnalyticsUpdateInput) {
    return this.prisma.analytics.update({
      where: {
        id: 1,
      },
      data,
    });
  }

  async recordConversation() {
    await this.update({
      conversations: {
        increment: 1,
      },
    });
  }

  async recordTurn(turn: TurnMetrics) {
    await this.update({
      turns: {
        increment: 1,
      },

      promptTokens: {
        increment: turn.promptTokens,
      },

      completionTokens: {
        increment: turn.completionTokens,
      },

      totalLatency: {
        increment: turn.latency,
      },

      totalCost: {
        increment: turn.cost,
      },
    });
  }

  async recordToolCall(success: boolean) {
    await this.update({
      toolCalls: {
        increment: 1,
      },

      successfulToolCalls: success
        ? {
            increment: 1,
          }
        : undefined,

      failedToolCalls: !success
        ? {
            increment: 1,
          }
        : undefined,
    });
  }

  async recordOrder() {
    await this.update({
      ordersPlaced: {
        increment: 1,
      },
    });
  }

  async getAnalytics(): Promise<AnalyticsResponse> {
    const analytics = await this.prisma.analytics.findUnique({
      where: {
        id: 1,
      },
    });

    if (!analytics) {
      throw new Error("Analytics record not found.");
    }

    return {
      conversations: analytics.conversations,

      turns: analytics.turns,

      ordersPlaced: analytics.ordersPlaced,

      toolCalls: analytics.toolCalls,

      successfulToolCalls: analytics.successfulToolCalls,

      failedToolCalls: analytics.failedToolCalls,

      promptTokens: analytics.promptTokens,

      completionTokens: analytics.completionTokens,

      totalCost: analytics.totalCost,

      totalTokens: analytics.promptTokens + analytics.completionTokens,

      averageLatency:
        analytics.turns === 0 ? 0 : analytics.totalLatency / analytics.turns,

      successRate:
        analytics.toolCalls === 0
          ? 100
          : (analytics.successfulToolCalls / analytics.toolCalls) * 100,
    };
  }

  async recordConversationEnd(session: Session): Promise<void> {
    if (session.analytics.turns === 0) {
      return;
    }
    await this.prisma.conversationAnalytics.create({
      data: {
        sessionId: session.id,

        promptTokens: session.analytics.promptTokens,

        completionTokens: session.analytics.completionTokens,

        totalTokens:
          session.analytics.promptTokens + session.analytics.completionTokens,

        latency: session.analytics.latency,

        turns: session.analytics.turns,

        toolCalls: session.analytics.toolCalls,

        startedAt: session.analytics.startedAt,

        endedAt: new Date(),
      },
    });
  }

  async getConversationAnalytics() {
    return this.prisma.conversationAnalytics.findMany({
      orderBy: {
        startedAt: "asc",
      },
    });
  }

  async log(data: Prisma.AgentLogCreateInput) {
    return this.prisma.agentLog.create({
      data,
    });
  }

  async getLogs() {
    return this.prisma.agentLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateLogLatency(id: string, latency: number) {
    return this.prisma.agentLog.update({
      where: { id },
      data: {
        latency,
      },
    });
  }
}
