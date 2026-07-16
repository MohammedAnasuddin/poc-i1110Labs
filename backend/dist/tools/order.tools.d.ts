import { OrderService } from "../orders/order.service.js";
import type { ToolResult } from "./tool.types.js";
export declare class OrderTools {
    private readonly orderService;
    constructor(orderService: OrderService);
    placeOrder({ sessionId, }: {
        sessionId: string;
    }): Promise<ToolResult<Awaited<ReturnType<OrderService["placeOrder"]>>>>;
    getOrder({ orderId, }: {
        orderId: string;
    }): Promise<ToolResult<Awaited<ReturnType<OrderService["getOrder"]>>>>;
    getOrders({ sessionId, }: {
        sessionId: string;
    }): Promise<ToolResult<Awaited<ReturnType<OrderService["getOrders"]>>>>;
}
