"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const node_crypto_1 = require("node:crypto");
const session_types_js_1 = require("./session.types.js");
const session_not_found_error_js_1 = require("../errors/session-not-found.error.js");
const MAX_HISTORY = 20;
class SessionService {
    menuService;
    sessions = new Map();
    constructor(menuService) {
        this.menuService = menuService;
    }
    createSession() {
        const session = {
            id: (0, node_crypto_1.randomUUID)(),
            status: session_types_js_1.SessionStatus.ACTIVE,
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
        console.log("🛑 Ending Session:", sessionId);
        session.status = session_types_js_1.SessionStatus.TERMINATED;
        session.updatedAt = new Date();
        return session;
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
    getCart(sessionId) {
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
                price: menuItem.basePrice,
                quantity: cartItem.selection.quantity,
                modifiers: cartItem.selection.modifiers,
                subtotal: menuItem.basePrice * cartItem.selection.quantity,
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
    recordTurn(sessionId, promptTokens, completionTokens, latency) {
        const session = this.getSession(sessionId);
        session.analytics.promptTokens += promptTokens;
        session.analytics.completionTokens += completionTokens;
        session.analytics.latency += latency;
        session.analytics.turns++;
        session.updatedAt = new Date();
    }
    recordToolCall(sessionId) {
        const session = this.getSession(sessionId);
        session.analytics.toolCalls++;
        session.updatedAt = new Date();
    }
    getConversationAnalytics(sessionId) {
        return this.getSession(sessionId).analytics;
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map