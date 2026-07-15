"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = chatController;
const container_js_1 = require("../../container.js");
async function chatController(req, res, next) {
    try {
        const { sessionId, message } = req.body;
        const response = await container_js_1.aiAgentService.processMessage(sessionId, message);
        res.status(200).json({
            success: true,
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=chat.controller.js.map