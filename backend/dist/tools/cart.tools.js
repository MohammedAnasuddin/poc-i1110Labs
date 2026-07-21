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
    addToCart({ sessionId, itemId, quantity, modifiers, }) {
        try {
            const selection = {
                itemId,
                quantity,
                modifiers,
            };
            return (0, tool_utils_js_1.success)(this.cartService.addItem(sessionId, selection));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to add item to cart.");
        }
    }
    removeFromCart({ sessionId, itemId, }) {
        try {
            const cart = this.cartService.getCart(sessionId);
            const matches = cart.items.filter((item) => item.itemId === itemId || item.id === itemId);
            if (matches.length === 0) {
                return (0, tool_utils_js_1.failure)("Item is not in the cart.");
            }
            if (matches.length === 1) {
                return (0, tool_utils_js_1.success)(this.cartService.removeItem(sessionId, matches[0].id));
            }
            return {
                success: false,
                error: "MULTIPLE_MATCHES",
                data: matches.map((item) => ({
                    itemId: item.itemId,
                    quantity: item.quantity,
                    modifiers: item.modifiers,
                })),
            };
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