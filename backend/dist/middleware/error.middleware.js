"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, _req, res, _next) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
}
//# sourceMappingURL=error.middleware.js.map