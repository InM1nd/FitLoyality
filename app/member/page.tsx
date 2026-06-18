"use client";

import { Flame, Snowflake, Users, ChevronRight, TrendingUp, PartyPopper, HeartPulse } from "lucide-react";

import { WearableOnboardingModal } from "@/components/member/wearable-onboarding-modal";

import { Card } from "@/components/ui/card";
import { useCountUp } from "@/hooks/use-count-up";
import { cn, formatNumber } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";
import {
  GYM,
  MEMBER_ME,
  MEMBER_CHALLENGES,
  MEMBER_POINTS_FEED,
  OCCUPANCY,
} from "@/lib/data";

function PointsCard() {
  const t = useT("memberHome");
  const points = useCountUp(MEMBER_ME.pointsThisMonth, { duration: 1400 });
  const toGo = Math.max(0, MEMBER_ME.monthlyGoal - MEMBER_ME.pointsThisMonth);
  const pct = Math.min(100, (MEMBER_ME.pointsThisMonth / MEMBER_ME.monthlyGoal) * 100);

  return (
    <div
      className="rounded-2xl p-5 text-white shadow-[var(--shadow-glow)]"
      // white-label: gradient flows from the gym's brand color
      style={{ background: `linear-gradient(135deg, ${GYM.brandColor}, ${GYM.brandColorDark})` }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
        {t("pointsThisMonth")}
      </p>
      <div className="mt-1 flex items-end gap-1.5">
        <span className="num text-4xl font-bold leading-none">{formatNumber(Math.round(points))}</span>
        <span className="mb-0.5 text-sm font-medium text-white/80">{t("pts")}</span>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-white/90">
          <span>{t("nextReward", { name: MEMBER_ME.nextRewardName })}</span>
          <span className="num font-semibold">{t("toGo", { n: toGo })}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

function ComebackBanner() {
  const t = useT("memberHome");
  if (MEMBER_ME.comebackBonusPts <= 0) return null;
  const firstName = MEMBER_ME.name.split(" ")[0];

  return (
    <Card className="border-primary/40 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15">
          <PartyPopper className="size-5 text-brand" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">{t("welcomeBack", { name: firstName })}</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
            {t("comebackBody")}
          </p>
        </div>
        <span className="num shrink-0 text-sm font-bold text-success">
          +{MEMBER_ME.comebackBonusPts} pts
        </span>
      </div>
    </Card>
  );
}

function WorkoutTodayCard() {
  const t = useT("memberHome");
  const w = MEMBER_ME.todayWorkout;
  const total = w.checkInPts + w.intensityPts;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartPulse className="size-4 text-brand" />
          <p className="text-sm font-semibold">{t("todayWorkoutTitle")}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[10px] text-faint">
          <span className="size-1 rounded-full bg-[#93dafe]" />
          {MEMBER_ME.device} · {MEMBER_ME.syncedAgo}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
          {t("todayWorkoutLevel", { n: String(w.level), label: w.label })}
        </span>
        <span className="text-[11px] text-faint">{t("todayActiveMins", { n: String(w.activeMinutes) })}</span>
      </div>

      <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-3">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-muted-foreground">{t("ptsCheckin")}</span>
          <span className="num font-semibold text-success">+{w.checkInPts} pts</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-muted-foreground">{t("ptsIntensity", { n: String(w.level) })}</span>
          <span className="num font-semibold text-success">+{w.intensityPts} pts</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-1.5 text-[12.5px]">
          <span className="font-semibold">{t("ptsTotal")}</span>
          <span className="num font-bold text-brand">+{total} pts</span>
        </div>
      </div>
    </Card>
  );
}

function WeekStreakCard() {
  const t = useT("memberHome");
  const done = MEMBER_ME.visitsThisWeek;
  const goal = MEMBER_ME.weeklyGoal;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="size-4 text-brand" />
          <p className="text-sm font-semibold">{t("weekKeep", { n: MEMBER_ME.weekStreak + 1 })}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-3 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          <Snowflake className="size-3 text-[var(--info)]" />
          {t("freezeLeft", { n: MEMBER_ME.streakFreezes })}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {Array.from({ length: goal }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full",
              i < done ? "bg-primary" : "bg-surface-3",
            )}
          />
        ))}
      </div>
      <p className="mt-2 text-[11px] text-faint">
        {t("workoutsWeek", { done, goal })} ·{" "}
        {goal - done > 0 ? t("toGoWorkouts", { n: goal - done }) : t("goalHit")}
      </p>
    </Card>
  );
}

function OccupancyCard() {
  const t = useT("memberHome");
  const pctNow = Math.round((OCCUPANCY.now / OCCUPANCY.capacity) * 100);
  const label = pctNow < 35 ? t("quiet") : pctNow < 70 ? t("gettingBusy") : t("packed");

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-[var(--info)]" />
          <p className="text-sm font-semibold">{label}</p>
        </div>
        <span className="num text-[11px] font-semibold text-muted-foreground">
          {t("inFull", { now: OCCUPANCY.now, pct: pctNow })}
        </span>
      </div>
      <div className="mt-3 flex h-14 items-end gap-1">
        {OCCUPANCY.typicalByHour.map((h, i) => {
          const isNow = i === OCCUPANCY.currentHourIndex;
          return (
            <div key={h.hour} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={cn(
                  "w-full rounded-sm",
                  isNow ? "bg-primary" : "bg-surface-3",
                )}
                style={{ height: `${Math.max(8, h.pct * 0.56)}px` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-faint">
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>21</span>
      </div>

      {/* booking fullness straight from the class schedule — no QR needed */}
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
          {t("tonightClasses")}
        </p>
        <div className="mt-2 flex flex-col gap-2">
          {OCCUPANCY.tonightClasses.map((c) => {
            const pct = Math.round((c.booked / c.capacity) * 100);
            return (
              <div key={c.time} className="flex items-center gap-2.5">
                <span className="num w-10 shrink-0 text-[11px] font-semibold text-muted-foreground">
                  {c.time}
                </span>
                <p className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{c.name}</p>
                <div className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className={cn("h-full rounded-full", pct >= 90 ? "bg-error" : "bg-primary")}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="num w-10 shrink-0 text-right text-[11px] text-faint">
                  {c.booked}/{c.capacity}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default function MemberHome() {
  const t = useT("memberHome");
  const firstName = MEMBER_ME.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-5 px-5 pb-6 pt-1">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("hey", { name: firstName })}</h1>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Flame className="size-4 text-warning" />
          {t("streakLine", { n: MEMBER_ME.weekStreak, pct: MEMBER_ME.topPercent })}
        </p>
      </div>

      <ComebackBanner />

      <PointsCard />

      <WorkoutTodayCard />

      <WeekStreakCard />

      <OccupancyCard />

      {/* Active challenges */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">{t("activeChallenges")}</h2>
          <span className="text-xs text-faint">{t("running", { n: MEMBER_CHALLENGES.length })}</span>
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
          <h2 className="text-base font-semibold">{t("recentPoints")}</h2>
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

      <WearableOnboardingModal />
    </div>
  );
}
