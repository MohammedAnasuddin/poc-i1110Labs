import { CartService } from "../cart/cart.service.js";
import type { MenuSelection } from "../menu/menu.types.js";
import type { ToolResult } from "./tool.types.js";
export declare class CartTools {
    private readonly cartService;
    constructor(cartService: CartService);
    viewCart({ sessionId, }: {
        sessionId: string;
    }): ToolResult<ReturnType<CartService["getCartSummary"]>>;
    addToCart({ sessionId, itemId, quantity, modifiers, }: {
        sessionId: string;
        itemId: string;
        quantity: number;
        modifiers: MenuSelection["modifiers"];
    }): ToolResult<ReturnType<CartService["addItem"]>>;
    removeFromCart({ sessionId, itemId, }: {
        sessionId: string;
        itemId: string;
    }): ToolResult<ReturnType<CartService["removeItem"]>>;
    updateQuantity({ sessionId, cartItemId, quantity, }: {
        sessionId: string;
        cartItemId: string;
        quantity: number;
    }): ToolResult<ReturnType<CartService["updateQuantity"]>>;
    clearCart({ sessionId, }: {
        sessionId: string;
    }): ToolResult<ReturnType<CartService["clearCart"]>>;
}
