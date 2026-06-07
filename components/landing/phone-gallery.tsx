import Link from "next/link";
import { Flame, Watch, ArrowRight, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/reveal";
import {
  MEMBER_ME,
  MEMBER_REWARDS,
  MEMBER_CHALLENGES,
  MEMBER_BADGES,
} from "@/lib/mock-data";

function Phone({
  children,
  className,
  caption,
}: {
  children: React.ReactNode;
  className?: string;
  caption: string;
}) {
  return (
    <div className={cn("shrink-0", className)}>
      <div className="w-[222px] rounded-[34px] border border-white/12 bg-[#0b0b0b] p-2.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative h-[440px] overflow-hidden rounded-[26px] bg-[#0a0a0a] text-white">
          <div className="absolute left-1/2 top-2 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-white/15" />
          <div className="h-full overflow-hidden px-3.5 pb-4 pt-6">{children}</div>
        </div>
      </div>
      <p className="mono-label mt-3 text-center t-faint">{caption}</p>
    </div>
  );
}

function HeatMini() {
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
      {MEMBER_ME.activity.slice(0, 56).map((lvl, i) => (
        <span key={i} className={cn("aspect-square rounded-[2px]", `cell cell-${lvl}`)} />
      ))}
    </div>
  );
}

function HomeScreen() {
  const c = MEMBER_CHALLENGES[0];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-md bg-[#22c55e] text-[8px] font-bold text-[#052e16]">CV</span>
        <span className="text-[10px] font-semibold">CrossFit Vienna Nord</span>
      </div>
      <div>
        <p className="text-base font-bold">Hey, Markus 👋</p>
        <p className="mt-0.5 flex items-center gap-1 text-[9px] text-zinc-400">
          <Flame className="size-3 text-[#a3e635]" /> 14-day streak · top 8%
        </p>
      </div>
      <div className="rounded-2xl p-3 text-white" style={{ background: "linear-gradient(135deg,#22c55e,#15803d)" }}>
        <p className="text-[7px] font-semibold uppercase tracking-wide opacity-90">Points this month</p>
        <p className="text-2xl font-bold leading-none">2,840</p>
        <div className="mt-2 flex justify-between text-[7px] opacity-90">
          <span>Next · Free PT Session</span><span className="font-semibold">160 to go</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/25"><div className="h-full w-[94%] rounded-full bg-white" /></div>
      </div>
      <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[8px] text-zinc-300">
        <span className="size-1 rounded-full bg-[#22c55e]" /><Watch className="size-2.5" /> Apple Watch · 2 min
      </div>
      <div className="rounded-xl bg-white/[0.04] p-2.5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{c.emoji}</span>
          <span className="flex-1 text-[9px] font-medium">{c.title}</span>
          <span className="text-[9px] font-semibold text-[#a3e635]">62%</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[62%] rounded-full bg-[#22c55e]" /></div>
      </div>
    </div>
  );
}

function RewardsScreen() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
        <p className="text-[8px] font-semibold uppercase tracking-wide text-zinc-500">Your balance</p>
        <p className="text-2xl font-bold leading-none text-[#a3e635]">2,840 <span className="text-xs text-zinc-400">pts</span></p>
      </div>
      <p className="text-[10px] font-semibold">Available rewards</p>
      <div className="flex flex-col gap-2">
        {MEMBER_REWARDS.slice(0, 4).map((r) => {
          const ok = MEMBER_ME.balance >= r.cost;
          return (
            <div key={r.id} className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-[#111] p-2.5">
              <span className="grid size-8 place-items-center rounded-md bg-white/8 text-base">{r.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold">{r.name}</p>
                <p className="text-[8px] font-semibold text-[#22c55e]">{r.cost} pts</p>
              </div>
              {ok ? (
                <span className="rounded-md bg-[#22c55e] px-2 py-1 text-[8px] font-bold text-[#052e16]">Redeem</span>
              ) : (
                <Lock className="size-3 text-zinc-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityScreen() {
  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-base font-bold">Activity</p>
      <div className="grid grid-cols-3 gap-2">
        {[["14d", "Streak"], ["2,840", "This mo"], ["642", "Workouts"]].map(([v, l]) => (
          <div key={l} className="rounded-lg border border-white/8 bg-[#111] p-2">
            <p className="text-sm font-bold leading-none">{v}</p>
            <p className="mt-1 text-[7px] text-zinc-500">{l}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/8 bg-[#111] p-3">
        <p className="mb-2 text-[8px] font-semibold uppercase tracking-wide text-zinc-500">Last 8 weeks</p>
        <HeatMini />
      </div>
      <p className="text-[8px] font-semibold uppercase tracking-wide text-zinc-500">Badges</p>
      <div className="grid grid-cols-4 gap-2">
        {MEMBER_BADGES.slice(0, 4).map((b) => (
          <div key={b.name} className="flex flex-col items-center gap-1 rounded-lg border border-white/8 bg-[#111] py-2">
            <span className="text-base">{b.emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhoneGallery() {
  return (
    <section id="member" className="relative scroll-mt-20 overflow-hidden px-5 py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.10),transparent)]" />
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label t-faint">04 — Member app</span>
            <h2 className="font-display mt-2 text-4xl font-semibold uppercase tracking-tight t-ink md:text-5xl">
              In their pocket.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">
            Your fully branded white-label app — points, streaks and one-tap rewards that keep members
            coming back.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-12 flex items-end justify-center gap-5 md:gap-8">
          <Phone caption="Rewards" className="hidden -rotate-3 md:block">
            <RewardsScreen />
          </Phone>
          <Phone caption="Home" className="z-10 md:-translate-y-6">
            <HomeScreen />
          </Phone>
          <Phone caption="Activity" className="hidden rotate-3 md:block">
            <ActivityScreen />
          </Phone>
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            href="/member"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] t-ink transition-colors hover:border-[var(--acid)] hover:t-lime"
          >
            Open the member app
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
