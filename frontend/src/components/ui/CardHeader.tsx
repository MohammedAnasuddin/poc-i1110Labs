import type { PropsWithChildren } from "react";

export function CardHeader({ children }: PropsWithChildren) {
  return (
    <div className="mb-8 flex items-center justify-between">
      {children}
    </div>
  );
}