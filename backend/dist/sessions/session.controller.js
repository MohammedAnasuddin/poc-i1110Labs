"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionController = createSessionController;
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
//# sourceMappingURL=session.controller.js.map