"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gift,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { GYM, MEMBER_COUNTS } from "@/lib/mock-data";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

const NAV: NavItem[] = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/members", label: "Members", icon: Users, count: MEMBER_COUNTS.all },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface-1 px-3 pb-4 pt-4 md:flex">
      <div className="px-2 pb-5">
        <Link href="/overview" aria-label="FitLoyalty home">
          <Logo />
        </Link>
      </div>

      <nav className="flex flex-col gap-0.5">
        <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
          Workspace
        </p>
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[13.5px] font-medium transition-all",
                active
                  ? "bg-[var(--accent-subtle)] text-brand"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand" />
              )}
              <Icon
                className={cn(
                  "size-[17px] shrink-0 transition-colors",
                  active ? "text-brand" : "text-faint group-hover:text-foreground",
                )}
              />
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={cn(
                    "ml-auto rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                    active
                      ? "bg-brand text-white"
                      : "bg-[var(--info-bg)] text-info",
                  )}
                >
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--accent-subtle)] text-[13px] font-bold text-brand">
            {GYM.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-tight">{GYM.name}</p>
            <p className="mt-0.5 text-[11px] text-faint">{GYM.plan}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
