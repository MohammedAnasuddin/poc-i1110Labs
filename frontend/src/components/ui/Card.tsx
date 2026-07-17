import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn(
        `
        surface-raised
        rounded-[var(--radius-xl)]
        border
        border-[var(--border)]
        p-8
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:shadow-md
        `,
        className,
      )}
    >
      {children}
    </section>
  );
}