import { MenuService } from "../menu/menu.service.js";

import { failure, success } from "./tool.utils.js";

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

export class MenuTools {
  constructor(private readonly menuService: MenuService) {}

  listMenu(_: Record<string, never>): ToolResult<MenuSearchResult[]> {
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
      return success(items);
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to retrieve menu.",
      );
    }
  }

  searchMenu({ query }: { query: string }): ToolResult<MenuSearchResult[]> {
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
      return success(items);
    } catch (error) {
      return failure(
        error instanceof Error ? error.message : "Unable to search menu.",
      );
    }
  }

  getMenuItem({
    id,
  }: {
    id: string;
  }): ToolResult<ReturnType<MenuService["getItemById"]>> {
    try {
      return success(this.menuService.getItemById(id));
    } catch (error) {
      return failure(
        error instanceof Error
          ? error.message
          : "Unable to retrieve menu item.",
      );
    }
  }
}
