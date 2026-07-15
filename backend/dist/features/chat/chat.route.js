"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_js_1 = require("./chat.controller.js");
const chatRouter = (0, express_1.Router)();
chatRouter.post("/", chat_controller_js_1.chatController);
exports.default = chatRouter;
//# sourceMappingURL=chat.route.js.map