import type { PropsWithChildren } from "react";

export function CardTitle({ children }: PropsWithChildren) {
  return (
    <h2 className="text-xl font-semibold text-[var(--foreground)]">
      {children}
    </h2>
  );
}