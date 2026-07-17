import { ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/use-cart";

type OrderCardProps = {
  sessionId: string;
};

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export function OrderCard({ sessionId }: OrderCardProps) {
  const { items, total, totalItems } = useCart(sessionId);

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Current Cart
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="rounded-full bg-[var(--accent)] p-2 text-[var(--primary)]">
          <ShoppingBag size={18} />
        </div>
      </header>

      <div className="p-6">
        {items.length === 0 ? (
          <div className="py-10 text-center">
            <ShoppingBag
              size={34}
              className="mx-auto mb-4 text-[var(--muted)]"
            />

            <p className="font-medium text-[var(--foreground)]">
              Your current order is empty
            </p>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Start speaking to add items.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border border-[var(--border)] px-4 py-3"
                >
                  <p className="font-medium text-[var(--foreground)]">
                    {item.name}
                  </p>

                  <p className="whitespace-nowrap text-sm text-[var(--muted)]">
                    {item.quantity} × ${item.unitPrice.toFixed(2)}
                  </p>

                  <p className="font-semibold text-[var(--foreground)]">
                    ${item.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-5">
              <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                <span>Total Items</span>

                <span>{totalItems}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xl font-semibold text-[var(--foreground)]">
                <span>Total</span>

                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}