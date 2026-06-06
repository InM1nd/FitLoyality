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
          className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
        >
          View all <ArrowRight className="size-3.5" />
        </Link>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-5">Member</TableHead>
            <TableHead>Reward</TableHead>
            <TableHead>Triggered By</TableHead>
            <TableHead className="text-right">Points</TableHead>
            <TableHead className="pr-5 text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {REWARD_ACTIVITY.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="pl-5">
                <div className="flex items-center gap-2.5">
                  <Avatar initials={a.initials} grad={a.grad} size="sm" />
                  <span className="font-medium">{a.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <span className="text-base">{a.emoji}</span>
                  {a.reward}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">{a.triggeredBy}</TableCell>
              <TableCell className="num text-right font-medium">
                {a.points > 0 ? `+${a.points}` : "—"}
              </TableCell>
              <TableCell className="pr-5 text-right text-muted-foreground">{a.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
