export function TypingIndicator() {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]">
        🤖
      </div>

      <div className="flex items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)]" />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)]"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)]"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}