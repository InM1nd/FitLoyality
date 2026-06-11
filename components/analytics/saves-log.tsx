import { PiggyBank } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatEUR } from "@/lib/utils";
import { SAVED_LOG } from "@/lib/data";

const CHANNEL_VARIANT = {
  WhatsApp: "success",
  Email: "info",
  Push: "secondary",
} as const;

export function SavesLog() {
  const total = SAVED_LOG.reduce((sum, s) => sum + s.mrr, 0);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <PiggyBank className="size-4 text-brand" />
          <CardTitle>Saves This Month</CardTitle>
        </div>
        <span className="num rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-brand">
          {formatEUR(total)} MRR kept
        </span>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead className="hidden md:table-cell">Churn-window trigger</TableHead>
            <TableHead className="hidden sm:table-cell">Nudged</TableHead>
            <TableHead>Returned</TableHead>
            <TableHead className="text-right">MRR kept</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SAVED_LOG.map((s) => (
            <TableRow key={s.id}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar initials={s.initials} grad={s.grad} size="sm" />
                  <span className="text-[13px] font-medium">{s.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden text-[12px] text-muted-foreground md:table-cell">
                {s.trigger}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-muted-foreground">{s.nudgedOn}</span>
                  <Badge variant={CHANNEL_VARIANT[s.channel]} className="hidden lg:inline-flex">
                    {s.channel}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-[12px] text-muted-foreground">
                after {s.returnedAfterDays}d
              </TableCell>
              <TableCell className="num text-right text-[13px] font-semibold text-success">
                +{formatEUR(s.mrr)}/mo
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p className="border-t border-border px-5 py-3 text-[11px] text-faint">
        Attribution rule: nudged while in the churn window → visited again within 7 days.
        Conservative by design — unattributed returns don&apos;t count.
      </p>
    </Card>
  );
}
