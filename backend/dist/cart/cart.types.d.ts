import type { MenuSelection } from "../menu/menu.types.js";
export interface CartItem {
    id: string;
    selection: MenuSelection;
}
export interface Cart {
    items: CartItem[];
}
export interface CartSummary {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    total: number;
}
