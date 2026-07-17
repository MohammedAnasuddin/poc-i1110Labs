import { CartTools } from "../tools/cart.tools.js";
import { MenuTools } from "../tools/menu.tools.js";

import { failure } from "../tools/tool.utils.js";
import type { ToolResult } from "../tools/tool.types.js";
import { OrderTools } from "../tools/order.tools.js";
import { analyticsService } from "../container.js";

type ToolHandler = (args: any) => Promise<ToolResult<any>> | ToolResult<any>;

export class ToolRegistry {
  private readonly tools = new Map<string, ToolHandler>();

  constructor(
    private readonly menuTools: MenuTools,
    private readonly cartTools: CartTools,
    private readonly orderTools: OrderTools,
  ) {
    this.registerTools();
  }

  private registerTools(): void {
    this.tools.set("list_menu", this.menuTools.listMenu.bind(this.menuTools));

    this.tools.set(
      "search_menu",
      this.menuTools.searchMenu.bind(this.menuTools),
    );

    this.tools.set(
      "get_menu_item",
      this.menuTools.getMenuItem.bind(this.menuTools),
    );

    this.tools.set("view_cart", this.cartTools.viewCart.bind(this.cartTools));

    this.tools.set(
      "add_to_cart",
      this.cartTools.addToCart.bind(this.cartTools),
    );

    this.tools.set(
      "remove_from_cart",
      this.cartTools.removeFromCart.bind(this.cartTools),
    );

    this.tools.set(
      "update_quantity",
      this.cartTools.updateQuantity.bind(this.cartTools),
    );

    this.tools.set("clear_cart", this.cartTools.clearCart.bind(this.cartTools));

    this.tools.set(
      "place_order",
      this.orderTools.placeOrder.bind(this.orderTools),
    );

    this.tools.set("get_order", this.orderTools.getOrder.bind(this.orderTools));

    this.tools.set(
      "get_orders",
      this.orderTools.getOrders.bind(this.orderTools),
    );
  }

  async execute(toolName: string, args: unknown): Promise<ToolResult<unknown>> {
    const tool = this.tools.get(toolName);

    console.log("Executing Tool:", toolName);

    if (!tool) {
      await analyticsService.recordToolCall(false);

      return failure(`Unknown tool: ${toolName}`);
    }

    try {
      const result = await tool(args);

      await analyticsService.recordToolCall(true);

      return result;
    } catch (error) {
      await analyticsService.recordToolCall(false);

      throw error;
    }
  }

  getAvailableTools(): string[] {
    return [...this.tools.keys()];
  }
}
