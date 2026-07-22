import { FileText } from "lucide-react";

export function EmptyState({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="py-12 text-center bg-[var(--surface-sunken)]/30"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 bg-[var(--surface)] rounded-full border border-[var(--border)] shadow-xs">
            <FileText
              size={24}
              className="text-[var(--text-muted)] opacity-60"
            />
          </div>
          <p className="text-sm font-medium text-[var(--text-main)]">
            No logs found.
          </p>
          <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
            Try adjusting your search queries or change the filter criteria up
            above.
          </p>
        </div>
      </td>
    </tr>
  );
}
