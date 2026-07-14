import type { Cart, CartSummary } from "./cart.types.js";
import type { MenuItem, MenuSelection } from "../menu/menu.types.js";
export declare class PricingService {
    calculateItemPrice(menuItem: MenuItem, selection: MenuSelection): number;
    calculateCartSummary(cart: Cart, itemPrices: number[]): CartSummary;
    private calculateModifierPrice;
}
