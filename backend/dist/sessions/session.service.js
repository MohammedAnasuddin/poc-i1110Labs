"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const node_crypto_1 = require("node:crypto");
const session_types_js_1 = require("./session.types.js");
const session_not_found_error_js_1 = require("../errors/session-not-found.error.js");
const MAX_HISTORY = 20;
class SessionService {
    sessions = new Map();
    createSession() {
        const session = {
            id: (0, node_crypto_1.randomUUID)(),
            status: session_types_js_1.SessionStatus.ACTIVE,
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
    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new session_not_found_error_js_1.SessionNotFoundError(sessionId);
        }
        return session;
    }
    hasSession(sessionId) {
        return this.sessions.has(sessionId);
    }
    endSession(sessionId) {
        const session = this.getSession(sessionId);
        session.status = session_types_js_1.SessionStatus.TERMINATED;
        session.updatedAt = new Date();
    }
    resetSession(sessionId) {
        const session = this.getSession(sessionId);
        session.cart.items = [];
        session.updatedAt = new Date();
    }
    getAllSessions() {
        return [...this.sessions.values()];
    }
    appendMessage(sessionId, message) {
        const session = this.getSession(sessionId);
        session.messages.push(message);
        session.updatedAt = new Date();
        if (session.messages.length > MAX_HISTORY) {
            session.messages.splice(0, session.messages.length - MAX_HISTORY);
        }
    }
    getConversation(sessionId) {
        return this.getSession(sessionId).messages;
    }
    clearConversation(sessionId) {
        const session = this.getSession(sessionId);
        session.messages = [];
        session.updatedAt = new Date();
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map