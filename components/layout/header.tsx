"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Gift,
  LayoutDashboard,
  Users,
  Route,
  BarChart3,
  Settings,
  User,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { GYM, NOTIFICATIONS, RECENT_SEARCHES } from "@/lib/data";

const TITLES: Record<string, string> = {
  "/overview": "Overview",
  "/members": "Members",
  "/rewards": "Rewards",
  "/journeys": "Journeys",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

const NOTI_ICON: Record<string, LucideIcon> = {
  trending: TrendingUp,
  alert: AlertTriangle,
  gift: Gift,
};

const QUICK_NAV: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/members", label: "Members", icon: Users },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/journeys", label: "Journeys", icon: Route },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

const emptySubscribe = () => () => {};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Mount guard to avoid a theme hydration mismatch on the active-button highlight:
  // false during SSR/first client render, true after hydration — no setState needed.
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = theme !== "light";

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface-1 p-1">
      <button
        type="button"
        aria-label="Light mode"
        onClick={() => setTheme("light")}
        className={cn(
          "grid size-7 place-items-center rounded-full text-faint transition-colors",
          mounted && !isDark && "bg-surface-3 text-brand",
        )}
      >
        <Sun className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label="Dark mode"
        onClick={() => setTheme("dark")}
        className={cn(
          "grid size-7 place-items-center rounded-full text-faint transition-colors",
          mounted && isDark && "bg-surface-3 text-brand",
        )}
      >
        <Moon className="size-3.5" />
      </button>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const title = TITLES[pathname] ?? "Overview";

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (href: string) => {
    setSearchOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-20 flex h-[60px] items-center gap-4 border-b border-border bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] px-5 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex items-center gap-2 text-[13px] text-faint">
        <span>Workspace</span>
        <ChevronRight className="size-3.5" />
        <span className="font-semibold text-brand">{title}</span>
      </div>

      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="ml-auto flex h-9 w-full max-w-80 items-center gap-2 rounded-md border border-border bg-surface-1 px-3 text-sm text-faint transition-colors hover:border-border-strong"
      >
        <Search className="size-4" />
        <span>Search members, rewards…</span>
        <kbd className="ml-auto hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-faint sm:inline-block">
          ⌘K
        </kbd>
      </button>

      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-9 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <Bell className="size-[17px]" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-error ring-2 ring-surface-1" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
            <p className="text-[13px] font-semibold">Notifications</p>
            <span className="rounded-full bg-[var(--info-bg)] px-2 py-0.5 text-[11px] font-semibold text-[var(--info)]">3 new</span>
          </div>
          <div className="p-1">
            {NOTIFICATIONS.map((n) => {
              const Icon = NOTI_ICON[n.icon];
              return (
                <div
                  key={n.id}
                  className="flex gap-3 rounded-md p-2.5 transition-colors hover:bg-surface-3"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[var(--accent-subtle)] text-brand">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium leading-tight">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[11px] text-faint">{n.when}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      <ThemeToggle />

      {/* Avatar menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" aria-label="Account menu" className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
            <Avatar initials={GYM.adminInitials} grad={1} size="sm" className="size-9 text-[13px]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>
            <span className="block text-[13px] font-semibold normal-case tracking-normal text-foreground">
              {GYM.admin}
            </span>
            <span className="block text-[11px] font-normal normal-case tracking-normal text-faint">
              {GYM.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => go("/settings")}>
            <Settings /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Command palette */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search members, rewards, pages…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent searches">
            {RECENT_SEARCHES.map((s) => (
              <CommandItem key={s} value={s} onSelect={() => go("/members")}>
                <Search />
                {s}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Quick navigation">
            {QUICK_NAV.map((q) => {
              const Icon = q.icon;
              return (
                <CommandItem key={q.href} value={q.label} onSelect={() => go(q.href)}>
                  <Icon />
                  {q.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
