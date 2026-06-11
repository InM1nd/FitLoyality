"use client";

import * as React from "react";
import { Layers, ArrowUpRight, ArrowDownRight, UserPlus } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, formatEUR } from "@/lib/utils";
import { AGGREGATORS, DIRECT_REVENUE, CONVERSION_CANDIDATES } from "@/lib/data";

const CHANNEL_DOT: Record<string, string> = {
  direct: "bg-brand",
  usc: "bg-[var(--info)]",
  wellpass: "bg-success",
  hansefit: "bg-warning",
};

interface ChannelRow {
  id: string;
  name: string;
  revenue: number;
  trendPct: number;
  detail: string;
}

export function AggregatorHub() {
  const channels: ChannelRow[] = [
    {
      id: "direct",
      name: "Direct members",
      revenue: DIRECT_REVENUE.revenueThisMonth,
      trendPct: DIRECT_REVENUE.trendPct,
      detail: "membership MRR",
    },
    ...AGGREGATORS.map((a) => ({
      id: a.id,
      name: a.name,
      revenue: a.revenueThisMonth,
      trendPct: a.trendPct,
      detail: `${a.visitsThisMonth} visits · ~€${a.payoutPerVisit.toFixed(2).replace(/\.?0+$/, "")}/visit`,
    })),
  ];
  const total = channels.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <Card className="flex h-full flex-col" data-tour="aggregator-hub">
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-brand" />
          <CardTitle>Aggregator Hub</CardTitle>
        </div>
        <span className="rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--info)]">
          revenue mix · June
        </span>
      </CardHeader>

      <div className="flex flex-1 flex-col gap-5 p-5">
        {/* stacked revenue-mix bar */}
        <div>
          <div className="flex h-2.5 w-full gap-px overflow-hidden rounded-full">
            {channels.map((c) => (
              <span
                key={c.id}
                className={cn("h-full", CHANNEL_DOT[c.id])}
                style={{ width: `${(c.revenue / total) * 100}%` }}
              />
            ))}
          </div>
          <p className="num mt-2 text-[11px] text-faint">
            {formatEUR(total)} total this month
          </p>
        </div>

        {/* channel rows */}
        <div className="flex flex-col">
          {channels.map((c) => {
            const up = c.trendPct >= 0;
            return (
              <div
                key={c.id}
                className="flex items-center gap-3 border-b border-border py-2.5 last:border-0"
              >
                <span className={cn("size-2 shrink-0 rounded-[3px]", CHANNEL_DOT[c.id])} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{c.name}</p>
                  <p className="truncate text-[11px] text-faint">{c.detail}</p>
                </div>
                <span className="num text-[13px] font-semibold">{formatEUR(c.revenue)}</span>
                <span
                  className={cn(
                    "inline-flex w-12 items-center justify-end gap-0.5 text-[11px] font-semibold",
                    up ? "text-success" : "text-error",
                  )}
                >
                  {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(c.trendPct)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* convertible USC regulars */}
        <div className="rounded-lg border border-border bg-surface-2 p-4" data-tour="usc-converter">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">Convertible USC regulars</p>
            <span className="text-[11px] text-faint">self-paying · 3+ months loyal</span>
          </div>
          <div className="mt-3 flex flex-col gap-2.5">
            {CONVERSION_CANDIDATES.map((c) => (
              <div key={c.id} className="flex items-center gap-2.5">
                <Avatar initials={c.initials} grad={c.grad} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium">{c.name}</p>
                  <p className="text-[11px] text-faint">
                    {c.visitsPerWeek}×/week · {c.monthsLoyal} months
                  </p>
                </div>
                <span className="num text-[12px] font-semibold text-brand">
                  +{formatEUR(c.estMrr)}/mo
                </span>
                <Button size="sm" variant="secondary">
                  <UserPlus className="size-3.5" /> Offer
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
