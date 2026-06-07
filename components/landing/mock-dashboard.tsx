import { TrendingUp, Users, AlertTriangle, Gift } from "lucide-react";

import { cn } from "@/lib/utils";

function MiniKpi({
  label,
  value,
  delta,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  icon: typeof Users;
  tone: "brand" | "warning" | "info";
}) {
  const toneClass =
    tone === "warning"
      ? "bg-[var(--warning-bg)] text-warning"
      : tone === "info"
        ? "bg-[var(--info-bg)] text-info"
        : "bg-[var(--accent-subtle)] text-brand";
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-medium text-muted-foreground">{label}</span>
        <span className={cn("grid size-5 place-items-center rounded", toneClass)}>
          <Icon className="size-3" />
        </span>
      </div>
      <div className="num mt-2 text-lg font-bold leading-none">{value}</div>
      <div className="mt-1.5 flex items-center gap-0.5 text-[9px] font-semibold text-success">
        <TrendingUp className="size-2.5" /> {delta}
      </div>
    </div>
  );
}

const SIDEBAR = ["Overview", "Members", "Rewards", "Analytics", "Settings"];
const AREA =
  "M0 96 C 40 90, 70 72, 110 70 S 180 60, 220 48 S 300 40, 340 30 L 340 120 L 0 120 Z";
const LINE = "M0 96 C 40 90, 70 72, 110 70 S 180 60, 220 48 S 300 40, 340 30";

export function MockDashboard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border bg-background shadow-2xl",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-1 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-1 text-[9px] text-faint">
          app.fitloyalty.io/overview
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hidden w-32 shrink-0 flex-col gap-1 border-r border-border bg-surface-1 p-3 sm:flex">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="size-4 rounded bg-primary shadow-[var(--shadow-glow)]" />
            <span className="text-[10px] font-bold">
              Fit<span className="text-brand">Loyalty</span>
            </span>
          </div>
          {SIDEBAR.map((item, i) => (
            <div
              key={item}
              className={cn(
                "flex items-center gap-1.5 rounded px-2 py-1.5 text-[9px]",
                i === 0 ? "bg-[var(--accent-subtle)] text-brand" : "text-muted-foreground",
              )}
            >
              <span
                className={cn("size-1.5 rounded-full", i === 0 ? "bg-brand" : "bg-faint")}
              />
              {item}
            </div>
          ))}
        </div>

        {/* main */}
        <div className="min-w-0 flex-1 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[10px] font-semibold">Overview</span>
            <div className="ml-auto h-5 w-24 rounded-md border border-border bg-surface-1" />
            <span className="size-5 rounded-full bg-gradient-to-br from-[#22c55e] to-[#15803d]" />
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <MiniKpi label="Active" value="347" delta="+12" icon={Users} tone="brand" />
            <MiniKpi label="Retention" value="81.4%" delta="+3.2%" icon={TrendingUp} tone="brand" />
            <MiniKpi label="At-risk" value="23" delta="14d+" icon={AlertTriangle} tone="warning" />
            <MiniKpi label="Rewards" value="89" delta="month" icon={Gift} tone="info" />
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-3">
            {/* chart */}
            <div className="rounded-lg border border-border bg-surface-1 p-3 lg:col-span-2">
              <div className="mb-2 text-[9px] font-medium text-muted-foreground">
                Retention · 6 months
              </div>
              <svg viewBox="0 0 340 120" className="h-24 w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="mockArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={AREA} fill="url(#mockArea)" />
                <path d={LINE} fill="none" stroke="#22c55e" strokeWidth="2.5" />
              </svg>
            </div>
            {/* at-risk list */}
            <div className="rounded-lg border border-border bg-surface-1 p-3">
              <div className="mb-2 text-[9px] font-medium text-muted-foreground">At-risk</div>
              <div className="flex flex-col gap-2">
                {[
                  ["JH", "from-[#a78bfa] to-[#7c3aed]"],
                  ["NW", "from-[#f472b6] to-[#be185d]"],
                  ["FS", "from-[#f59e0b] to-[#b45309]"],
                ].map(([initials, grad]) => (
                  <div key={initials} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid size-5 place-items-center rounded-full bg-gradient-to-br text-[8px] font-bold text-white",
                        grad,
                      )}
                    >
                      {initials}
                    </span>
                    <span className="h-1.5 flex-1 rounded-full bg-surface-3" />
                    <span className="rounded bg-[var(--warning-bg)] px-1 py-0.5 text-[7px] font-semibold text-warning">
                      nudge
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
