import type { CartSummary, CartResponse } from "./cart.types.js";
import type { MenuItem, MenuSelection } from "../menu/menu.types.js";
export declare class PricingService {
    calculateUnitPrice(menuItem: MenuItem, selection: MenuSelection): number;
    calculateItemPrice(menuItem: MenuItem, selection: MenuSelection): number;
    calculateCartSummary(cart: CartResponse, itemPrices: number[]): CartSummary;
    private calculateModifierPrice;
}
