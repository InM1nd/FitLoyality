"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDevDashboard } from "@/components/dev-dashboard/store-context";
import type { ChartTooltipProps } from "@/lib/chart-types";
import {
  computeProjection,
  computeUnitEconomics,
  projectionYearEndSummary,
  SIMULATOR_DEFAULTS,
  SIMULATOR_PRESETS,
  SIMULATOR_RANGES,
  type PresetKey,
  type SimulatorInputs,
} from "@/lib/dev-dashboard";
import { formatEUR, formatNumber } from "@/lib/utils";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function FieldRow({
  label,
  value,
  range,
  onChange,
}: {
  label: string;
  value: number;
  range: { min: number; max: number; step: number };
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
        <Input
          type="number"
          min={range.min}
          max={range.max}
          step={range.step}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0, range.min, range.max))}
          className="h-7 w-24 text-right text-sm"
        />
      </div>
      <Slider
        min={range.min}
        max={range.max}
        step={range.step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-4">
      <p className="text-[11px] font-medium uppercase tracking-wider text-faint">{label}</p>
      <p className="num mt-1.5 text-xl font-bold text-foreground">{value}</p>
      {sub && <p className="mt-1 truncate text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function ProjectionTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-input bg-surface-3 px-3 py-2 shadow-[var(--shadow-elevated)]">
      <p className="text-[11px] font-medium text-faint">Month {String(label)}</p>
      <p className="num text-sm font-semibold text-foreground">{formatEUR(Number(payload[0].value ?? 0))} MRR</p>
    </div>
  );
}

const PRESET_ENTRIES = Object.entries(SIMULATOR_PRESETS) as [PresetKey, (typeof SIMULATOR_PRESETS)[PresetKey]][];

export function SimulatorTab() {
  const { data, setSimulator, replaceSimulator } = useDevDashboard();
  const inputs = data.simulator;

  const result = React.useMemo(() => computeUnitEconomics(inputs), [inputs]);
  const projection = React.useMemo(() => computeProjection(inputs), [inputs]);
  const yearEnd = React.useMemo(() => projectionYearEndSummary(projection), [projection]);

  const set = (key: keyof SimulatorInputs) => (value: number) => setSimulator({ [key]: value } as Partial<SimulatorInputs>);

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 border-b border-border">
          <div>
            <CardTitle>Unit-economics simulator</CardTitle>
            <CardDescription>Реактивный пересчёт — двигай слайдеры, цифры обновляются сразу</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_ENTRIES.map(([key, preset]) => (
              <Button
                key={key}
                type="button"
                variant="secondary"
                size="sm"
                title={preset.sub}
                onClick={() => setSimulator(preset.values)}
              >
                {preset.label}
              </Button>
            ))}
            <Button type="button" variant="ghost" size="sm" onClick={() => replaceSimulator(SIMULATOR_DEFAULTS)}>
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-x-8 gap-y-5 p-5 md:grid-cols-2 xl:grid-cols-3">
          <FieldRow label="Starter clients (€49, ≤150 members)" value={inputs.starterCount} range={SIMULATOR_RANGES.starterCount} onChange={set("starterCount")} />
          <FieldRow label="Growth clients (€149, ≤500 members)" value={inputs.growthCount} range={SIMULATOR_RANGES.growthCount} onChange={set("growthCount")} />
          <FieldRow label="Pro clients (€249 + €99/extra location)" value={inputs.proCount} range={SIMULATOR_RANGES.proCount} onChange={set("proCount")} />
          <FieldRow label="Avg extra locations per Pro client" value={inputs.proAvgExtraLocations} range={SIMULATOR_RANGES.proAvgExtraLocations} onChange={set("proAvgExtraLocations")} />
          <FieldRow label="CAC per client (€)" value={inputs.cacPerClient} range={SIMULATOR_RANGES.cacPerClient} onChange={set("cacPerClient")} />
          <FieldRow label="Monthly studio churn (%)" value={inputs.monthlyChurnPct} range={SIMULATOR_RANGES.monthlyChurnPct} onChange={set("monthlyChurnPct")} />
          <FieldRow label="WhatsApp overage convos/mo per client" value={inputs.whatsappOveragePerClient} range={SIMULATOR_RANGES.whatsappOveragePerClient} onChange={set("whatsappOveragePerClient")} />
          <FieldRow label="Cost per WhatsApp conversation (€)" value={inputs.whatsappCostPerConvo} range={SIMULATOR_RANGES.whatsappCostPerConvo} onChange={set("whatsappCostPerConvo")} />
          <FieldRow label="Founder onboarding hours / client" value={inputs.founderOnboardingHours} range={SIMULATOR_RANGES.founderOnboardingHours} onChange={set("founderOnboardingHours")} />
          <FieldRow label="Founder hourly rate (€, 0 = not counted)" value={inputs.founderHourlyRate} range={SIMULATOR_RANGES.founderHourlyRate} onChange={set("founderHourlyRate")} />
          <FieldRow label="New clients / mo (for 3-yr projection)" value={inputs.newClientsPerMonth} range={SIMULATOR_RANGES.newClientsPerMonth} onChange={set("newClientsPerMonth")} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="MRR (total)"
          value={formatEUR(result.mrr)}
          sub={`${formatEUR(result.mrrStarter)} + ${formatEUR(result.mrrGrowth)} + ${formatEUR(result.mrrPro)}`}
        />
        <StatCard label="ARR" value={formatEUR(result.arr)} />
        <StatCard
          label="Lifetime"
          value={Number.isFinite(result.lifetimeMonths) ? `${result.lifetimeMonths.toFixed(1)} mo` : "∞"}
        />
        <StatCard label="Blended ARPU" value={formatEUR(result.blendedArpu)} sub={`${formatNumber(result.totalClients)} clients`} />
        <StatCard label="Blended LTV" value={formatEUR(result.blendedLtv)} />
        <StatCard label="Blended LTV:CAC" value={`${result.blendedLtvCac.toFixed(1)}×`} />
        <StatCard label="Payback" value={`${result.paybackMonths.toFixed(1)} mo`} />
        <StatCard
          label="Effective CAC"
          value={formatEUR(result.effectiveCac)}
          sub={inputs.founderHourlyRate > 0 ? `${formatEUR(inputs.cacPerClient)} base + founder time` : "= base CAC"}
        />
        <StatCard label="WhatsApp overage / mo" value={formatEUR(result.whatsappOverageCost)} />
        <StatCard label="Net margin / mo" value={formatEUR(result.netMarginMonthly)} />
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>3-year projection</CardTitle>
          <CardDescription>New clients/mo + surviving base × (1 − churn) — simple linear cohort model</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-5">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projection} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                <CartesianGrid vertical={false} stroke="var(--grid-line)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--text-3)", fontSize: 11 }} dy={6} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--text-3)", fontSize: 11 }}
                  width={56}
                  tickFormatter={(v: number) => formatEUR(v)}
                />
                <Tooltip content={<ProjectionTooltip />} cursor={{ stroke: "var(--border-strong)" }} />
                <Line type="monotone" dataKey="mrr" stroke="var(--accent-brand)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <Table className="mt-5">
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>MRR</TableHead>
                <TableHead>ARR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {yearEnd.map((row) => (
                <TableRow key={row.year}>
                  <TableCell>Year {row.year}</TableCell>
                  <TableCell className="num">{formatEUR(row.mrr)}</TableCell>
                  <TableCell className="num">{formatEUR(row.arr)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
