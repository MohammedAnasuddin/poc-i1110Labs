import type { PropsWithChildren } from "react";
import { AppHeader } from "@/components/layout/AppHeader";

type PageProps = PropsWithChildren;

export function Page({ children }: PageProps) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-8 py-12">
        <AppHeader />

        <div className="mt-10 flex-1">{children}</div>
      </div>
    </main>
  );
}
