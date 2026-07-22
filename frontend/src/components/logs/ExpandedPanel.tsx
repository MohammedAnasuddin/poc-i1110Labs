import { useState } from "react";
import {
  Copy,
  Check,
  Terminal,
  CornerDownRight,
  Zap,
  ArrowUpRight,
  FileText,
  CircleCheck,
  CircleX,
  HelpCircle,
  Clock,
} from "lucide-react";
import type { AgentLog } from "../../types/AgentLog";

type ExpandedPanelProps = {
  log: AgentLog;
};

async function copyText(text: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }
}

function DebuggingCard({
  title,
  data,
  icon: Icon,
  isJson = true,
}: {
  title: string;
  data: any;
  icon: any;
  isJson?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const jsonString = isJson
    ? JSON.stringify(data ?? {}, null, 2)
    : String(data || "—");

  const handleCopy = async () => {
    await copyText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs flex flex-col transition-all hover:border-slate-300 dark:hover:border-slate-700">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
          <Icon size={14} className="text-[var(--primary)]" /> {title}
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--text-muted)] hover:bg-[var(--secondary)] cursor-pointer active:scale-95 transition-all"
        >
          {copied ? (
            <Check size={12} className="text-emerald-500" />
          ) : (
            <Copy size={12} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {isJson ? (
        <pre className="rounded-lg bg-[var(--surface-sunken)] p-3 overflow-auto text-xs font-mono border border-[var(--border)] max-h-56 text-[var(--text-main)] flex-1">
          {jsonString}
        </pre>
      ) : (
        <div className="rounded-lg bg-[var(--surface-sunken)] p-3 text-xs font-mono text-[var(--text-main)] border border-[var(--border)] whitespace-pre-wrap flex-1">
          {jsonString}
        </div>
      )}
    </div>
  );
}

export function ExpandedPanel({ log }: ExpandedPanelProps) {
  return (
    <div className="space-y-6">
      <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] px-1">
        Inspect Trace Execution
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DebuggingCard
          title="Message Trace"
          data={log.message}
          icon={FileText}
          isJson={false}
        />
        <DebuggingCard
          title="Arguments payload"
          data={log.toolArguments}
          icon={Terminal}
        />
        <DebuggingCard
          title="Response payload"
          data={log.toolResponse}
          icon={CornerDownRight}
        />

        {/* Premium Performance Diagnostics Block */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs flex flex-col transition-all hover:border-slate-300 dark:hover:border-slate-700">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
            <Zap size={14} className="text-[var(--primary)]" /> Performance &
            Health metrics
          </h4>
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] flex items-center gap-2">
                  <ArrowUpRight size={14} className="text-blue-500" /> Prompt
                  Tokens
                </span>
                <span className="font-mono font-bold text-[var(--text-main)] bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border)]">
                  {log.promptTokens ?? "—"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] flex items-center gap-2">
                  <CornerDownRight size={14} className="text-violet-500" />{" "}
                  Completion Tokens
                </span>
                <span className="font-mono font-bold text-[var(--text-main)] bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border)]">
                  {log.completionTokens ?? "—"}
                </span>
              </div>
              <hr className="border-dashed border-[var(--border)] my-2" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] flex items-center gap-2">
                  <Clock size={14} className="text-amber-500" /> Latency
                </span>
                <span className="font-mono font-bold text-[var(--text-main)] bg-[var(--surface-sunken)] px-2 py-0.5 rounded border border-[var(--border)]">
                  {log.latency ? `${log.latency} ms` : "—"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-4 border-t border-[var(--border)] mt-2">
              <span className="text-[var(--text-muted)] font-medium">
                Execution Status
              </span>
              <span>
                {log.success == null ? (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-xs border border-slate-200">
                    <HelpCircle size={13} /> N/A
                  </span>
                ) : log.success ? (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full text-xs border border-emerald-500/20">
                    <CircleCheck size={13} /> Success
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-rose-600 bg-rose-500/10 px-3 py-1 rounded-full text-xs border border-rose-500/20">
                    <CircleX size={13} /> Failed
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
