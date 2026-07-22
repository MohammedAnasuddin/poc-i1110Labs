import { createColumnHelper } from "@tanstack/react-table";
import { MessagesSquare, CircleCheck, CircleX, Clock } from "lucide-react";
import { typeConfig } from "./log-config";
import { getToolIcon, formatToolName } from "./tool-icons";
import type { AgentLog } from "../../types/AgentLog";

const helper = createColumnHelper<AgentLog>();

export const columns = [
  // 1. Time Column
  helper.accessor("createdAt", {
    header: () => <span className="text-xs uppercase tracking-wider font-bold">Time</span>,
    cell: ({ getValue }) => {
      const val = getValue();
      if (!val) return null;
      return (
        <span className="text-sm font-mono text-[var(--text-muted)] whitespace-nowrap">
          {new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </span>
      );
    },
  }),

  // 2. Conversation Badge (Spacious horizontal layout padding & gap-3 spacing)
  helper.accessor("sessionId", {
    header: () => <span className="text-xs uppercase tracking-wider font-bold">Conversation</span>,
    cell: ({ getValue, table }) => {
      const id = getValue();
      if (!id) return null;
      return (
        <div className="flex items-center justify-start">
          <button
            onClick={(e) => {
              e.stopPropagation();
              table.getColumn("sessionId")?.setFilterValue(id);
            }}
            className="flex flex-row items-center gap-3 font-mono text-sm text-[var(--text-muted)] bg-slate-500/10 hover:bg-slate-500/20 px-4.5 py-2 rounded-full font-semibold tracking-wide transition-all group border-none cursor-pointer whitespace-nowrap"
            title="Filter by this thread session"
          >
            <MessagesSquare size={16} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
            <span className="leading-none">{id.slice(0, 8)}</span>
          </button>
        </div>
      );
    },
    filterFn: "equals",
  }),

  // 3. Type Column (Icon Pill Badge with full scale dynamic properties)
  helper.accessor("type", {
    header: () => <span className="text-xs uppercase tracking-wider font-bold">Type</span>,
    cell: ({ getValue }) => {
      const rawType = getValue();
      if (!rawType) return null;
      
      const typeKey = rawType.toUpperCase() as keyof typeof typeConfig;
      const config = typeConfig[typeKey] || typeConfig.USER;
      const Icon = config.icon;

      return (
        <div className="flex items-center justify-start">
          <span 
            className={`flex flex-row items-center justify-center w-10 h-10 rounded-full border shadow-sm transition-transform hover:scale-105 shrink-0 ${config.className}`}
            style={config.fallbackStyles}
            title={config.label}
          >
            <Icon size={18} strokeWidth={2.5} />
          </span>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return String(row.getValue(columnId)).toUpperCase() === String(filterValue).toUpperCase();
    },
  }),

  // 4. Tool Execution Component (UPGRADED: Roomy matching badge structure with clear gaps)
  helper.accessor("toolName", {
    header: () => <span className="text-xs uppercase tracking-wider font-bold">Tool</span>,
    cell: ({ getValue }) => {
      const tool = getValue();
      if (!tool) return null;
      
      const ToolIcon = getToolIcon(tool);
      return (
        <div className="flex items-center justify-start">
          <div 
            className="flex flex-row items-center gap-3.5 rounded-xl border px-4 py-2 text-sm font-bold text-[var(--text-main)] bg-[var(--surface-sunken)] border-[var(--border)] shadow-xs whitespace-nowrap"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] shrink-0">
              <ToolIcon size={18} className="text-[var(--text-main)]" />
            </span>
            <span className="leading-none text-base tracking-wide text-[var(--text-main)] font-semibold">
              {formatToolName(tool)}
            </span>
          </div>
        </div>
      );
    },
  }),

  // 5. Latency Tracker Matrix
  helper.accessor("latency", {
    header: () => <div className="text-right text-xs uppercase tracking-wider font-bold w-full">Latency</div>,
    cell: ({ getValue }) => {
      const latency = getValue();
      if (!latency) return null;
      
      return (
        <div className="flex flex-row items-center justify-end gap-2 font-mono text-sm font-bold text-[var(--text-main)] w-full whitespace-nowrap">
          <Clock size={16} className="text-[var(--text-muted)] shrink-0" />
          <span className="leading-none text-base">{latency} <span className="text-xs font-normal text-[var(--text-muted)]">ms</span></span>
        </div>
      );
    },
  }),

  // 6. Status Column (Polished wide-aspect layout badges with explicit style properties)
  helper.accessor("success", {
    header: () => <span className="text-xs uppercase tracking-wider font-bold">Status</span>,
    cell: ({ getValue }) => {
      const success = getValue();
      if (success === null || success === undefined) return null;
      
      return (
        <div className="flex items-center justify-start">
          {success ? (
            <span 
              className="flex flex-row items-center gap-3 rounded-full border px-5 py-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap tracking-wider shadow-xs"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", borderColor: "rgba(16, 185, 129, 0.3)" }}
            >
              <CircleCheck size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="leading-none text-xs uppercase font-extrabold">Success</span>
            </span>
          ) : (
            <span 
              className="flex flex-row items-center gap-3 rounded-full border px-5 py-2.5 text-xs font-bold text-red-700 dark:text-red-400 whitespace-nowrap tracking-wider shadow-xs"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", borderColor: "rgba(239, 68, 68, 0.3)" }}
            >
              <CircleX size={16} className="shrink-0 text-red-600 dark:text-red-400" />
              <span className="leading-none text-xs uppercase font-extrabold">Failed</span>
            </span>
          )}
        </div>
      );
    },
  }),
];