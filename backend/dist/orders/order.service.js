"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const enums_1 = require("../generated/prisma/enums");
class OrderService {
    prisma;
    cartService;
    constructor(prisma, cartService) {
        this.prisma = prisma;
        this.cartService = cartService;
    }
    async placeOrder(sessionId) {
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
                status: enums_1.OrderStatus.PLACED,
            },
        });
        this.cartService.clearCart(sessionId);
        return {
            orderId: order.id,
            total: Number(order.total),
            placedAt: order.placedAt,
        };
    }
    async getOrder(orderId) {
        return this.prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });
    }
    async getOrders(sessionId) {
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
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map