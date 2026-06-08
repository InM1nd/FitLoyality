"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartTooltipProps } from "@/lib/chart-types";
import { RETENTION_SERIES } from "@/lib/mock-data";

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 shadow-[var(--shadow-elevated)]">
      <p className="text-[11px] font-medium text-faint">{String(label)} 2026</p>
      <p className="num mt-0.5 text-sm font-bold text-foreground">
        {payload[0].value}%{" "}
        <span className="text-[11px] font-normal text-muted-foreground">retained</span>
      </p>
    </div>
  );
}

export function RetentionChart() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <CardTitle>Retention Rate — Last 6 Months</CardTitle>
        <span className="rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-brand">
          Jan – Jun 2026
        </span>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-5">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={RETENTION_SERIES} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="retentionFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--sky)" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="var(--sky)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--grid-line)"
                horizontal
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text-3)", fontSize: 11 }}
                dy={6}
              />
              <YAxis
                domain={[65, 90]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--text-3)", fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
                width={44}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: "var(--border-default)", strokeDasharray: "4 3" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--accent-brand)"
                strokeWidth={2}
                fill="url(#retentionFill)"
                dot={{ r: 3, fill: "var(--accent-brand)", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "var(--accent-brand)", stroke: "var(--surface-1)", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
