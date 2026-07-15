import { CartTools } from "../tools/cart.tools.js";
import { MenuTools } from "../tools/menu.tools.js";
import type { ToolResult } from "../tools/tool.types.js";
export declare class ToolRegistry {
    private readonly menuTools;
    private readonly cartTools;
    private readonly tools;
    constructor(menuTools: MenuTools, cartTools: CartTools);
    private registerTools;
    execute(toolName: string, args: unknown): ToolResult<unknown>;
    getAvailableTools(): string[];
}
