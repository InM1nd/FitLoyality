"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Flame, Dumbbell, Star, Watch } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import type { ChartTooltipProps } from "@/lib/chart-types";
import { MEMBER_ME, MEMBER_BADGES } from "@/lib/data";
import { useT } from "@/lib/i18n/context";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function heatClass(level: number): string {
  switch (level) {
    case 1:
      return "bg-[rgba(34,197,94,0.25)]";
    case 2:
      return "bg-[rgba(34,197,94,0.45)]";
    case 3:
      return "bg-[rgba(34,197,94,0.7)]";
    case 4:
      return "bg-primary shadow-[0_0_6px_var(--accent-glow)]";
    default:
      return "bg-surface-3";
  }
}

function PointsTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-input bg-surface-3 px-2.5 py-1.5 text-xs shadow-[var(--shadow-elevated)]">
      <p className="text-[10px] text-faint">{String(label)}</p>
      <p className="num font-semibold">{formatNumber(Number(payload[0].value))} pts</p>
    </div>
  );
}

export default function MemberActivity() {
  const t = useT("memberHome");
  const chartData = MEMBER_ME.pointsHistory.map((value, i) => ({ month: MONTHS[i], value }));

  const stats = [
    { icon: Flame, label: t("actStatStreak"), value: `${MEMBER_ME.weekStreak}w` },
    { icon: Star, label: t("actStatMonth"), value: formatNumber(MEMBER_ME.pointsThisMonth) },
    { icon: Dumbbell, label: t("actStatWorkouts"), value: formatNumber(MEMBER_ME.lifetimeWorkouts) },
  ];

  return (
    <div className="flex flex-col gap-5 px-5 pb-6 pt-1">
      <h1 className="text-2xl font-bold tracking-tight">{t("activityPageTitle")}</h1>
      <div className="flex items-center gap-1.5 -mt-3 text-[11px] text-faint">
        <Watch className="size-3.5 text-brand" />
        <span>{t("wearableSyncFrom", { device: MEMBER_ME.device, ago: MEMBER_ME.syncedAgo })}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-3">
              <Icon className="size-4 text-brand" />
              <p className="num mt-2 text-base font-bold leading-none">{s.value}</p>
              <p className="mt-1 text-[10px] text-faint">{s.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Last workout breakdown */}
      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">{t("ptsBreakdown")}</p>
          <span className="inline-flex items-center rounded-lg bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
            {t("todayWorkoutLevel", { n: String(MEMBER_ME.todayWorkout.level), label: MEMBER_ME.todayWorkout.label })}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">{t("ptsCheckin")}</span>
            <span className="num font-semibold text-success">+{MEMBER_ME.todayWorkout.checkInPts} pts</span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">{t("ptsIntensity", { n: String(MEMBER_ME.todayWorkout.level) })}</span>
            <span className="num font-semibold text-success">+{MEMBER_ME.todayWorkout.intensityPts} pts</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-1.5 text-[12.5px]">
            <span className="font-semibold">{t("ptsTotal")}</span>
            <span className="num font-bold text-brand">+{MEMBER_ME.todayWorkout.checkInPts + MEMBER_ME.todayWorkout.intensityPts} pts</span>
          </div>
        </div>
      </Card>

      {/* Heatmap */}
      <section>
        <h2 className="mb-3 text-sm font-semibold">{t("actLast8weeks")}</h2>
        <Card className="p-4">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5">
            {MEMBER_ME.activity.map((level, i) => (
              <div key={i} className={cn("aspect-square rounded-sm", heatClass(level))} />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-faint">
            <span>{t("actHeatLess")}</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className={cn("size-2.5 rounded-sm", heatClass(l))} />
            ))}
            <span>{t("actHeatMore")}</span>
          </div>
        </Card>
      </section>

      {/* Points history */}
      <section>
        <h2 className="mb-3 text-sm font-semibold">{t("actPoints6months")}</h2>
        <Card className="p-4">
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
                <defs>
                  <linearGradient id="memberPts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-brand)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--accent-brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--text-3)", fontSize: 10 }}
                  dy={4}
                />
                <Tooltip content={<PointsTooltip />} cursor={{ stroke: "var(--border-strong)", strokeDasharray: 4 }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--accent-brand)"
                  strokeWidth={2.5}
                  fill="url(#memberPts)"
                  dot={{ r: 2.5, fill: "var(--accent-brand)", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Badges */}
      <section>
        <h2 className="mb-3 text-sm font-semibold">{t("actBadgesTitle")}</h2>
        <div className="grid grid-cols-4 gap-2.5">
          {MEMBER_BADGES.map((b) => (
            <div
              key={b.name}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border border-border p-2.5 text-center",
                b.earned ? "bg-surface-2" : "bg-surface-1 opacity-40 grayscale",
              )}
            >
              <span className="text-2xl">{b.emoji}</span>
              <span className="text-[9px] font-medium leading-tight text-muted-foreground">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
