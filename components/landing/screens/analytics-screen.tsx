import { Calculator } from "lucide-react";

import { AppChrome } from "@/components/landing/screens/app-chrome";
import { COHORTS, CHURN_SERIES } from "@/lib/mock-data";

function cohortColor(v: number): string {
  const stops: { p: number; c: [number, number, number] }[] = [
    { p: 0,   c: [239, 68,  68]  },
    { p: 50,  c: [245, 158, 11]  },
    { p: 100, c: [34,  197, 94]  },
  ];
  const val = Math.max(0, Math.min(100, v));
  let lo = stops[0];
  let hi = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (val >= stops[i].p && val <= stops[i + 1].p) {
      lo = stops[i];
      hi = stops[i + 1];
      break;
    }
  }
  const t = hi.p === lo.p ? 0 : (val - lo.p) / (hi.p - lo.p);
  const ch = (k: number) => Math.round(lo.c[k] + (hi.c[k] - lo.c[k]) * t);
  return `rgb(${ch(0)},${ch(1)},${ch(2)})`;
}

export function AnalyticsScreen() {
  const maxChurn = Math.max(...CHURN_SERIES.map((d) => d.churn));
  return (
    <AppChrome active="Analytics" title="Analytics">
      <div className="flex h-full flex-col gap-3">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
          {/* cohort */}
          <div className="rounded-lg border border-white/8 bg-[#111] p-3 lg:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold">Retention Cohorts</span>
              <span className="text-[8px] text-zinc-500">% retained since signup</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 pl-12 text-[8px] text-zinc-600">
                {["M0", "M1", "M2", "M3", "M4", "M5"].map((m) => (
                  <span key={m} className="flex-1 text-center">{m}</span>
                ))}
              </div>
              {COHORTS.map((c) => (
                <div key={c.label} className="flex items-center gap-1">
                  <span className="w-11 shrink-0 text-[8px] text-zinc-400">{c.label}</span>
                  {c.values.map((v, i) =>
                    v === null ? (
                      <span key={i} className="flex-1 rounded-[3px] bg-white/[0.03] py-1.5 text-center text-[8px] text-zinc-700">—</span>
                    ) : (
                      <span
                        key={i}
                        className="flex-1 rounded-[3px] py-1.5 text-center text-[8px] font-bold text-white/90"
                        style={{ backgroundColor: cohortColor(v) }}
                      >
                        {v}
                      </span>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ROI */}
          <div className="rounded-lg border border-[#ff7403]/25 bg-[#ff7403]/[0.04] p-3">
            <div className="flex items-center gap-1.5">
              <span className="grid size-6 place-items-center rounded-md bg-[#ff7403]/15 text-[#ff7403]">
                <Calculator className="size-3" />
              </span>
              <span className="text-[10px] font-semibold">Your ROI</span>
            </div>
            <div className="mt-3 space-y-1.5">
              {[["Subscription", "€99"], ["Avg. member fee", "€79"], ["Monthly churn", "15"]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-md border border-white/8 bg-[#0a0a0a] px-2 py-1.5">
                  <span className="text-[9px] text-zinc-500">{k}</span>
                  <span className="text-[10px] font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md bg-[#ff7403] p-2.5 text-center text-white">
              <div className="text-lg font-bold leading-none">€1,847</div>
              <div className="mt-1 text-[8px] opacity-80">saved / month</div>
            </div>
          </div>
        </div>

        {/* churn */}
        <div className="rounded-lg border border-white/8 bg-[#111] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold">Monthly Churn</span>
            <span className="text-[8px] text-zinc-500">seasonal · members lost</span>
          </div>
          <div className="flex h-16 items-end gap-3 px-1">
            {CHURN_SERIES.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${(d.churn / maxChurn) * 100}%`,
                    background: d.churn === maxChurn ? "#ef4444" : "rgba(239,68,68,0.6)",
                  }}
                />
                <span className="text-[8px] text-zinc-600">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppChrome>
  );
}
