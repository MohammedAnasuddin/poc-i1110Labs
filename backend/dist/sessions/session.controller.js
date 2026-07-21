"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionController = createSessionController;
exports.getConversationController = getConversationController;
exports.getCartController = getCartController;
exports.endSessionController = endSessionController;
const container_1 = require("../container");
const container_2 = require("../container");
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
    const sessionId = req.params.sessionId;
    if (typeof sessionId !== "string") {
        return res.status(400).json({
            error: "Session id required",
        });
    }
    const messages = container_1.sessionService.getConversation(sessionId);
    return res.json({
        messages,
    });
}
// controllers/session.controller.ts
async function getCartController(req, res) {
    const sessionId = req.params.sessionId;
    if (typeof sessionId !== "string") {
        return res.status(400).json({
            error: "Session id required",
        });
    }
    const cart = container_1.cartService.getCart(sessionId);
    return res.json(cart);
}
async function endSessionController(req, res, next) {
    try {
        const sessionId = req.params.sessionId;
        if (typeof sessionId !== "string") {
            res.status(400).json({
                error: "Session id required",
            });
            return;
        }
        const session = container_1.sessionService.endSession(sessionId);
        console.log("POST /sessions/:id/end", sessionId);
        await container_2.analyticsService.recordConversationEnd(session);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=session.controller.js.map