"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_js_1 = require("./session.controller.js");
const sessionRouter = (0, express_1.Router)();
sessionRouter.post("/", session_controller_js_1.createSessionController);
exports.default = sessionRouter;
//# sourceMappingURL=session.route.js.map