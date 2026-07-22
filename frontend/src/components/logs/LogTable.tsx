import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ExpandedState,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import { Fragment, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { columns } from "./columns";
import { Toolbar } from "./Toolbar";
import { ExpandedPanel } from "./ExpandedPanel";
import { EmptyState } from "./EmptyState";
import type { AgentLog } from "../../types/AgentLog";

type Props = {
  data: AgentLog[];
};

export function LogTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      expanded,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const totalSessions = useMemo(() => {
    return new Set(data.map((log) => log.sessionId).filter(Boolean)).size;
  }, [data]);

  const activeSessionFilter = table
    .getColumn("sessionId")
    ?.getFilterValue() as string;

  return (
    <div className="mx-auto w-full max-w-[1600px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xs">
      {/* Structural Header & Dashboard Controls */}
      <Toolbar
        table={table}
        // globalFilter={globalFilter}
        // setGlobalFilter={setGlobalFilter}
        totalLogs={data.length}
        totalSessions={totalSessions}
      />

      {/* LangSmith-style Session Stream Filter Banner */}
      {activeSessionFilter && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-[var(--primary)]/10 px-4 py-4 text-xs text-[var(--primary)] border border-[var(--primary)]/20 shadow-xs animate-fade-in">
          <span>
            Focused session stream:{" "}
            <strong className="font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded border border border-[var(--primary)]/30 ml-1">
              {activeSessionFilter}
            </strong>
          </span>
          <button
            onClick={() =>
              table.getColumn("sessionId")?.setFilterValue(undefined)
            }
            className="flex items-center gap-1 font-bold hover:opacity-80 bg-transparent border-none cursor-pointer transition-all text-xs"
          >
            <X size={14} /> Close Focus
          </button>
        </div>
      )}

      {/* Observability Clean Content Table Matrix Wrapper */}
      <div className="mt-6 overflow-x-auto border border-[var(--border)] rounded-xl bg-[var(--surface)]">
        <table className="w-full text-left border-collapse table-auto">
          <thead className="sticky top-0 z-10 bg-[var(--surface-sunken)] border-b border-[var(--border)]">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none px-5 py-4 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors tracking-wide"
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{ asc: " ▲", desc: " ▼" }[
                        header.column.getIsSorted() as string
                      ] ?? ""}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  {/* Clean height aligned rows matching flex item wrappers */}
                  <tr
                    className="cursor-pointer transition-colors duration-150 hover:bg-[var(--secondary)]/50"
                    onClick={row.getToggleExpandedHandler()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-5 py-5 text-sm text-[var(--text-main)] font-medium align-middle"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>

                  {row.getIsExpanded() && (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="bg-[var(--surface-sunken)]/40 p-8 border-l-4 border-[var(--primary)]"
                      >
                        <ExpandedPanel log={row.original} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            ) : (
              <EmptyState colSpan={columns.length} />
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination View controls */}
      <div className="mt-6 flex items-center justify-between text-sm text-[var(--text-muted)] pt-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text-main)] bg-[var(--surface)] hover:bg-[var(--secondary)] disabled:opacity-30 disabled:hover:bg-[var(--surface)] disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
        >
          <ChevronLeft size={14} /> Previous
        </button>

        <span className="text-xs font-bold tracking-wide">
          Page{" "}
          <span className="text-[var(--text-main)] bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border)]">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="text-[var(--text-main)]">
            {table.getPageCount() || 1}
          </span>
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text-main)] bg-[var(--surface)] hover:bg-[var(--secondary)] disabled:opacity-30 disabled:hover:bg-[var(--surface)] disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
