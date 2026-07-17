import { randomUUID } from "node:crypto";

import { MenuService } from "../menu/menu.service.js";
import { SessionService } from "../sessions/session.service";
import type { MenuSelection } from "../menu/menu.types.js";

import type { Cart, CartItem, CartSummary } from "./cart.types.js";

import { PricingService } from "./pricing.service.js";

export class CartService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly menuService: MenuService,
    private readonly pricingService: PricingService,
  ) {}

  getCart(sessionId: string): CartResponse {
    const cart = this.sessionService.getSession(sessionId).cart;

    const items = cart.items.map((item) => {
      const menuItem = this.menuService.getItemById(item.selection.itemId);

      if (!menuItem) {
        throw new Error(`Menu item '${item.selection.itemId}' not found.`);
      }

      const unitPrice = this.pricingService.calculateUnitPrice(
        menuItem,
        item.selection,
      );

      const totalPrice = this.pricingService.calculateItemPrice(
        menuItem,
        item.selection,
      );

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

  addItem(sessionId: string, selection: MenuSelection): Cart {
    const session = this.sessionService.getSession(sessionId);

    const validation = this.menuService.validateSelection(selection);

    if (!validation.valid) {
      throw new Error(
        validation.errors[0]?.message ?? "Menu selection is invalid.",
      );
    }

    const existingItem = this.findMatchingItem(session.cart, selection);

    if (existingItem) {
      existingItem.selection.quantity += selection.quantity;
    } else {
      session.cart.items.push({
        id: randomUUID(),
        selection,
      });
    }

    session.updatedAt = new Date();

    return session.cart;
  }

  private findMatchingItem(
    cart: Cart,
    selection: MenuSelection,
  ): CartItem | undefined {
    return cart.items.find(
      (item) => JSON.stringify(item.selection) === JSON.stringify(selection),
    );
  }

  removeItem(sessionId: string, cartItemId: string): Cart {
    const session = this.sessionService.getSession(sessionId);

    session.cart.items = session.cart.items.filter(
      (item) => item.id !== cartItemId,
    );

    session.updatedAt = new Date();

    return session.cart;
  }

  updateQuantity(
    sessionId: string,
    cartItemId: string,
    quantity: number,
  ): Cart {
    const session = this.sessionService.getSession(sessionId);

    const item = session.cart.items.find(
      (item: CartItem) => item.id === cartItemId,
    );

    if (!item) {
      throw new Error("Cart item not found.");
    }

    item.selection.quantity = quantity;

    session.updatedAt = new Date();

    return session.cart;
  }

  clearCart(sessionId: string): Cart {
    const session = this.sessionService.getSession(sessionId);

    session.cart.items = [];

    session.updatedAt = new Date();

    return session.cart;
  }

  getCartSummary(sessionId: string): CartSummary {
    const cart = this.getCart(sessionId);

    const itemPrices = cart.items.map((item) => item.totalPrice);

    return this.pricingService.calculateCartSummary(cart, itemPrices);
  }
}
