import type { Table } from "@tanstack/react-table";
import { typeConfig } from "./log-config";

type ToolbarProps<TData> = {
  table: Table<TData>;
  totalLogs: number;
  totalSessions: number;
};

export function Toolbar<TData>({
  table,
  totalLogs,
  totalSessions,
}: ToolbarProps<TData>) {
  const typeColumn = table.getColumn("type");
  const currentTypeFilter = (typeColumn?.getFilterValue() as string) || "ALL";

  const handleTypeFilter = (type: string) => {
    if (type === "ALL") {
      typeColumn?.setFilterValue(undefined);
    } else {
      typeColumn?.setFilterValue(type);
    }
  };

  return (
    <div className="space-y-6 pb-6 border-b border-[var(--border)]">
      {/* Top Header Row */}
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)] flex items-center gap-2">
          Agent Logs
        </h2>
        <div className="text-sm font-medium text-[var(--text-muted)] flex items-center gap-2">
          <span>{totalLogs} Logs</span>
          <span className="text-slate-300">•</span>
          <span>{totalSessions} Sessions</span>
        </div>
      </div>

      {/* Constraints Width Search Box */}
      {/* <div className="relative max-w-md w-full">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
        <input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search logs..."
          className="w-full h-11 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] pl-10 pr-4 text-sm shadow-sm text-[var(--text-main)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
        />
      </div> */}

      {/* Premium Pill Shaped Filter Chips */}
      <div className="filters-pills flex flex-wrap items-center gap-4 pt-2 m-3.5">
        <button
          onClick={() => handleTypeFilter("ALL")}
          className={`rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
            currentTypeFilter === "ALL"
              ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs"
              : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:bg-[var(--secondary)]"
          }`}
        >
          All
        </button>
        {Object.entries(typeConfig).map(([key, config]) => {
          const Icon = config.icon;
          const isSelected = currentTypeFilter === key;
          return (
            <button
              key={key}
              onClick={() => handleTypeFilter(key)}
              className={`flex items-center gap-2 rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide border transition-all cursor-pointer${
                isSelected
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs"
                  : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:bg-[var(--secondary)]"
              }`}
            >
              <Icon size={14} />
              {config.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
