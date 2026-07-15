import { MenuService } from "../menu/menu.service.js";
import type { ToolResult } from "./tool.types.js";
export declare class MenuTools {
    private readonly menuService;
    constructor(menuService: MenuService);
    listMenu(_: Record<string, never>): ToolResult<ReturnType<MenuService["getAllItems"]>>;
    searchMenu({ query, }: {
        query: string;
    }): ToolResult<ReturnType<MenuService["search"]>>;
    getMenuItem({ id, }: {
        id: string;
    }): ToolResult<ReturnType<MenuService["getItemById"]>>;
}
