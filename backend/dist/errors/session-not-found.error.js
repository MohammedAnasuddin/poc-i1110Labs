"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionNotFoundError = void 0;
const app_error_js_1 = require("./app-error.js");
const error_codes_js_1 = require("./error-codes.js");
class SessionNotFoundError extends app_error_js_1.AppError {
    constructor(sessionId) {
        super(`Session '${sessionId}' was not found.`, 404, error_codes_js_1.ErrorCode.SESSION_NOT_FOUND);
    }
}
exports.SessionNotFoundError = SessionNotFoundError;
//# sourceMappingURL=session-not-found.error.js.map