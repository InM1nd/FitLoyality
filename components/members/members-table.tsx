"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Download, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatNumber } from "@/lib/utils";
import { STATUS_BADGE } from "@/lib/member-status";
import { MemberSidePanel } from "@/components/members/member-side-panel";
import { NudgeModal } from "@/components/shared/nudge-modal";
import { MEMBERS, MEMBER_COUNTS } from "@/lib/data";
import type { Member, MemberSource, MemberStatus } from "@/lib/types";

const SOURCE_BADGE: Record<MemberSource, { label: string; variant: "secondary" | "info" | "success" | "warning" }> = {
  direct: { label: "Direct", variant: "secondary" },
  usc: { label: "USC", variant: "info" },
  wellpass: { label: "Wellpass", variant: "success" },
  hansefit: { label: "Hansefit", variant: "warning" },
};

type FilterKey = "all" | MemberStatus;
type SortKey = "name" | "since" | "lastVisit" | "workouts" | "points";
type SortDir = "asc" | "desc";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Mar 2021" → sortable month index (Date.parse on this format is implementation-defined). */
function parseMemberSince(s: string): number {
  const [mon, year] = s.split(" ");
  return Number(year) * 12 + MONTHS.indexOf(mon);
}

const TABS: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "All", count: MEMBER_COUNTS.all },
  { key: "active", label: "Active", count: MEMBER_COUNTS.active },
  { key: "at-risk", label: "At-Risk", count: MEMBER_COUNTS.atRisk },
  { key: "churned", label: "Churned", count: MEMBER_COUNTS.churned },
];

function SortHeader({
  label,
  active,
  dir,
  onClick,
  className,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  className?: string;
}) {
  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 uppercase transition-colors hover:text-foreground",
          active && "text-foreground",
        )}
      >
        {label}
        {active ? (
          dir === "asc" ? (
            <ArrowUp className="size-3" />
          ) : (
            <ArrowDown className="size-3" />
          )
        ) : (
          <ArrowUpDown className="size-3 opacity-50" />
        )}
      </button>
    </TableHead>
  );
}

export function MembersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");

  const [query, setQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<SortKey>("name");
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");

  const [selected, setSelected] = React.useState<Member | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [nudgeTarget, setNudgeTarget] = React.useState<string | null>(null);
  const [nudgeOpen, setNudgeOpen] = React.useState(false);

  // Filter is derived from the URL (?filter=at-risk) — set by tabs and the overview KPI card.
  const filter: FilterKey =
    filterParam === "active" || filterParam === "at-risk" || filterParam === "churned"
      ? filterParam
      : "all";

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const onTabChange = (value: string) => {
    const key = value as FilterKey;
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") params.delete("filter");
    else params.set("filter", key);
    router.replace(`/members${params.toString() ? `?${params}` : ""}`, { scroll: false });
  };

  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = MEMBERS.filter((m) => {
      const matchesFilter = filter === "all" || m.status === filter;
      const matchesQuery =
        q === "" || m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });

    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name) * dir;
        case "since":
          return (parseMemberSince(a.since) - parseMemberSince(b.since)) * dir;
        case "lastVisit":
          return (a.lastVisitDays - b.lastVisitDays) * dir;
        case "workouts":
          return (a.workoutsThisMonth - b.workoutsThisMonth) * dir;
        case "points":
          return (a.points - b.points) * dir;
        default:
          return 0;
      }
    });
  }, [query, filter, sortKey, sortDir]);

  const openMember = (m: Member) => {
    setSelected(m);
    setPanelOpen(true);
  };

  const openNudge = (name: string) => {
    setPanelOpen(false);
    setNudgeTarget(name);
    setNudgeOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or city…"
              className="pl-9"
            />
          </div>
          <Tabs value={filter} onValueChange={onTabChange} className="w-full sm:w-auto">
            <TabsList>
              {TABS.map((t) => (
                <TabsTrigger key={t.key} value={t.key}>
                  {t.label}
                  <span className="ml-1 text-faint">({t.count})</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() =>
              toast("📥 Preparing export…", {
                description: `${rows.length} members will be exported as CSV.`,
              })
            }
          >
            <Download /> Export CSV
          </Button>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <SortHeader
                  label="Name"
                  active={sortKey === "name"}
                  dir={sortDir}
                  onClick={() => toggleSort("name")}
                  className="pl-5"
                />
                <SortHeader label="Since" active={sortKey === "since"} dir={sortDir} onClick={() => toggleSort("since")} />
                <TableHead>Source</TableHead>
                <SortHeader label="Last Visit" active={sortKey === "lastVisit"} dir={sortDir} onClick={() => toggleSort("lastVisit")} />
                <SortHeader label="Workouts / Mo" active={sortKey === "workouts"} dir={sortDir} onClick={() => toggleSort("workouts")} className="text-right [&>button]:flex-row-reverse" />
                <SortHeader label="Points" active={sortKey === "points"} dir={sortDir} onClick={() => toggleSort("points")} className="text-right [&>button]:flex-row-reverse" />
                <TableHead className="pr-5">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((m) => (
                <TableRow
                  key={m.id}
                  data-state={selected?.id === m.id && panelOpen ? "selected" : undefined}
                  className="cursor-pointer"
                  onClick={() => openMember(m)}
                >
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={m.initials} grad={m.grad} size="sm" />
                      <div>
                        <p className="font-medium leading-tight">{m.name}</p>
                        <p className="text-[11px] text-faint">{m.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{m.since}</TableCell>
                  <TableCell>
                    <Badge variant={SOURCE_BADGE[m.source].variant}>
                      {SOURCE_BADGE[m.source].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{m.lastVisit}</TableCell>
                  <TableCell className="num text-right">{m.workoutsThisMonth}</TableCell>
                  <TableCell className="num text-right font-medium">{formatNumber(m.points)}</TableCell>
                  <TableCell className="pr-5">
                    <Badge variant={STATUS_BADGE[m.status].variant}>
                      {STATUS_BADGE[m.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    No members match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <MemberSidePanel
        member={selected}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        onNudge={openNudge}
      />
      <NudgeModal memberName={nudgeTarget} open={nudgeOpen} onOpenChange={setNudgeOpen} />
    </>
  );
}
