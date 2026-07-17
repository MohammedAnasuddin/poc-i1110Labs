"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionController = createSessionController;
exports.getConversationController = getConversationController;
exports.getCartController = getCartController;
const container_1 = require("../container");
function createSessionController(_req, res, next) {
    try {
        const session = container_1.sessionService.createSession();
        res.status(201).json({
            sessionId: session.id,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getConversationController(req, res) {
    const { sessionId } = req.params;
    const messages = container_1.sessionService.getConversation(sessionId);
    res.json({
        messages,
    });
}
// controllers/session.controller.ts
async function getCartController(req, res) {
    const { sessionId } = req.params;
    const cart = await container_1.sessionService.getCart(sessionId);
    res.json(cart);
}
//# sourceMappingURL=session.controller.js.map