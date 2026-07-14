"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const menu_data_js_1 = require("./menu.data.js");
const menu_types_js_1 = require("./menu.types.js");
class MenuService {
    getAllItems() {
        return menu_data_js_1.menuItems;
    }
    getCategories() {
        return menu_data_js_1.categories;
    }
    getItemById(id) {
        return menu_data_js_1.menuItems.find((item) => item.id === id);
    }
    getItemByName(name) {
        return menu_data_js_1.menuItems.find((item) => item.name.toLowerCase() === name.toLowerCase());
    }
    search(query) {
        const normalizedQuery = query.trim().toLowerCase();
        return menu_data_js_1.menuItems.filter((item) => {
            const category = menu_data_js_1.categories.find((category) => category.id === item.categoryId);
            return (item.name.toLowerCase().includes(normalizedQuery) ||
                item.description.toLowerCase().includes(normalizedQuery) ||
                category?.name.toLowerCase().includes(normalizedQuery));
        });
    }
    validateSelection(selection) {
        const errors = [];
        const menuItem = this.getItemById(selection.itemId);
        if (!menuItem) {
            errors.push({
                code: menu_types_js_1.ValidationErrorCode.MENU_ITEM_NOT_FOUND,
                message: "Selected menu item does not exist.",
                field: "itemId",
            });
            return {
                valid: false,
                errors,
            };
        }
        this.validateModifierGroups(menuItem.modifierGroups, selection.modifiers, errors);
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    validateModifierGroups(groups, selections, errors) {
        for (const group of groups) {
            const selection = selections.find((modifier) => modifier.groupId === group.id);
            if (group.required && !selection) {
                errors.push({
                    code: menu_types_js_1.ValidationErrorCode.REQUIRED_MODIFIER_MISSING,
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
    validateModifierSelection(group, selection, errors) {
        const option = group.options.find((option) => option.id === selection.optionId);
        if (!option) {
            errors.push({
                code: menu_types_js_1.ValidationErrorCode.INVALID_OPTION,
                message: `Invalid option selected for ${group.name}.`,
                field: group.id,
            });
            return;
        }
        if (option.modifierGroups) {
            this.validateModifierGroups(option.modifierGroups, selection.nestedSelections ?? [], errors);
        }
    }
}
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map