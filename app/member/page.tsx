"use client";

import { Flame, Watch, ChevronRight, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/card";
import { useCountUp } from "@/hooks/use-count-up";
import { formatNumber } from "@/lib/utils";
import {
  MEMBER_ME,
  MEMBER_CHALLENGES,
  MEMBER_POINTS_FEED,
} from "@/lib/mock-data";

function PointsCard() {
  const points = useCountUp(MEMBER_ME.pointsThisMonth, { duration: 1400 });
  const toGo = Math.max(0, MEMBER_ME.monthlyGoal - MEMBER_ME.pointsThisMonth);
  const pct = Math.min(100, (MEMBER_ME.pointsThisMonth / MEMBER_ME.monthlyGoal) * 100);

  return (
    <div
      className="rounded-2xl p-5 text-white shadow-[var(--shadow-glow)]"
      style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
        Points this month
      </p>
      <div className="mt-1 flex items-end gap-1.5">
        <span className="num text-4xl font-bold leading-none">{formatNumber(Math.round(points))}</span>
        <span className="mb-0.5 text-sm font-medium text-white/80">pts</span>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-white/90">
          <span>Next reward · {MEMBER_ME.nextRewardName}</span>
          <span className="num font-semibold">{toGo} pts to go</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function MemberHome() {
  const firstName = MEMBER_ME.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-5 px-5 pb-6 pt-1">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hey, {firstName} 👋</h1>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Flame className="size-4 text-warning" />
          {MEMBER_ME.streak}-day streak · top {MEMBER_ME.topPercent}% at your gym
        </p>
      </div>

      <PointsCard />

      {/* Synced device */}
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium">
        <span className="size-1.5 rounded-full bg-success" />
        <Watch className="size-4 text-muted-foreground" />
        Synced · {MEMBER_ME.device} · {MEMBER_ME.syncedAgo}
      </div>

      {/* Active challenges */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Active Challenges</h2>
          <span className="text-xs text-faint">{MEMBER_CHALLENGES.length} running</span>
        </div>
        <div className="flex flex-col gap-3">
          {MEMBER_CHALLENGES.map((c) => {
            const pct = Math.min(100, (c.current / c.goal) * 100);
            return (
              <Card key={c.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-3 text-xl">
                    {c.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight">{c.title}</p>
                    <p className="text-[11px] text-faint">{c.endsIn}</p>
                  </div>
                  <span className="num text-sm font-semibold text-brand">
                    {c.current}
                    <span className="text-faint">/{c.goal}</span>
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Recent points */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Recent Points</h2>
          <TrendingUp className="size-4 text-faint" />
        </div>
        <Card className="divide-y divide-border">
          {MEMBER_POINTS_FEED.map((f) => (
            <div key={f.id} className="flex items-center gap-3 p-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium leading-tight">{f.label}</p>
                <p className="text-[11px] text-faint">{f.when}</p>
              </div>
              <span className="num text-sm font-semibold text-success">+{f.points}</span>
              <ChevronRight className="size-4 text-faint" />
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
