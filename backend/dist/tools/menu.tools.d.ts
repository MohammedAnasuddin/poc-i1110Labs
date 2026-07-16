import { MenuService } from "../menu/menu.service.js";
import type { ToolResult } from "./tool.types.js";
export interface MenuSearchResult {
    id: string;
    name: string;
    description: string;
    price: number;
    modifierGroups: {
        id: string;
        name: string;
        required: boolean;
        options: {
            id: string;
            name: string;
            priceDelta: number;
        }[];
    }[];
}
export declare class MenuTools {
    private readonly menuService;
    constructor(menuService: MenuService);
    listMenu(_: Record<string, never>): ToolResult<MenuSearchResult[]>;
    searchMenu({ query }: {
        query: string;
    }): ToolResult<MenuSearchResult[]>;
    getMenuItem({ id, }: {
        id: string;
    }): ToolResult<ReturnType<MenuService["getItemById"]>>;
}
