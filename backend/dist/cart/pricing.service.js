"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
class PricingService {
    calculateItemPrice(menuItem, selection) {
        const modifierPrice = this.calculateModifierPrice(menuItem.modifierGroups, selection.modifiers);
        return (menuItem.basePrice + modifierPrice) * selection.quantity;
    }
    calculateCartSummary(cart, itemPrices) {
        const subtotal = itemPrices.reduce((sum, price) => sum + price, 0);
        const totalItems = cart.items.reduce((sum, item) => sum + item.selection.quantity, 0);
        return {
            items: cart.items,
            totalItems,
            subtotal,
            total: subtotal,
        };
    }
    calculateModifierPrice(groups, selections) {
        let total = 0;
        for (const selection of selections) {
            const group = groups.find((group) => group.id === selection.groupId);
            if (!group) {
                continue;
            }
            const option = group.options.find((option) => option.id === selection.optionId);
            if (!option) {
                continue;
            }
            total += option.priceDelta;
            if (option.modifierGroups && selection.nestedSelections) {
                total += this.calculateModifierPrice(option.modifierGroups, selection.nestedSelections);
            }
        }
        return total;
    }
}
exports.PricingService = PricingService;
//# sourceMappingURL=pricing.service.js.map