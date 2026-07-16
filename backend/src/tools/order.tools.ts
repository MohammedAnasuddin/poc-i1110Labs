import { OrderService } from "../orders/order.service.js";

import type { ToolResult } from "./tool.types.js";
import { success, failure } from "./tool.utils.js";

export class OrderTools {
  constructor(private readonly orderService: OrderService) {}

  async placeOrder({
  sessionId,
}: {
  sessionId: string;
}): Promise<ToolResult<Awaited<ReturnType<OrderService["placeOrder"]>>>> {
  try {
    console.log("\n========== TOOL: PLACE ORDER ==========");
    console.log("Arguments:");
    console.dir({ sessionId }, { depth: null });

    const result = await this.orderService.placeOrder(sessionId);

    console.log("\nService Result:");
    console.dir(result, { depth: null });

    console.log("========================================\n");

    return success(result);
  } catch (error) {
    console.error("\n❌ PLACE ORDER FAILED");
    console.error(error);

    return failure(
      error instanceof Error ? error.message : "Unable to place order.",
    );
  }
}

  async getOrder({
    orderId,
  }: {
    orderId: string;
  }): Promise<ToolResult<Awaited<ReturnType<OrderService["getOrder"]>>>> {
    try {
      return success(await this.orderService.getOrder(orderId));
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to retrieve order.",
      );
    }
  }

  async getOrders({
    sessionId,
  }: {
    sessionId: string;
  }): Promise<ToolResult<Awaited<ReturnType<OrderService["getOrders"]>>>> {
    try {
      return success(await this.orderService.getOrders(sessionId));
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to retrieve orders.",
      );
    }
  }
}
