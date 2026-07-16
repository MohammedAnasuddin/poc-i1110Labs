"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolRegistry = void 0;
const tool_utils_js_1 = require("../tools/tool.utils.js");
class ToolRegistry {
    menuTools;
    cartTools;
    orderTools;
    tools = new Map();
    constructor(menuTools, cartTools, orderTools) {
        this.menuTools = menuTools;
        this.cartTools = cartTools;
        this.orderTools = orderTools;
        this.registerTools();
    }
    registerTools() {
        this.tools.set("list_menu", this.menuTools.listMenu.bind(this.menuTools));
        this.tools.set("search_menu", this.menuTools.searchMenu.bind(this.menuTools));
        this.tools.set("get_menu_item", this.menuTools.getMenuItem.bind(this.menuTools));
        this.tools.set("view_cart", this.cartTools.viewCart.bind(this.cartTools));
        this.tools.set("add_to_cart", this.cartTools.addToCart.bind(this.cartTools));
        this.tools.set("remove_from_cart", this.cartTools.removeFromCart.bind(this.cartTools));
        this.tools.set("update_quantity", this.cartTools.updateQuantity.bind(this.cartTools));
        this.tools.set("clear_cart", this.cartTools.clearCart.bind(this.cartTools));
        this.tools.set("place_order", this.orderTools.placeOrder.bind(this.orderTools));
        this.tools.set("get_order", this.orderTools.getOrder.bind(this.orderTools));
        this.tools.set("get_orders", this.orderTools.getOrders.bind(this.orderTools));
    }
    async execute(toolName, args) {
        const tool = this.tools.get(toolName);
        if (!tool) {
            return (0, tool_utils_js_1.failure)(`Unknown tool: ${toolName}`);
        }
        return await tool(args);
    }
    getAvailableTools() {
        return [...this.tools.keys()];
    }
}
exports.ToolRegistry = ToolRegistry;
//# sourceMappingURL=tool-registry.js.map