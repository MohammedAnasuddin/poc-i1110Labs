import { PrismaClient } from "../generated/prisma/client";
import { OrderStatus } from "../generated/prisma/enums";
import { CartService } from "../cart/cart.service.js";
import type { PlaceOrderResult } from "./order.types.js";
export declare class OrderService {
    private readonly prisma;
    private readonly cartService;
    constructor(prisma: PrismaClient, cartService: CartService);
    placeOrder(sessionId: string): Promise<PlaceOrderResult>;
    getOrder(orderId: string): Promise<{
        id: string;
        sessionId: string;
        items: import("@prisma/client/runtime/client").JsonValue;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        tax: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        smsSent: boolean;
        emailSent: boolean;
        status: OrderStatus;
        placedAt: Date;
    } | null>;
    getOrders(sessionId: string): Promise<{
        id: string;
        sessionId: string;
        items: import("@prisma/client/runtime/client").JsonValue;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        tax: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        smsSent: boolean;
        emailSent: boolean;
        status: OrderStatus;
        placedAt: Date;
    }[]>;
}
