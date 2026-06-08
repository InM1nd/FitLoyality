import { Search, Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { AppChrome } from "@/components/landing/screens/app-chrome";
import { MEMBERS, MEMBER_COUNTS } from "@/lib/mock-data";
import type { MemberStatus } from "@/lib/types";

const TABS: [string, number, boolean][] = [
  ["All", MEMBER_COUNTS.all, true],
  ["Active", MEMBER_COUNTS.active, false],
  ["At-Risk", MEMBER_COUNTS.atRisk, false],
  ["Churned", MEMBER_COUNTS.churned, false],
];

const BADGE: Record<MemberStatus, string> = {
  active: "bg-[#ff7403]/10 text-[#ff7403]",
  "at-risk": "bg-[#f59e0b]/10 text-[#f59e0b]",
  churned: "bg-white/8 text-zinc-400",
};
const LABEL: Record<MemberStatus, string> = { active: "Active", "at-risk": "At-Risk", churned: "Churned" };

export function MembersScreen() {
  return (
    <AppChrome active="Members" title="Members">
      <div className="flex h-full flex-col gap-3">
        {/* toolbar */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">347 Members</span>
          <div className="ml-2 flex items-center gap-1.5 rounded-md border border-white/8 bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-500">
            <Search className="size-3" /> Search by name…
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-md border border-white/8 p-0.5">
            {TABS.map(([label, count, on]) => (
              <span
                key={label}
                className={cn(
                  "rounded px-2 py-1 text-[10px] font-medium",
                  on ? "bg-white/10 text-white" : "text-zinc-500",
                )}
              >
                {label} <span className="text-zinc-600">({count})</span>
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[10px] font-medium text-zinc-300">
            <Download className="size-3" /> Export
          </span>
        </div>

        {/* table */}
        <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-white/8 bg-[#111]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/8 text-[8px] uppercase tracking-wider text-zinc-500">
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold">Since</th>
                <th className="hidden px-3 py-2 font-semibold md:table-cell">Last visit</th>
                <th className="px-3 py-2 text-right font-semibold">Wk/mo</th>
                <th className="px-3 py-2 text-right font-semibold">Points</th>
                <th className="px-3 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.slice(0, 8).map((m) => (
                <tr key={m.id} className="border-b border-white/5 last:border-0">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Avatar initials={m.initials} grad={m.grad} size="sm" className="size-6 text-[9px]" />
                      <div>
                        <p className="text-[10px] font-medium leading-tight text-white">{m.name}</p>
                        <p className="text-[8px] text-zinc-500">{m.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[10px] text-zinc-400">{m.since}</td>
                  <td className="hidden px-3 py-2 text-[10px] text-zinc-400 md:table-cell">{m.lastVisit}</td>
                  <td className="px-3 py-2 text-right text-[10px] text-zinc-300">{m.workoutsThisMonth}</td>
                  <td className="px-3 py-2 text-right text-[10px] font-semibold text-white">{m.points.toLocaleString("en-US")}</td>
                  <td className="px-3 py-2">
                    <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold", BADGE[m.status])}>
                      {LABEL[m.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppChrome>
  );
}
