import { Flame, Watch } from "lucide-react";

import { cn } from "@/lib/utils";

const CHALLENGES: [string, string, number][] = [
  ["🏃", "December Distance", 62],
  ["🔥", "Workout Streak", 47],
];

export function MockPhone({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-[230px] flex-col gap-3 rounded-[36px] border-[10px] border-surface-3 bg-[#0a0a0a] p-3.5 shadow-2xl",
        className,
      )}
    >
      {/* notch */}
      <div className="mx-auto mt-0.5 h-1 w-12 rounded-full bg-surface-3" />

      {/* header */}
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-lg bg-primary text-[8px] font-bold text-primary-foreground">
          CV
        </span>
        <span className="text-[10px] font-semibold text-white">CrossFit Vienna Nord</span>
      </div>

      <p className="text-sm font-bold text-white">
        Hey, Markus <span className="text-base">👋</span>
      </p>
      <p className="-mt-1.5 flex items-center gap-1 text-[9px] text-zinc-400">
        <Flame className="size-3 text-warning" /> 14-day streak · top 8%
      </p>

      {/* points card */}
      <div
        className="rounded-2xl p-3 text-white"
        style={{ background: "linear-gradient(135deg,#22c55e,#15803d)" }}
      >
        <p className="text-[7px] font-semibold uppercase tracking-wide text-white/80">
          Points this month
        </p>
        <p className="num text-2xl font-bold leading-none">2,840</p>
        <div className="mt-2 flex items-center justify-between text-[7px] text-white/90">
          <span>Next · Free PT Session</span>
          <span className="num font-semibold">160 to go</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
          <div className="h-full w-[94%] rounded-full bg-white" />
        </div>
      </div>

      <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[8px] text-zinc-300">
        <span className="size-1 rounded-full bg-success" />
        <Watch className="size-2.5" /> {`${"Apple Watch"} · 2 min`}
      </div>

      {/* challenges */}
      <div className="flex flex-col gap-2">
        {CHALLENGES.map(([emoji, title, pct]) => (
          <div key={title} className="rounded-xl bg-white/[0.04] p-2.5">
            <div className="flex items-center gap-2">
              <span className="text-sm">{emoji}</span>
              <span className="flex-1 text-[9px] font-medium text-white">{title}</span>
              <span className="num text-[9px] font-semibold text-brand">{pct}%</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
