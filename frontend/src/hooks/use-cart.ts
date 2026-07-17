import { useEffect, useState } from "react";

import { getCart } from "@/api/cart.api";

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  total: number;
}

export function useCart(sessionId: string) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    subtotal: 0,
    total: 0,
  });

  useEffect(() => {
    if (!sessionId) return;

    async function load() {
      const data = await getCart(sessionId);
      setCart(data);
    }

    load();

    const interval = setInterval(load, 1000);

    return () => clearInterval(interval);
  }, [sessionId]);

  return cart;
}
