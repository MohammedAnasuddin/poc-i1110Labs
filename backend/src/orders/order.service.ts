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
    const cart = this.cartService.getCartSummary(sessionId);

    if (cart.items.length === 0) {
      throw new Error("Cart is empty.");
    }

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

    this.cartService.clearCart(sessionId);

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
