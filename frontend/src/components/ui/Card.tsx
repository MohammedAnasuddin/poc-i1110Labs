import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    className?: string;
  }
>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <section
      {...props}
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
