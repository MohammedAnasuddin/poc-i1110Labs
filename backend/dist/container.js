"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiAgentService = exports.toolRegistry = exports.cartTools = exports.menuTools = exports.cartService = exports.pricingService = exports.menuService = exports.sessionService = void 0;
const menu_service_js_1 = require("./menu/menu.service.js");
const pricing_service_js_1 = require("./cart/pricing.service.js");
const cart_service_js_1 = require("./cart/cart.service.js");
const session_service_1 = require("./sessions/session.service");
const menu_tools_js_1 = require("./tools/menu.tools.js");
const cart_tools_js_1 = require("./tools/cart.tools.js");
const tool_registry_js_1 = require("./ai/tool-registry.js");
const ai_agent_service_js_1 = require("./ai/ai-agent.service.js");
const order_tools_js_1 = require("./tools/order.tools.js");
const order_service_js_1 = require("./orders/order.service.js");
const prisma_js_1 = require("./database/prisma.js");
// Services
exports.sessionService = new session_service_1.SessionService();
exports.menuService = new menu_service_js_1.MenuService();
exports.pricingService = new pricing_service_js_1.PricingService();
exports.cartService = new cart_service_js_1.CartService(exports.sessionService, exports.menuService, exports.pricingService);
// Tools
exports.menuTools = new menu_tools_js_1.MenuTools(exports.menuService);
exports.cartTools = new cart_tools_js_1.CartTools(exports.cartService);
// AI
const orderService = new order_service_js_1.OrderService(prisma_js_1.prisma, exports.cartService);
const orderTools = new order_tools_js_1.OrderTools(orderService);
exports.toolRegistry = new tool_registry_js_1.ToolRegistry(exports.menuTools, exports.cartTools, orderTools);
exports.aiAgentService = new ai_agent_service_js_1.AIAgentService(exports.toolRegistry, exports.sessionService);
//# sourceMappingURL=container.js.map