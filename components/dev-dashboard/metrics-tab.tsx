"use client";

import * as React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClientFormDialog } from "@/components/dev-dashboard/client-form-dialog";
import { useDevDashboard } from "@/components/dev-dashboard/store-context";
import {
  computeAvgOnboardingHours,
  computeRealChurnRate,
  computeRealMrr,
  daysSinceLastActive,
  lastActiveRisk,
  METRICS_PERIODS,
  TIER_LABELS,
  type MetricsPeriod,
  type RealClient,
  type RealClientStatus,
} from "@/lib/dev-dashboard";
import { formatEUR } from "@/lib/utils";

const STATUS_VARIANT: Record<RealClientStatus, "success" | "warning" | "error"> = {
  active: "success",
  "at-risk": "warning",
  churned: "error",
};

const STATUS_LABELS: Record<RealClientStatus, string> = {
  active: "Active",
  "at-risk": "At Risk",
  churned: "Churned",
};

const ROW_RISK_CLASS: Record<"none" | "warning" | "error", string> = {
  none: "",
  warning: "bg-[var(--warning-bg)]",
  error: "bg-[var(--error-bg)]",
};

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-4">
      <p className="text-[11px] font-medium uppercase tracking-wider text-faint">{label}</p>
      <p className="num mt-1.5 text-xl font-bold text-foreground">{value}</p>
      {sub && <p className="mt-1 text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function MetricsTab() {
  const { data, addClient, updateClient, deleteClient } = useDevDashboard();
  const { clients } = data;

  const [period, setPeriod] = React.useState<MetricsPeriod>("all");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<RealClient | undefined>(undefined);

  const mrr = React.useMemo(() => computeRealMrr(clients), [clients]);
  const churnRate = React.useMemo(() => computeRealChurnRate(clients, period), [clients, period]);
  const avgHours = React.useMemo(() => computeAvgOnboardingHours(clients), [clients]);
  const inactiveCount = React.useMemo(
    () => clients.filter((c) => c.status !== "churned" && daysSinceLastActive(c.lastActiveDate) > 14).length,
    [clients],
  );

  function openAdd() {
    setEditing(undefined);
    setDialogOpen(true);
  }

  function openEdit(client: RealClient) {
    setEditing(client);
    setDialogOpen(true);
  }

  function handleSave(values: Omit<RealClient, "id">) {
    if (editing) {
      updateClient(editing.id, values);
    } else {
      addClient(values);
    }
  }

  function handleDelete(client: RealClient) {
    if (window.confirm(`Delete ${client.name}? This can't be undone (except via Import).`)) {
      deleteClient(client.id);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Real MRR" value={formatEUR(mrr)} sub={`${clients.filter((c) => c.status !== "churned").length} paying clients`} />
        <StatCard label={`Churn (${METRICS_PERIODS.find((p) => p.value === period)?.label})`} value={`${churnRate.toFixed(1)}%`} />
        <StatCard label="Avg founder hours / client" value={avgHours.toFixed(1)} />
        <StatCard label="Inactive >14 days" value={String(inactiveCount)} sub="proxy for churn risk" />
      </div>

      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 border-b border-border">
          <div>
            <CardTitle>Real clients</CardTitle>
            <CardDescription>Manually tracked — not synced from the simulator</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={(v: MetricsPeriod) => setPeriod(v)}>
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {METRICS_PERIODS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="button" size="sm" onClick={openAdd}>
              <Plus className="size-3.5" />
              Add client
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {clients.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No real clients tracked yet — add the first one.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Studio</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Signed</TableHead>
                  <TableHead>Last active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Onboarding hrs</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="w-[88px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => {
                  const risk = client.status === "churned" ? "none" : lastActiveRisk(client.lastActiveDate);
                  return (
                    <TableRow key={client.id} className={ROW_RISK_CLASS[risk]}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{TIER_LABELS[client.tier]}</TableCell>
                      <TableCell>{client.signedDate}</TableCell>
                      <TableCell>
                        {client.lastActiveDate}
                        <span className="ml-1.5 text-[11px] text-faint">
                          ({daysSinceLastActive(client.lastActiveDate)}d ago)
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[client.status]}>{STATUS_LABELS[client.status]}</Badge>
                      </TableCell>
                      <TableCell className="num">{client.onboardingHours}</TableCell>
                      <TableCell className="max-w-[220px] truncate text-muted-foreground" title={client.note}>
                        {client.note}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button type="button" variant="ghost" size="icon" className="size-7" onClick={() => openEdit(client)}>
                            <Pencil className="size-3.5" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button type="button" variant="ghost" size="icon" className="size-7" onClick={() => handleDelete(client)}>
                            <Trash2 className="size-3.5" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ClientFormDialog open={dialogOpen} onOpenChange={setDialogOpen} client={editing} onSave={handleSave} />
    </div>
  );
}
