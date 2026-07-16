export function OrderCard() {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-raised)]">
      <header className="border-b border-[var(--border)] px-6 py-4">
        <h2 className="text-lg font-semibold">Current Order</h2>
      </header>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span>Large Margherita</span>

          <span>×1</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Coke</span>

          <span>×2</span>
        </div>

        <div className="border-t border-[var(--border)] pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>

            <span>$24.00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
