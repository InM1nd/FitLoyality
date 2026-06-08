import * as React from "react";
import {
  LayoutDashboard,
  Users,
  Gift,
  BarChart3,
  Settings,
  Search,
  Bell,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV: { label: string; icon: LucideIcon }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Members", icon: Users },
  { label: "Rewards", icon: Gift },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export function AppChrome({
  active,
  title,
  children,
}: {
  active: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[460px] bg-[#0a0a0a] text-white md:h-[540px]">
      {/* sidebar */}
      <aside className="hidden w-44 shrink-0 flex-col border-r border-white/8 bg-[#111] p-3 sm:flex">
        <div className="mb-4 flex items-center gap-2 px-1.5 pt-1">
          <span className="grid size-6 place-items-center rounded-md bg-[#ff7403]">
            <svg viewBox="0 0 24 24" className="size-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 6.5 17.5 17.5" /><path d="m21 21-1-1" /><path d="m3 3 1 1" /><path d="m18 22 4-4" /><path d="m2 6 4-4" /><path d="m3 10 7-7" /><path d="m14 21 7-7" />
            </svg>
          </span>
          <span className="text-[12px] font-bold tracking-tight">
            Fit<span className="text-[#ff7403]">Loyalty</span>
          </span>
        </div>
        <p className="px-2 pb-1.5 pt-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
          Workspace
        </p>
        {NAV.map((item) => {
          const on = item.label === active;
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={cn(
                "relative flex items-center gap-2.5 rounded-md px-2 py-2 text-[11px] font-medium",
                on
                  ? "bg-[#ff7403]/10 text-[#ff7403]"
                  : "text-zinc-400",
              )}
            >
              {on && (
                <span className="absolute left-0 top-1/2 h-4 w-[2.5px] -translate-y-1/2 rounded-r-full bg-[#ff7403]" />
              )}
              <Icon className="size-3.5" />
              {item.label}
              {item.label === "Members" && (
                <span className="ml-auto rounded-full bg-[#93dafe]/10 px-1.5 text-[9px] text-[#93dafe]">347</span>
              )}
            </div>
          );
        })}
        <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] p-2">
          <span className="grid size-7 place-items-center rounded-md bg-[#ff7403]/10 text-[9px] font-bold text-[#ff7403]">CV</span>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold leading-tight">CrossFit Vienna</p>
            <span className="text-[8px] text-[#ff7403]">Pro Plan</span>
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            Workspace <span className="text-zinc-700">/</span>{" "}
            <span className="font-semibold text-[#ff7403]">{title}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md border border-white/8 bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-500">
              <Search className="size-3" /> Search…
            </div>
            <span className="relative grid size-7 place-items-center rounded-md border border-white/8 text-zinc-400">
              <Bell className="size-3.5" />
              <span className="absolute right-1 top-1 size-1 rounded-full bg-[#93dafe]" />
            </span>
            <span className="grid size-7 place-items-center rounded-full bg-[#1a1a1a] text-[9px] font-bold text-white ring-1 ring-white/10">TM</span>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden p-4">{children}</div>
      </div>
    </div>
  );
}
