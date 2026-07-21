"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const node_crypto_1 = require("node:crypto");
class CartService {
    sessionService;
    menuService;
    pricingService;
    constructor(sessionService, menuService, pricingService) {
        this.sessionService = sessionService;
        this.menuService = menuService;
        this.pricingService = pricingService;
    }
    getCart(sessionId) {
        const cart = this.sessionService.getSession(sessionId).cart;
        const items = cart.items.map((item) => {
            const menuItem = this.menuService.getItemById(item.selection.itemId);
            if (!menuItem) {
                throw new Error(`Menu item '${item.selection.itemId}' not found.`);
            }
            const unitPrice = this.pricingService.calculateUnitPrice(menuItem, item.selection);
            const totalPrice = this.pricingService.calculateItemPrice(menuItem, item.selection);
            // console.log({
            //   name: menuItem.name,
            //   basePrice: menuItem.basePrice,
            //   quantity: item.selection.quantity,
            //   unitPrice,
            //   totalPrice,
            // });
            return {
                id: item.id,
                itemId: menuItem.id,
                name: menuItem.name,
                quantity: item.selection.quantity,
                unitPrice,
                totalPrice,
                modifiers: item.selection.modifiers,
            };
        });
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
        return {
            items,
            totalItems,
            subtotal,
            total: subtotal,
        };
    }
    addItem(sessionId, selection) {
        const session = this.sessionService.getSession(sessionId);
        const validation = this.menuService.validateSelection(selection);
        if (!validation.valid) {
            throw new Error(validation.errors[0]?.message ?? "Menu selection is invalid.");
        }
        const existingItem = this.findMatchingItem(session.cart, selection);
        if (existingItem) {
            existingItem.selection.quantity += selection.quantity;
        }
        else {
            session.cart.items.push({
                id: (0, node_crypto_1.randomUUID)(),
                selection,
            });
        }
        session.updatedAt = new Date();
        return session.cart;
    }
    findMatchingItem(cart, selection) {
        return cart.items.find((item) => JSON.stringify(item.selection) === JSON.stringify(selection));
    }
    removeItem(sessionId, cartItemId) {
        const session = this.sessionService.getSession(sessionId);
        session.cart.items = session.cart.items.filter((item) => item.id !== cartItemId);
        session.updatedAt = new Date();
        return session.cart;
    }
    updateQuantity(sessionId, cartItemId, quantity) {
        const session = this.sessionService.getSession(sessionId);
        const item = session.cart.items.find((item) => item.id === cartItemId);
        if (!item) {
            throw new Error("Cart item not found.");
        }
        item.selection.quantity = quantity;
        session.updatedAt = new Date();
        return session.cart;
    }
    clearCart(sessionId) {
        const session = this.sessionService.getSession(sessionId);
        session.cart.items = [];
        session.updatedAt = new Date();
        return session.cart;
    }
    getCartSummary(sessionId) {
        const cart = this.getCart(sessionId);
        const itemPrices = cart.items.map((item) => item.totalPrice);
        return this.pricingService.calculateCartSummary(cart, itemPrices);
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map