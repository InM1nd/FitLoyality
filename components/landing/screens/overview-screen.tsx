import { TrendingUp, Users, AlertTriangle, Gift, Send, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { AppChrome } from "@/components/landing/screens/app-chrome";
import { KPIS, RETENTION_SERIES, AT_RISK_MEMBERS, REWARD_ACTIVITY } from "@/lib/mock-data";

function Kpi({
  label,
  value,
  trend,
  icon: Icon,
  tone,
  trendUp = true,
}: {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  tone: "brand" | "warn" | "info";
  trendUp?: boolean;
}) {
  const t =
    tone === "warn"
      ? "bg-[#f59e0b]/10 text-[#f59e0b]"
      : tone === "info"
        ? "bg-[#3b82f6]/10 text-[#3b82f6]"
        : "bg-[#22c55e]/10 text-[#22c55e]";
  return (
    <div className="rounded-lg border border-white/8 bg-[#111] p-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-medium text-zinc-400">{label}</span>
        <span className={cn("grid size-6 place-items-center rounded-md", t)}>
          <Icon className="size-3" />
        </span>
      </div>
      <div className="mt-2 text-xl font-bold tracking-tight">{value}</div>
      <div className={cn("mt-1 flex items-center gap-0.5 text-[9px] font-semibold", trendUp ? "text-[#22c55e]" : "text-zinc-500")}>
        {trendUp && <TrendingUp className="size-2.5" />} {trend}
      </div>
    </div>
  );
}

function RetentionChart() {
  const pts = RETENTION_SERIES;
  const W = 300;
  const H = 96;
  const min = 65;
  const max = 90;
  const x = (i: number) => (i / (pts.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / (max - min)) * H;
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-24 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ovArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#ovArea)" />
      <path d={line} fill="none" stroke="#22c55e" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function OverviewScreen() {
  return (
    <AppChrome active="Overview" title="Overview">
      <div className="flex h-full flex-col gap-3">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Kpi label="Active Members" value={String(KPIS.activeMembers)} trend={`+${KPIS.activeMembersDelta} this month`} icon={Users} tone="brand" />
          <Kpi label="Retention Rate" value={`${KPIS.retentionRate}%`} trend={`↑ ${KPIS.retentionDelta}%`} icon={TrendingUp} tone="brand" />
          <Kpi label="At-Risk" value={String(KPIS.atRiskMembers)} trend="14+ days" icon={AlertTriangle} tone="warn" trendUp={false} />
          <Kpi label="Rewards" value={String(KPIS.rewardsRedeemed)} trend="this month" icon={Gift} tone="info" trendUp={false} />
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 lg:grid-cols-3">
          <div className="rounded-lg border border-white/8 bg-[#111] p-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold">Member Retention — 6 Months</span>
              <span className="text-[9px] text-zinc-500">Jan–Jun 2026</span>
            </div>
            <RetentionChart />
            <div className="mt-1 flex justify-between px-0.5 text-[8px] text-zinc-600">
              {RETENTION_SERIES.map((p) => <span key={p.month}>{p.month}</span>)}
            </div>
          </div>

          <div className="rounded-lg border border-white/8 bg-[#111] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold">At-Risk</span>
              <span className="text-[8px] text-zinc-500">14+ days</span>
            </div>
            <div className="flex flex-col gap-2">
              {AT_RISK_MEMBERS.slice(0, 3).map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  <Avatar initials={m.initials} grad={m.grad} size="sm" className="size-6 text-[9px]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium leading-tight text-white">{m.name}</p>
                    <p className="text-[8px] text-zinc-500">{m.lastVisit}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#22c55e]/10 px-1.5 py-1 text-[8px] font-semibold text-[#22c55e]">
                    <Send className="size-2.5" /> Nudge
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/8 bg-[#111]">
          <div className="border-b border-white/8 px-3 py-2 text-[10px] font-semibold">Recent Reward Activity</div>
          <table className="w-full text-left">
            <tbody>
              {REWARD_ACTIVITY.slice(0, 3).map((a) => (
                <tr key={a.id} className="border-b border-white/5 last:border-0">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Avatar initials={a.initials} grad={a.grad} size="sm" className="size-5 text-[8px]" />
                      <span className="text-[10px] font-medium">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[10px] text-zinc-300">
                    <span className="mr-1">{a.emoji}</span>{a.reward}
                  </td>
                  <td className="hidden px-3 py-2 text-[9px] text-zinc-500 md:table-cell">{a.triggeredBy}</td>
                  <td className="px-3 py-2 text-right text-[10px] font-semibold text-[#22c55e]">{a.points > 0 ? `+${a.points}` : "—"}</td>
                  <td className="px-3 py-2 text-right text-[9px] text-zinc-500">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppChrome>
  );
}
