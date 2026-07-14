"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_service_1 = require("./sessions/session.service");
const sessionService = new session_service_1.SessionService();
const sessionA = sessionService.createSession();
const sessionB = sessionService.createSession();
console.log(sessionA.id);
console.log(sessionB.id);
console.log(sessionService.getAllSessions().length);
//# sourceMappingURL=test-session.js.map