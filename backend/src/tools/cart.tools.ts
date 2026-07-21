import { CartService } from "../cart/cart.service.js";
import type { MenuSelection } from "../menu/menu.types.js";

import type { ToolResult } from "./tool.types.js";
import { failure, success } from "./tool.utils.js";

export class CartTools {
  constructor(private readonly cartService: CartService) {}

  viewCart({
    sessionId,
  }: {
    sessionId: string;
  }): ToolResult<ReturnType<CartService["getCartSummary"]>> {
    try {
      return success(this.cartService.getCartSummary(sessionId));
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to retrieve cart.",
      );
    }
  }

  addToCart({
    sessionId,
    itemId,
    quantity,
    modifiers,
  }: {
    sessionId: string;
    itemId: string;
    quantity: number;
    modifiers: MenuSelection["modifiers"];
  }): ToolResult<ReturnType<CartService["addItem"]>> {
    try {
      const selection: MenuSelection = {
        itemId,
        quantity,
        modifiers,
      };

      return success(this.cartService.addItem(sessionId, selection));
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to add item to cart.",
      );
    }
  }

  removeFromCart({
    sessionId,
    itemId,
  }: {
    sessionId: string;
    itemId: string;
  }): ToolResult<ReturnType<CartService["removeItem"]>> {
    try {
      const cart = this.cartService.getCart(sessionId);

      const matches = cart.items.filter(
        (item) => item.itemId === itemId || item.id === itemId,
      );

      if (matches.length === 0) {
        return failure("Item is not in the cart.");
      }

      if (matches.length === 1) {
        return success(this.cartService.removeItem(sessionId, matches[0]!.id));
      }

      return {
        success: false,

        error: "MULTIPLE_MATCHES",

        data: matches.map((item) => ({
          itemId: item.itemId,
          quantity: item.quantity,
          modifiers: item.modifiers,
        })),
      };
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to remove item.",
      );
    }
  }

  updateQuantity({
    sessionId,
    cartItemId,
    quantity,
  }: {
    sessionId: string;
    cartItemId: string;
    quantity: number;
  }): ToolResult<ReturnType<CartService["updateQuantity"]>> {
    try {
      return success(
        this.cartService.updateQuantity(sessionId, cartItemId, quantity),
      );
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to update quantity.",
      );
    }
  }

  clearCart({
    sessionId,
  }: {
    sessionId: string;
  }): ToolResult<ReturnType<CartService["clearCart"]>> {
    try {
      return success(this.cartService.clearCart(sessionId));
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to clear cart.",
      );
    }
  }
}
