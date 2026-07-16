import type { PropsWithChildren } from "react";

export function Page({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-8 py-10">
        {children}
      </div>
    </main>
  );
}