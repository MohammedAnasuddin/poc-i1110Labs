import { Mic } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle.tsx";

export function AppHeader() {
  return (
    <header className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--accent)]">
          <Mic size={20} className="text-[var(--accent-foreground)]" />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">
            Voice assistant
          </h1>

          <p className="text-sm text-[var(--muted)]">AI restaurant ordering</p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}
