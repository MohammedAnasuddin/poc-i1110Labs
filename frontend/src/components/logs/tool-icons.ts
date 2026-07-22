import React from "react";
import {
  ShoppingCart,
  ShoppingBasket,
  BookOpen,
  Receipt,
  Trash2,
  Pencil,
  Trash,
  ClipboardList,
  Wrench,
} from "lucide-react";

const toolIconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  add_to_cart: ShoppingCart,
  view_cart: ShoppingBasket,
  list_menu: BookOpen,
  place_order: Receipt,
  remove_from_cart: Trash2,
  update_quantity: Pencil,
  clear_cart: Trash,
  get_orders: ClipboardList,
};

export function getToolIcon(toolName: string) {
  const cleanName = toolName.toLowerCase().trim();
  return toolIconMap[cleanName] || Wrench;
}

export function formatToolName(toolName: string): string {
  if (!toolName) return "—";
  return toolName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
