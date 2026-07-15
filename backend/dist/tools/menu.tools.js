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
            return (0, tool_utils_js_1.success)(this.menuService.getAllItems());
        }
        catch (error) {
            return (0, tool_utils_js_1.failure)(error instanceof Error ? error.message : "Unable to retrieve menu.");
        }
    }
    searchMenu({ query, }) {
        try {
            return (0, tool_utils_js_1.success)(this.menuService.search(query));
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