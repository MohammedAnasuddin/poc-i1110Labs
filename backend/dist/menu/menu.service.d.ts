import type { MenuCategory, MenuItem, MenuSelection, ValidationResult } from "./menu.types.js";
export declare class MenuService {
    getAllItems(): MenuItem[];
    getCategories(): MenuCategory[];
    getItemById(id: string): MenuItem | undefined;
    getItemByName(name: string): MenuItem | undefined;
    search(query: string): MenuItem[];
    validateSelection(selection: MenuSelection): ValidationResult;
    private validateModifierGroups;
    private validateModifierSelection;
}
