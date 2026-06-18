"use client";

import Link from "next/link";
import { CalendarClock, ArrowUpRight } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";
import { OCCUPANCY } from "@/lib/data";

export function ClassOccupancyTeaser() {
  const t = useT("overview");

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{t("classOccTitle")}</CardTitle>
            <p className="mt-1 text-[12px] text-muted-foreground">{t("classOccDesc")}</p>
          </div>
          <CalendarClock className="size-4 shrink-0 text-[var(--info)]" />
        </div>
      </CardHeader>

      <div className="flex flex-1 flex-col gap-2 px-5 pb-5">
        {OCCUPANCY.tonightClasses.map((cls) => {
          const pct = Math.round((cls.booked / cls.capacity) * 100);
          const busy = pct >= 90;
          return (
            <div key={`${cls.time}-${cls.name}`} className="rounded-lg border border-border bg-surface-2 px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold">{cls.name}</p>
                  <p className="text-[11px] text-faint">{cls.time}</p>
                </div>
                <span
                  className={cn(
                    "shrink-0 text-[12px] font-semibold tabular-nums",
                    busy ? "text-error" : "text-muted-foreground",
                  )}
                >
                  {cls.booked}/{cls.capacity}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
                <div
                  className={cn("h-full rounded-full transition-all", busy ? "bg-error" : "bg-[var(--info)]")}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}

        <Button variant="outline" size="sm" className="mt-auto w-full" asChild>
          <Link href="/member">
            {t("classOccCta")}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
