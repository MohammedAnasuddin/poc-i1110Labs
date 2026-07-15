"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartTools = void 0;
const tool_utils_js_1 = require("./tool.utils.js");
class CartTools {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    viewCart({ sessionId, }) {
        try {
            return (0, tool_utils_js_1.success)(this.cartService.getCartSummary(sessionId));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to retrieve cart.");
        }
    }
    addToCart({ sessionId, selection, }) {
        try {
            return (0, tool_utils_js_1.success)(this.cartService.addItem(sessionId, selection));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to add item to cart.");
        }
    }
    removeFromCart({ sessionId, cartItemId, }) {
        try {
            return (0, tool_utils_js_1.success)(this.cartService.removeItem(sessionId, cartItemId));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to remove item.");
        }
    }
    updateQuantity({ sessionId, cartItemId, quantity, }) {
        try {
            return (0, tool_utils_js_1.success)(this.cartService.updateQuantity(sessionId, cartItemId, quantity));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to update quantity.");
        }
    }
    clearCart({ sessionId, }) {
        try {
            return (0, tool_utils_js_1.success)(this.cartService.clearCart(sessionId));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to clear cart.");
        }
    }
}
exports.CartTools = CartTools;
//# sourceMappingURL=cart.tools.js.map