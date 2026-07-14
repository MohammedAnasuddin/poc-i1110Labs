"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const app_error_js_1 = require("../errors/app-error.js");
function errorHandler(error, _req, res, _next) {
    if (error instanceof app_error_js_1.AppError) {
        return res.status(error.statusCode).json({
            success: false,
            code: error.code,
            message: error.message,
        });
    }
    console.error(error);
    return res.status(500).json({
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong.",
    });
}
//# sourceMappingURL=error.middleware.js.map