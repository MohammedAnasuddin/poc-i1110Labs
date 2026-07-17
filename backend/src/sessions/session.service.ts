import { randomUUID } from "node:crypto";

import { SessionStatus, type Session } from "./session.types.js";
import { SessionNotFoundError } from "../errors/session-not-found.error.js";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
import { MenuService } from "../menu/menu.service.js";

const MAX_HISTORY = 20;
export class SessionService {
  private readonly sessions = new Map<string, Session>();
  constructor(private readonly menuService: MenuService) {}

  createSession(): Session {
    const session: Session = {
      id: randomUUID(),

      status: SessionStatus.ACTIVE,

      cart: {
        items: [],
      },

      analytics: {
        promptTokens: 0,
        completionTokens: 0,
        latency: 0,
        turns: 0,
        toolCalls: 0,
        startedAt: new Date(),
      },

      createdAt: new Date(),

      updatedAt: new Date(),

      messages: [],
    };

    console.log("✅ Session Created:", session.id);

    this.sessions.set(session.id, session);

    return session;
  }

  getSession(sessionId: string): Session {
    const session = this.sessions.get(sessionId);

    if (!session) {
      throw new SessionNotFoundError(sessionId);
    }

    return session;
  }

  hasSession(sessionId: string): boolean {
    return this.sessions.has(sessionId);
  }

  endSession(sessionId: string): Session {
    const session = this.getSession(sessionId);

    console.log("🛑 Ending Session:", sessionId);

    session.status = SessionStatus.TERMINATED;
    session.updatedAt = new Date();

    return session;
  }

  resetSession(sessionId: string): void {
    const session = this.getSession(sessionId);

    session.cart.items = [];
    session.updatedAt = new Date();
  }

  getAllSessions(): Session[] {
    return [...this.sessions.values()];
  }

  appendMessage(sessionId: string, message: ChatCompletionMessageParam): void {
    const session = this.getSession(sessionId);

    session.messages.push(message);

    session.updatedAt = new Date();
    if (session.messages.length > MAX_HISTORY) {
      session.messages.splice(0, session.messages.length - MAX_HISTORY);
    }
  }

  getConversation(sessionId: string): ChatCompletionMessageParam[] {
    return this.getSession(sessionId).messages;
  }

  clearConversation(sessionId: string): void {
    const session = this.getSession(sessionId);

    session.messages = [];
    session.updatedAt = new Date();
  }

  getCart(sessionId: string) {
    const session = this.getSession(sessionId);

    const items = session.cart.items.map((cartItem) => {
      const menuItem = this.menuService.getItemById(cartItem.selection.itemId);

      if (!menuItem) {
        throw new Error(`Menu item ${cartItem.selection.itemId} not found.`);
      }

      return {
        id: cartItem.id,
        itemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: cartItem.selection.quantity,
        modifiers: cartItem.selection.modifiers,
        subtotal: menuItem.price * cartItem.selection.quantity,
      };
    });

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

    return {
      items,
      totalItems,
      subtotal,
      total: subtotal,
    };
  }

  recordTurn(
    sessionId: string,
    promptTokens: number,
    completionTokens: number,
    latency: number,
  ): void {
    const session = this.getSession(sessionId);

    session.analytics.promptTokens += promptTokens;
    session.analytics.completionTokens += completionTokens;
    session.analytics.latency += latency;
    session.analytics.turns++;

    session.updatedAt = new Date();
  }

  recordToolCall(sessionId: string): void {
    const session = this.getSession(sessionId);

    session.analytics.toolCalls++;

    session.updatedAt = new Date();
  }

  getConversationAnalytics(sessionId: string) {
    return this.getSession(sessionId).analytics;
  }
}
