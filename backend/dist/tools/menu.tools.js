"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuTools = void 0;
const tool_utils_js_1 = require("./tool.utils.js");
class MenuTools {
    menuService;
    constructor(menuService) {
        this.menuService = menuService;
    }
    listMenu(_) {
        try {
            const items = this.menuService.getAllItems().map((item) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.basePrice,
                modifierGroups: item.modifierGroups.map((group) => ({
                    id: group.id,
                    name: group.name,
                    required: group.required,
                    options: group.options.map((option) => ({
                        id: option.id,
                        name: option.name,
                        priceDelta: option.priceDelta,
                    })),
                })),
            }));
            return (0, tool_utils_js_1.success)(items);
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to retrieve menu.");
        }
    }
    searchMenu({ query }) {
        try {
            const items = this.menuService.search(query).map((item) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.basePrice,
                modifierGroups: item.modifierGroups.map((group) => ({
                    id: group.id,
                    name: group.name,
                    required: group.required,
                    options: group.options.map((option) => ({
                        id: option.id,
                        name: option.name,
                        priceDelta: option.priceDelta,
                    })),
                })),
            }));
            return (0, tool_utils_js_1.success)(items);
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to search menu.");
        }
    }
    getMenuItem({ id, }) {
        try {
            return (0, tool_utils_js_1.success)(this.menuService.getItemById(id));
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error
                ? error.message
                : "Unable to retrieve menu item.");
        }
    }
}
exports.MenuTools = MenuTools;
//# sourceMappingURL=menu.tools.js.map