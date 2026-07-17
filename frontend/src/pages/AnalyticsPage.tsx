import { useEffect, useState } from "react";

import { getAnalytics } from "../api/analytics.api";
import type { Analytics } from "../types/analytics";

import { StatCard } from "@/components/stat-card";
import { TokenChart } from "@/components/charts/token-chart";
import { ToolChart } from "@/components/charts/tool-chart";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    load();

    const interval = setInterval(load, 3000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    const data = await getAnalytics();
    setAnalytics(data);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Analytics Dashboard</h1>

            <p className="mt-2 text-[var(--muted-foreground)]">
              AI Restaurant Ordering System
            </p>
          </div>

          <ThemeToggle />
        </div>

        {/* ================= KPI Row 1 ================= */}

        <div className="grid grid-cols-5 gap-4">
          <StatCard
            title="Conversations"
            value={analytics?.conversations ?? 0}
          />

          <StatCard title="Turns" value={analytics?.turns ?? 0} />

          <StatCard title="Orders" value={analytics?.ordersPlaced ?? 0} />

          <StatCard title="Tool Calls" value={analytics?.toolCalls ?? 0} />

          <StatCard
            title="Success Rate"
            value={`${analytics?.successRate.toFixed(0) ?? 0}%`}
          />
        </div>

        {/* ================= KPI Row 2 ================= */}

        <div className="mt-4 grid grid-cols-5 gap-4">
          <StatCard
            title="Prompt Tokens"
            value={analytics?.promptTokens ?? 0}
          />

          <StatCard
            title="Completion Tokens"
            value={analytics?.completionTokens ?? 0}
          />

          <StatCard title="Total Tokens" value={analytics?.totalTokens ?? 0} />

          <StatCard
            title="Avg Latency"
            value={`${analytics?.averageLatency.toFixed(0) ?? 0} ms`}
          />

          <StatCard
            title="Total Cost"
            value={`$${analytics?.totalCost.toFixed(4) ?? "0.0000"}`}
          />
        </div>

        {/* ================= Row 1 ================= */}

        <div className="mt-8 grid grid-cols-3 gap-4">
          {/* Token Chart */}

          <div className="card col-span-2 p-6">
            <h3 className="mb-6 text-lg font-semibold">Token Usage</h3>

            <TokenChart
              promptTokens={analytics?.promptTokens ?? 0}
              completionTokens={analytics?.completionTokens ?? 0}
              conversations={analytics?.conversations ?? 1}
            />
          </div>

          {/* Tool Chart */}

          <div className="card p-6">
            <h3 className="mb-6 text-lg font-semibold">Tool Success</h3>

            <ToolChart
              success={analytics?.successfulToolCalls ?? 0}
              failed={analytics?.failedToolCalls ?? 0}
            />
          </div>
        </div>

        {/* ================= Row 2 ================= */}

        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Orders */}

          <div className="card p-6">
            <h3 className="mb-6 text-lg font-semibold">Orders</h3>

            <div className="flex h-72 flex-col items-center justify-center">
              <div className="text-7xl font-bold">
                {analytics?.ordersPlaced ?? 0}
              </div>

              <p className="mt-3 text-[var(--muted-foreground)]">
                Orders Completed
              </p>
            </div>
          </div>

          {/* AI Engine */}

          <div className="card p-6">
            <h3 className="mb-6 text-lg font-semibold">AI Engine</h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Model</p>

                <p className="font-medium">Llama 4 Scout 17B</p>
              </div>

              <div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Provider
                </p>

                <p>Groq</p>
              </div>

              <div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Average Response
                </p>

                <p>{analytics?.averageLatency.toFixed(0)} ms</p>
              </div>

              <div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Total Conversations
                </p>

                <p>{analytics?.conversations ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Row 3 ================= */}

       
      </div>
    </main>
  );
}
