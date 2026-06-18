"use client";

import * as React from "react";
import { Layers, ArrowUpRight, ArrowDownRight, UserPlus, FileDown, Scale } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, formatEUR } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";
import { AGGREGATORS, DIRECT_REVENUE, CONVERSION_CANDIDATES, PAYOUT_AUDIT } from "@/lib/data";

const CHANNEL_DOT: Record<string, string> = {
  direct: "bg-brand",
  usc: "bg-[var(--info)]",
  wellpass: "bg-success",
  myclubs: "bg-[#a78bfa]", // chart-category purple, matches avatar grad 4
  hansefit: "bg-warning",
};

interface ChannelRow {
  id: string;
  name: string;
  revenue: number;
  trendPct: number;
  detail: string;
}

interface AggregatorHubProps {
  className?: string;
}

export function AggregatorHub({ className }: AggregatorHubProps) {
  const t = useT("overview");
  const channels: ChannelRow[] = [
    {
      id: "direct",
      name: t("directMembers"),
      revenue: DIRECT_REVENUE.revenueThisMonth,
      trendPct: DIRECT_REVENUE.trendPct,
      detail: t("membershipMrr"),
    },
    ...AGGREGATORS.map((a) => ({
      id: a.id,
      name: a.name,
      revenue: a.revenueThisMonth,
      trendPct: a.trendPct,
      detail: `${a.visitsThisMonth} ${t("visits")} · ~€${a.payoutPerVisit.toFixed(2).replace(/\.?0+$/, "")}/visit`,
    })),
  ];
  const total = channels.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <Card className={cn("flex h-full flex-col", className)} data-tour="aggregator-hub">
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-brand" />
          <CardTitle>{t("aggTitle")}</CardTitle>
        </div>
        <span className="rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--info)]">
          {t("aggBadge")}
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
            {t("totalThisMonth", { amount: formatEUR(total) })}
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

        {/* payout audit — logged vs paid visits per aggregator */}
        <div className="rounded-lg border border-border bg-surface-2 p-4" data-tour="payout-audit">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Scale className="size-3.5 text-brand" />
              <p className="text-[12px] font-semibold">{t("payoutAudit")}</p>
              {/* export is gated to Growth+; Starter sees discrepancies only */}
              <span className="rounded-full bg-surface-3 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-faint">
                Growth+
              </span>
            </div>
            <span className="num rounded-full bg-[var(--error-bg)] px-2 py-0.5 text-[11px] font-bold text-error">
              {formatEUR(
                PAYOUT_AUDIT.reduce(
                  (sum, r) => sum + (r.loggedVisits - r.paidVisits) * r.payoutPerVisit,
                  0,
                ),
              )}{" "}
              {t("unpaid")}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {PAYOUT_AUDIT.map((r) => {
              const missing = (r.loggedVisits - r.paidVisits) * r.payoutPerVisit;
              return (
                <div key={r.channelId} className="flex items-center gap-2.5">
                  <span className={cn("size-2 shrink-0 rounded-[3px]", CHANNEL_DOT[r.channelId])} />
                  <p className="min-w-0 flex-1 truncate text-[12px] font-medium">{r.channelName}</p>
                  <span className="num text-[11px] text-faint">
                    {r.loggedVisits} {t("logged")} → {r.paidVisits} {t("paid")}
                  </span>
                  <span
                    className={cn(
                      "num w-14 text-right text-[12px] font-semibold",
                      missing > 0 ? "text-error" : "text-success",
                    )}
                  >
                    {missing > 0 ? `−${formatEUR(missing)}` : "✓"}
                  </span>
                </div>
              );
            })}
          </div>
          <Button size="sm" variant="secondary" className="mt-3 w-full">
            <FileDown className="size-3.5" /> {t("exportClaim")}
          </Button>
        </div>

        {/* convertible USC regulars */}
        <div className="rounded-lg border border-border bg-surface-2 p-4" data-tour="usc-converter">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">{t("convertibleUsc")}</p>
            <span className="text-[11px] text-faint">{t("uscSub")}</span>
          </div>
          <div className="mt-3 flex flex-col gap-2.5">
            {CONVERSION_CANDIDATES.map((c) => (
              <div key={c.id} className="flex items-center gap-2.5">
                <Avatar initials={c.initials} grad={c.grad} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium">{c.name}</p>
                  <p className="text-[11px] text-faint">
                    {t("perWeekMonths", { visits: c.visitsPerWeek, months: c.monthsLoyal })}
                  </p>
                </div>
                <span className="num text-[12px] font-semibold text-brand">
                  +{formatEUR(c.estMrr)}/mo
                </span>
                <Button size="sm" variant="secondary">
                  <UserPlus className="size-3.5" /> {t("offer")}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
