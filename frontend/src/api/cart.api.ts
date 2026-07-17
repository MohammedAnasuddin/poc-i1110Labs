// api/cart.api.ts

import { api } from "./api";

export async function getCart(sessionId: string) {
  const { data } = await api.get(`/sessions/${sessionId}/cart`);

  return data;
}
