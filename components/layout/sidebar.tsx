"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sunrise,
  Users,
  Gift,
  Route,
  Megaphone,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { useT } from "@/lib/i18n/context";
import { useStudioProfile } from "@/hooks/use-studio-profile";
import { BRIEFING_ACTIONS, GYM, MEMBER_COUNTS } from "@/lib/data";

interface NavItem {
  href: string;
  /** key into the `nav` namespace */
  labelKey: string;
  icon: LucideIcon;
  count?: number;
  /** renders a "Soon" pill — feature preview pages */
  soon?: boolean;
}

const NAV: NavItem[] = [
  { href: "/overview", labelKey: "overview", icon: LayoutDashboard },
  { href: "/briefing", labelKey: "briefing", icon: Sunrise, count: BRIEFING_ACTIONS.length },
  { href: "/members", labelKey: "members", icon: Users, count: MEMBER_COUNTS.all },
  { href: "/rewards", labelKey: "rewards", icon: Gift },
  { href: "/engage", labelKey: "engage", icon: Megaphone },
  { href: "/journeys", labelKey: "journeys", icon: Route, soon: true },
  { href: "/analytics", labelKey: "analytics", icon: BarChart3 },
  { href: "/settings", labelKey: "settings", icon: Settings },
];

/**
 * The sidebar's content (logo, nav, gym card) — shared by the fixed desktop
 * rail and the mobile slide-in Sheet. `onNavigate` lets the Sheet close on tap.
 */
export function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const t = useT("nav");
  const tDemo = useT("demo");
  const { personalization } = useStudioProfile();

  const planLabel = (() => {
    if (!personalization.recommendedPlanKey) return GYM.plan;
    const key =
      personalization.recommendedPlanKey === "starter"
        ? "planStarter"
        : personalization.recommendedPlanKey === "growth"
          ? "planGrowth"
          : "planPro";
    return tDemo(key);
  })();

  return (
    <>
      <div className="px-2 pb-5">
        <Link href="/overview" aria-label="FitLoyalty home" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>

      <nav className="flex flex-col gap-0.5">
        <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
          {t("workspace")}
        </p>
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
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
              <span>{t(item.labelKey)}</span>
              {item.soon && (
                <span className="ml-auto rounded-full bg-[var(--accent-subtle)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                  {t("soon")}
                </span>
              )}
              {item.count !== undefined && (
                <span
                  className={cn(
                    "ml-auto rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                    active
                      ? "bg-brand text-white"
                      : "bg-[var(--info-bg)] text-[var(--info)]",
                  )}
                >
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--accent-subtle)] text-[13px] font-bold text-brand">
            {GYM.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-tight">{GYM.name}</p>
            <p
              className={cn(
                "mt-0.5 text-[11px]",
                personalization.recommendedPlanKey ? "font-semibold text-brand" : "text-faint",
              )}
            >
              {planLabel}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface-1 px-3 pb-4 pt-4 md:flex">
      <SidebarBody />
    </aside>
  );
}
