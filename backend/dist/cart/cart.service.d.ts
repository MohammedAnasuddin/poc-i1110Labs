import { MenuService } from "../menu/menu.service.js";
import { SessionService } from "../sessions/session.service";
import type { MenuSelection } from "../menu/menu.types.js";
import type { Cart, CartSummary, CartResponse } from "./cart.types.js";
import { PricingService } from "./pricing.service.js";
export declare class CartService {
    private readonly sessionService;
    private readonly menuService;
    private readonly pricingService;
    constructor(sessionService: SessionService, menuService: MenuService, pricingService: PricingService);
    getCart(sessionId: string): CartResponse;
    addItem(sessionId: string, selection: MenuSelection): Cart;
    private findMatchingItem;
    removeItem(sessionId: string, cartItemId: string): Cart;
    updateQuantity(sessionId: string, cartItemId: string, quantity: number): Cart;
    clearCart(sessionId: string): Cart;
    getCartSummary(sessionId: string): CartSummary;
}
