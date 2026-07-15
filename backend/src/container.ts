import { MenuService } from "./menu/menu.service.js";
import { PricingService } from "./cart/pricing.service.js";
import { CartService } from "./cart/cart.service.js";
import { SessionService } from "./sessions/session.service";

import { MenuTools } from "./tools/menu.tools.js";
import { CartTools } from "./tools/cart.tools.js";

import { ToolRegistry } from "./ai/tool-registry.js";
import { AIAgentService } from "./ai/ai-agent.service.js";

// Services
export const sessionService = new SessionService();

export const menuService = new MenuService();

export const pricingService = new PricingService();

export const cartService = new CartService(
  sessionService,
  menuService,
  pricingService,
);

// Tools
export const menuTools = new MenuTools(menuService);

export const cartTools = new CartTools(cartService);

// AI
export const toolRegistry = new ToolRegistry(menuTools, cartTools);

export const aiAgentService = new AIAgentService(toolRegistry, sessionService);
