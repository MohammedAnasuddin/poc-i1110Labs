import { useEffect, useState } from "react";

import { getLogs } from "@/api/logs.api";

import type { AgentLog } from "@/types/log";

import { LogTable } from "@/components/logs/LogTable";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function LogsPage() {
  const [logs, setLogs] = useState<AgentLog[]>([]);

  async function load() {
    setLogs(await getLogs());
  }

  useEffect(() => {
    load();

    const id = setInterval(load, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      < ThemeToggle />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Agent Logs</h1>

          <p className="mt-2 text-[var(--muted-foreground)]">
            Every AI interaction is recorded here.
          </p>
        </div>

        <LogTable data={logs} />
      </div>
    </main>
  );
}
