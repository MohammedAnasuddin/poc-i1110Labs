"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTools = void 0;
const tool_utils_js_1 = require("./tool.utils.js");
class OrderTools {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    async placeOrder({ sessionId, }) {
        try {
            return (0, tool_utils_js_1.success)(await this.orderService.placeOrder(sessionId));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to place order.");
        }
    }
    async getOrder({ orderId, }) {
        try {
            return (0, tool_utils_js_1.success)(await this.orderService.getOrder(orderId));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to retrieve order.");
        }
    }
    async getOrders({ sessionId, }) {
        try {
            return (0, tool_utils_js_1.success)(await this.orderService.getOrders(sessionId));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to retrieve orders.");
        }
    }
}
exports.OrderTools = OrderTools;
//# sourceMappingURL=order.tools.js.map