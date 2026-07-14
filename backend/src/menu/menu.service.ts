import { categories, menuItems } from "./menu.data.js";

import type {
  MenuCategory,
  MenuItem,
  MenuSelection,
  ModifierGroup,
  SelectedModifier,
  ValidationError,
  ValidationResult,
} from "./menu.types.js";

import { ValidationErrorCode } from "./menu.types.js";

export class MenuService {
  getAllItems(): MenuItem[] {
    return menuItems;
  }

  getCategories(): MenuCategory[] {
    return categories;
  }

  getItemById(id: string): MenuItem | undefined {
    return menuItems.find((item) => item.id === id);
  }

  getItemByName(name: string): MenuItem | undefined {
    return menuItems.find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );
  }

  search(query: string): MenuItem[] {
    const normalizedQuery = query.trim().toLowerCase();

    return menuItems.filter((item) => {
      const category = categories.find(
        (category) => category.id === item.categoryId,
      );

      return (
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        category?.name.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  validateSelection(selection: MenuSelection): ValidationResult {
    const errors: ValidationError[] = [];

    const menuItem = this.getItemById(selection.itemId);

    if (!menuItem) {
      errors.push({
        code: ValidationErrorCode.MENU_ITEM_NOT_FOUND,
        message: "Selected menu item does not exist.",
        field: "itemId",
      });

      return {
        valid: false,
        errors,
      };
    }

    this.validateModifierGroups(
      menuItem.modifierGroups,
      selection.modifiers,
      errors,
    );

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private validateModifierGroups(
    groups: ModifierGroup[],
    selections: SelectedModifier[],
    errors: ValidationError[],
  ): void {
    for (const group of groups) {
      const selection = selections.find(
        (modifier) => modifier.groupId === group.id,
      );

      if (group.required && !selection) {
        errors.push({
          code: ValidationErrorCode.REQUIRED_MODIFIER_MISSING,
          message: `${group.name} is required.`,
          field: group.id,
        });

        continue;
      }

      if (!selection) {
        continue;
      }

      this.validateModifierSelection(group, selection, errors);
    }
  }

  private validateModifierSelection(
    group: ModifierGroup,
    selection: SelectedModifier,
    errors: ValidationError[],
  ): void {
    const option = group.options.find(
      (option) => option.id === selection.optionId,
    );

    if (!option) {
      errors.push({
        code: ValidationErrorCode.INVALID_OPTION,
        message: `Invalid option selected for ${group.name}.`,
        field: group.id,
      });

      return;
    }

    if (option.modifierGroups) {
      this.validateModifierGroups(
        option.modifierGroups,
        selection.nestedSelections ?? [],
        errors,
      );
    }
  }
}
