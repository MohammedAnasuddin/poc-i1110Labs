import { randomUUID } from "node:crypto";

import { SessionStatus, type Session } from "./session.types.js";
import { SessionNotFoundError } from "../errors/session-not-found.error.js";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const MAX_HISTORY = 20;
export class SessionService {
  private readonly sessions = new Map<string, Session>();

  createSession(): Session {
    const session: Session = {
      id: randomUUID(),

      status: SessionStatus.ACTIVE,

      cart: {
        items: [],
      },

      createdAt: new Date(),

      updatedAt: new Date(),
      messages: [],
    };

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

  endSession(sessionId: string): void {
    const session = this.getSession(sessionId);

    session.status = SessionStatus.TERMINATED;
    session.updatedAt = new Date();
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
}
