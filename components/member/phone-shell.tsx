"use client";

import * as React from "react";
import Link from "next/link";
import { Signal, Wifi, BatteryFull, Settings, LayoutDashboard } from "lucide-react";

import { BottomNav } from "@/components/member/bottom-nav";
import { MEMBER_ME } from "@/lib/mock-data";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2.5 text-[11px] font-semibold text-foreground">
      <span className="num">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="size-3.5" />
        <Wifi className="size-3.5" />
        <BatteryFull className="size-4" />
      </div>
    </div>
  );
}

function AppHeader() {
  return (
    <header className="flex items-center gap-2.5 px-5 py-3">
      <div className="grid size-8 place-items-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
        {MEMBER_ME.initials.slice(0, 2)}
      </div>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[13px] font-semibold">{MEMBER_ME.gymName}</p>
        <p className="text-[10px] text-faint">Member app</p>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <Link
          href="/overview"
          className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          title="Switch to gym admin view"
        >
          <LayoutDashboard className="mr-1 inline size-3" />
          Admin
        </Link>
        <button
          type="button"
          aria-label="Settings"
          className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2"
        >
          <Settings className="size-4" />
        </button>
      </div>
    </header>
  );
}

export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Decorative backdrop (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(60%_50%_at_50%_0%,var(--accent-subtle),transparent_70%)] md:block" />

      <div className="relative flex min-h-screen items-center justify-center md:py-8">
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background md:h-[820px] md:max-h-[90vh] md:w-[400px] md:rounded-[42px] md:border-[10px] md:border-surface-3 md:shadow-[var(--shadow-elevated)]">
          <StatusBar />
          <AppHeader />
          <main className="flex-1 overflow-y-auto">{children}</main>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
