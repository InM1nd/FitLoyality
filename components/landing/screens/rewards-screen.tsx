import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { AppChrome } from "@/components/landing/screens/app-chrome";
import { REWARDS } from "@/lib/mock-data";

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={cn("relative inline-block h-4 w-7 rounded-full transition-colors", on ? "bg-[#ff7403]" : "bg-white/12")}>
      <span className={cn("absolute top-0.5 size-3 rounded-full bg-white transition-all", on ? "left-3.5" : "left-0.5")} />
    </span>
  );
}

export function RewardsScreen() {
  return (
    <AppChrome active="Rewards" title="Rewards">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold">Rewards</span>
            <span className="ml-2 text-[10px] text-zinc-500">3 active</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#ff7403] px-2.5 py-1.5 text-[10px] font-semibold text-white">
            <Plus className="size-3" /> Create Reward
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-2.5">
          {REWARDS.map((r) => (
            <div
              key={r.id}
              className={cn(
                "flex flex-col rounded-lg border border-white/8 bg-[#111] p-3 transition-opacity",
                !r.enabled && "opacity-55",
              )}
            >
              <div className="flex items-start justify-between">
                <span className="grid size-9 place-items-center rounded-md bg-white/8 text-lg">{r.emoji}</span>
                <Toggle on={r.enabled} />
              </div>
              <p className="mt-2.5 text-[11px] font-semibold">{r.name}</p>
              <p className="mt-1 line-clamp-2 flex-1 text-[9px] leading-relaxed text-zinc-500">{r.description}</p>
              <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-2 text-[8px]">
                <span className="text-zinc-500">⚡ {r.trigger}</span>
                <span className="font-semibold text-[#ff7403]">{r.redemptions} this mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppChrome>
  );
}
