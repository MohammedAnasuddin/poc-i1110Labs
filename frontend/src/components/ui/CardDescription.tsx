import type { PropsWithChildren } from "react";

export function CardDescription({ children }: PropsWithChildren) {
  return (
    <p className="mt-2 text-sm text-[var(--muted)]">
      {children}
    </p>
  );
}