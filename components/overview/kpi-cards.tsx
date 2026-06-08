"use client";

import Link from "next/link";
import { TrendingUp, AlertTriangle, Gift, Users, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/use-count-up";
import { KPIS } from "@/lib/mock-data";

type Tone = "brand" | "warning" | "info";

interface KpiDef {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  icon: LucideIcon;
  tone: Tone;
  trend: { text: string; tone: "up" | "muted" };
  href?: string;
}

const TONE_ICON: Record<Tone, string> = {
  brand:   "bg-[var(--accent-subtle)] text-brand",
  warning: "bg-[var(--warning-bg)] text-warning",
  info:    "bg-[var(--info-bg)] text-info",
};

const TONE_ACCENT: Record<Tone, string> = {
  brand:   "bg-brand",
  warning: "bg-warning",
  info:    "bg-info",
};

const TONE_VALUE: Record<Tone, string> = {
  brand:   "text-brand",
  warning: "text-foreground",
  info:    "text-info",
};

function KpiCard({ kpi }: { kpi: KpiDef }) {
  const animated = useCountUp(kpi.value, { decimals: kpi.decimals ?? 0 });
  const display =
    (kpi.decimals ? animated.toFixed(kpi.decimals) : Math.round(animated).toLocaleString("en-US")) +
    (kpi.suffix ?? "");
  const Icon = kpi.icon;

  const inner = (
    <Card
      className={cn(
        "relative flex flex-col gap-3 overflow-hidden p-5",
        kpi.href && "transition-colors hover:border-border-strong",
      )}
    >
      {/* top accent stripe */}
      <span className={cn("absolute inset-x-0 top-0 h-[2px]", TONE_ACCENT[kpi.tone])} />

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
        <span className={cn("grid size-8 place-items-center rounded-lg", TONE_ICON[kpi.tone])}>
          <Icon className="size-[16px]" />
        </span>
      </div>
      <div className={cn("num text-[2rem] font-bold leading-none tracking-tight", TONE_VALUE[kpi.tone])}>{display}</div>
      <span
        className={cn(
          "inline-flex items-center gap-1 text-[11px] font-semibold",
          kpi.trend.tone === "up" ? "text-success" : "text-faint",
        )}
      >
        {kpi.trend.tone === "up" && <TrendingUp className="size-3" />}
        {kpi.trend.text}
      </span>
    </Card>
  );

  if (kpi.href) {
    return (
      <Link href={kpi.href} className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function KpiCards() {
  const kpis: KpiDef[] = [
    {
      label: "Active Members",
      value: KPIS.activeMembers,
      icon: Users,
      tone: "brand",
      trend: { text: `+${KPIS.activeMembersDelta} this month`, tone: "up" },
    },
    {
      label: "Retention Rate",
      value: KPIS.retentionRate,
      decimals: 1,
      suffix: "%",
      icon: TrendingUp,
      tone: "brand",
      trend: { text: `↑ ${KPIS.retentionDelta}% vs last month`, tone: "up" },
    },
    {
      label: "At-Risk Members",
      value: KPIS.atRiskMembers,
      icon: AlertTriangle,
      tone: "warning",
      trend: { text: "inactive 14+ days", tone: "muted" },
      href: "/members?filter=at-risk",
    },
    {
      label: "Rewards Redeemed",
      value: KPIS.rewardsRedeemed,
      icon: Gift,
      tone: "info",
      trend: { text: "this month", tone: "muted" },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}
