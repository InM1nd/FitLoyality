import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { REWARD_ACTIVITY } from "@/lib/mock-data";

export function ActivityTable() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <CardTitle>Recent Reward Activity</CardTitle>
        <Link
          href="/members"
          className="group inline-flex items-center gap-1 text-[12px] font-semibold text-brand transition-opacity hover:opacity-80"
        >
          View all
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-5 text-[11px]">Member</TableHead>
            <TableHead className="text-[11px]">Reward</TableHead>
            <TableHead className="text-[11px]">Triggered By</TableHead>
            <TableHead className="text-right text-[11px]">Points</TableHead>
            <TableHead className="pr-5 text-right text-[11px]">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {REWARD_ACTIVITY.map((a) => (
            <TableRow key={a.id} className="group">
              <TableCell className="pl-5">
                <div className="flex items-center gap-2.5">
                  <Avatar initials={a.initials} grad={a.grad} size="sm" />
                  <span className="font-medium">{a.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <span className="text-base leading-none">{a.emoji}</span>
                  <span className="text-sm">{a.reward}</span>
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-[11px] font-medium text-info">
                  {a.triggeredBy}
                </span>
              </TableCell>
              <TableCell className="num text-right text-sm font-semibold text-brand">
                {a.points > 0 ? `+${a.points}` : <span className="text-faint">—</span>}
              </TableCell>
              <TableCell className="pr-5 text-right text-sm text-muted-foreground">{a.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
