"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const health_route_js_1 = __importDefault(require("./routes/health.route.js"));
const error_middleware_js_1 = require("./middleware/error.middleware.js");
const chat_route_js_1 = __importDefault(require("./features/chat/chat.route.js"));
const session_route_1 = __importDefault(require("./sessions/session.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/health", health_route_js_1.default);
app.use("/api/chat", chat_route_js_1.default);
app.use("/api/sessions", session_route_1.default);
app.use(error_middleware_js_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map