"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gift, Activity, User, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface Tab {
  href: string;
  label: string;
  icon: LucideIcon;
}

const TABS: Tab[] = [
  { href: "/member", label: "Home", icon: Home },
  { href: "/member/rewards", label: "Rewards", icon: Gift },
  { href: "/member/activity", label: "Activity", icon: Activity },
  { href: "/member/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-stretch border-t border-border bg-surface-1/95 backdrop-blur-xl">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
              active ? "text-brand" : "text-faint hover:text-muted-foreground",
            )}
          >
            <Icon className={cn("size-5", active && "drop-shadow-[0_0_6px_var(--accent-glow)]")} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
