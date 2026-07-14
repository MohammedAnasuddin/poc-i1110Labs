export interface MenuCategory {
  id: string;
  name: string;
}

export interface ModifierOption {
  id: string;
  name: string;
  priceDelta: number;
  modifierGroups?: ModifierGroup[];
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  minSelections: number;
  maxSelections: number;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  available: boolean;
  modifierGroups: ModifierGroup[];
}

/**
 * Represents a customer's selection for a modifier group.
 */
export interface SelectedModifier {
  groupId: string;
  optionId: string;
  nestedSelections?: SelectedModifier[];
}

/**
 * Represents a customer's menu item selection.
 */
export interface MenuSelection {
  itemId: string;
  quantity: number;
  modifiers: SelectedModifier[];
}

export interface ValidationError {
  code: string;
  message: string;
  field?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export const ValidationErrorCode = {
  MENU_ITEM_NOT_FOUND: "MENU_ITEM_NOT_FOUND",

  REQUIRED_MODIFIER_MISSING: "REQUIRED_MODIFIER_MISSING",

  MODIFIER_GROUP_NOT_FOUND: "MODIFIER_GROUP_NOT_FOUND",

  INVALID_OPTION: "INVALID_OPTION",

  INVALID_SELECTION_COUNT: "INVALID_SELECTION_COUNT",
} as const;
