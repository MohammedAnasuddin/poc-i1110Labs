import type { MenuSelection, SelectedModifier } from "../menu/menu.types.js";

export interface CartItem {
  id: string;

  selection: MenuSelection;
}

export interface Cart {
  items: CartItem[];
}

export interface CartSummary {
  items: CartResponseItem[];

  totalItems: number;

  subtotal: number;

  total: number;
}

export interface CartResponseItem {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  modifiers: SelectedModifier[];
}

export interface CartResponse {
  items: CartResponseItem[];
  totalItems: number;
  subtotal: number;
  total: number;
}
