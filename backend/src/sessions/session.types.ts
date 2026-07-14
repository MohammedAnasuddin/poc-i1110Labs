import type { Cart } from "../cart/cart.types.js";

export enum SessionStatus {
  ACTIVE = "ACTIVE",
  TERMINATED = "TERMINATED",
}

export interface Session {
  id: string;

  status: SessionStatus;

  cart: Cart;

  createdAt: Date;

  updatedAt: Date;
}
