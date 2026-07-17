import type { PropsWithChildren } from "react";

export function AppContainer({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-8 py-12">
        {children}
      </div>
    </main>
  );
}