import type { Cart, CartSummary, CartResponse } from "./cart.types.js";

import type {
  MenuItem,
  MenuSelection,
  ModifierGroup,
  SelectedModifier,
} from "../menu/menu.types.js";

export class PricingService {
  calculateUnitPrice(menuItem: MenuItem, selection: MenuSelection): number {
    const modifierPrice = this.calculateModifierPrice(
      menuItem.modifierGroups,
      selection.modifiers,
    );

    return menuItem.basePrice + modifierPrice;
  }

  calculateItemPrice(menuItem: MenuItem, selection: MenuSelection): number {
    return this.calculateUnitPrice(menuItem, selection) * selection.quantity;
  }

  calculateCartSummary(cart: CartResponse, itemPrices: number[]): CartSummary {
    const subtotal = itemPrices.reduce((sum, price) => sum + price, 0);

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: cart.items,
      totalItems,
      subtotal,
      total: subtotal,
    };
  }

  private calculateModifierPrice(
    groups: ModifierGroup[],
    selections: SelectedModifier[],
  ): number {
    let total = 0;

    for (const selection of selections) {
      const group = groups.find((group) => group.id === selection.groupId);

      if (!group) {
        continue;
      }

      const option = group.options.find(
        (option) => option.id === selection.optionId,
      );

      if (!option) {
        continue;
      }

      total += option.priceDelta;

      if (option.modifierGroups && selection.nestedSelections) {
        total += this.calculateModifierPrice(
          option.modifierGroups,
          selection.nestedSelections,
        );
      }
    }

    return total;
  }
}
