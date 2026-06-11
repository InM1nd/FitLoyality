"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartTooltipProps } from "@/lib/chart-types";
import { CHURN_SERIES } from "@/lib/data";

function ChurnTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-input bg-surface-3 px-3 py-2 shadow-[var(--shadow-elevated)]">
      <p className="text-[11px] font-medium text-faint">{String(label)} 2026</p>
      <p className="num text-sm font-semibold text-foreground">{payload[0].value} members churned</p>
    </div>
  );
}

export function ChurnChart() {
  const max = Math.max(...CHURN_SERIES.map((d) => d.churn));
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <CardTitle>Monthly Churn Rate</CardTitle>
        <span className="text-xs text-faint">members lost · seasonal</span>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-5">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHURN_SERIES} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text-3)", fontSize: 11 }}
                dy={6}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text-3)", fontSize: 11 }}
                width={40}
              />
              <Tooltip content={<ChurnTooltip />} cursor={{ fill: "var(--surface-2)" }} />
              <Bar dataKey="churn" radius={[5, 5, 0, 0]} maxBarSize={36}>
                {CHURN_SERIES.map((d) => (
                  <Cell
                    key={d.month}
                    fill={d.churn === max ? "#ef4444" : "rgba(239,68,68,0.7)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
