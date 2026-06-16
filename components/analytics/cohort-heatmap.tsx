"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useT } from "@/lib/i18n/context";
import { COHORTS, COHORT_SIZES } from "@/lib/data";

function cellColor(value: number): string {
  const stops = [
    { p: 0, c: [239, 68, 68] },
    { p: 50, c: [245, 158, 11] },
    { p: 100, c: [34, 197, 94] },
  ];
  const v = Math.max(0, Math.min(100, value));
  let lo = stops[0];
  let hi = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (v >= stops[i].p && v <= stops[i + 1].p) {
      lo = stops[i];
      hi = stops[i + 1];
      break;
    }
  }
  const t2 = hi.p === lo.p ? 0 : (v - lo.p) / (hi.p - lo.p);
  const ch = (i: number) => Math.round(lo.c[i] + (hi.c[i] - lo.c[i]) * t2);
  return `rgb(${ch(0)}, ${ch(1)}, ${ch(2)})`;
}

const MONTH_KEYS = ["Month 0", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5"];

export function CohortHeatmap() {
  const t = useT("analytics");
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <CardTitle>{t("cohortTitle")}</CardTitle>
        <span className="text-xs text-faint">{t("cohortSub")}</span>
      </CardHeader>
      <div className="overflow-x-auto p-5">
        <table className="w-full border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="px-2 pb-2 text-left text-[11px] font-semibold text-faint">{t("cohortCol")}</th>
              {MONTH_KEYS.map((m) => (
                <th key={m} className="px-2 pb-2 text-center text-[11px] font-semibold text-faint">
                  {m.replace("Month ", "M")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COHORTS.map((cohort) => {
              const size = COHORT_SIZES[cohort.label] ?? 0;
              return (
                <tr key={cohort.label}>
                  <td className="whitespace-nowrap pr-3 text-left text-xs font-medium text-muted-foreground">
                    {cohort.label}
                  </td>
                  {cohort.values.map((value, i) => {
                    if (value === null) {
                      return (
                        <td key={i} className="rounded-md bg-surface-2 px-2 py-2.5 text-center text-xs text-faint">
                          —
                        </td>
                      );
                    }
                    const members = Math.round((value / 100) * size);
                    return (
                      <td key={i} className="p-0">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="num cursor-default rounded-md px-2 py-2.5 text-center text-xs font-semibold text-[#052e16]"
                              style={{ backgroundColor: cellColor(value) }}
                            >
                              {value}%
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("cohortTooltip", {
                              label: cohort.label,
                              month: MONTH_KEYS[i],
                              pct: String(value),
                              members: String(members),
                              size: String(size),
                            })}
                          </TooltipContent>
                        </Tooltip>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
