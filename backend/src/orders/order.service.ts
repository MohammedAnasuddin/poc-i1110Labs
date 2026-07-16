import { PrismaClient } from "../generated/prisma/client";
import { OrderStatus } from "../generated/prisma/enums";
import { CartService } from "../cart/cart.service.js";

import type { PlaceOrderResult } from "./order.types.js";

export class OrderService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly cartService: CartService,
  ) {}

  async placeOrder(sessionId: string): Promise<PlaceOrderResult> {
    console.log("\n========== PLACE ORDER ==========");
    console.log("Session ID:", sessionId);

    const cart = this.cartService.getCartSummary(sessionId);

    console.log("\nCart Summary:");
    console.dir(cart, { depth: null });

    if (cart.items.length === 0) {
      console.log("❌ Cart is empty.");

      throw new Error("Cart is empty.");
    }

    console.log("\nCreating order in database...");

    const order = await this.prisma.order.create({
      data: {
        sessionId,

        items: JSON.parse(JSON.stringify(cart.items)),

        subtotal: cart.subtotal,

        tax: 0,

        total: cart.total,

        status: OrderStatus.PLACED,
      },
    });

    console.log("\n✅ Prisma returned:");
    console.dir(order, { depth: null });

    console.log("\nVerifying order exists in database...");

    const verify = await this.prisma.order.findUnique({
      where: {
        id: order.id,
      },
    });

    console.log("\nDatabase Verification:");
    console.dir(verify, { depth: null });

    console.log("\nClearing cart...");

    this.cartService.clearCart(sessionId);

    console.log("✅ Cart cleared.");

    console.log("\n========== PLACE ORDER COMPLETE ==========\n");

    return {
      orderId: order.id,
      total: Number(order.total),
      placedAt: order.placedAt,
    };
  }

  async getOrder(orderId: string) {
    return this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  }

  async getOrders(sessionId: string) {
    return this.prisma.order.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        placedAt: "desc",
      },
    });
  }
}
