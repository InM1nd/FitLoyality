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
import { Badge } from "@/components/ui/badge";
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
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface-1 px-3.5 pb-4 pt-4 md:flex">
      <div className="px-2 pb-4">
        <Link href="/overview" aria-label="FitLoyalty home">
          <Logo />
        </Link>
      </div>

      <nav className="mt-1 flex flex-col gap-0.5">
        <p className="px-2.5 pb-1.5 pt-3.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
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
                "relative flex items-center gap-3 rounded-md px-2.5 py-2.5 text-[13.5px] font-medium transition-colors",
                active
                  ? "border-l-2 border-primary bg-[var(--accent-subtle)] pl-2 text-brand"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              )}
            >
              <Icon className="size-[17px] shrink-0" />
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={cn(
                    "ml-auto rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-3 text-muted-foreground",
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
        <div className="flex items-center gap-3 rounded-md border border-border bg-surface-2 p-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-3 text-[13px] font-bold">
            {GYM.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-tight">{GYM.name}</p>
            <Badge variant="default" className="mt-1 px-2 py-0">
              {GYM.plan}
            </Badge>
          </div>
        </div>
      </div>
    </aside>
  );
}
