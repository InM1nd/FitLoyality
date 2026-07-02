"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TIER_LABELS, type RealClient, type RealClientStatus, type Tier } from "@/lib/dev-dashboard";

type ClientFormValues = Omit<RealClient, "id">;

const STATUS_LABELS: Record<RealClientStatus, string> = {
  active: "Active",
  "at-risk": "At Risk",
  churned: "Churned",
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function emptyValues(): ClientFormValues {
  return {
    name: "",
    tier: "growth",
    signedDate: today(),
    lastActiveDate: today(),
    status: "active",
    onboardingHours: 0,
    note: "",
  };
}

export function ClientFormDialog({
  open,
  onOpenChange,
  client,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** undefined = create mode */
  client?: RealClient;
  onSave: (values: ClientFormValues) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Mounted only while open, so lazy initial state below always seeds
            fresh from `client` — no effect needed to resync on reopen. */}
        {open && (
          <ClientForm
            key={client?.id ?? "new"}
            client={client}
            onCancel={() => onOpenChange(false)}
            onSave={(values) => {
              onSave(values);
              onOpenChange(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ClientForm({
  client,
  onCancel,
  onSave,
}: {
  client?: RealClient;
  onCancel: () => void;
  onSave: (values: ClientFormValues) => void;
}) {
  const [values, setValues] = React.useState<ClientFormValues>(() => (client ? { ...client } : emptyValues()));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name.trim()) return;
    onSave(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{client ? "Edit client" : "Add client"}</DialogTitle>
        <DialogDescription>Real studio, not demo data — tracked by hand as clients sign up.</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4 px-6 py-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="client-name">Studio name</Label>
          <Input
            id="client-name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder="e.g. Yoga Nord Wien"
            autoFocus
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="client-tier">Tier</Label>
            <Select value={values.tier} onValueChange={(tier: Tier) => setValues((v) => ({ ...v, tier }))}>
              <SelectTrigger id="client-tier">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(TIER_LABELS) as Tier[]).map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {TIER_LABELS[tier]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="client-status">Status</Label>
            <Select
              value={values.status}
              onValueChange={(status: RealClientStatus) => setValues((v) => ({ ...v, status }))}
            >
              <SelectTrigger id="client-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(STATUS_LABELS) as RealClientStatus[]).map((status) => (
                  <SelectItem key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="client-signed">Signed date</Label>
            <Input
              id="client-signed"
              type="date"
              value={values.signedDate}
              onChange={(e) => setValues((v) => ({ ...v, signedDate: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="client-last-active">Last active</Label>
            <Input
              id="client-last-active"
              type="date"
              value={values.lastActiveDate}
              onChange={(e) => setValues((v) => ({ ...v, lastActiveDate: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="client-hours">Founder hours spent onboarding</Label>
          <Input
            id="client-hours"
            type="number"
            min={0}
            step={0.5}
            value={values.onboardingHours}
            onChange={(e) => setValues((v) => ({ ...v, onboardingHours: Number(e.target.value) || 0 }))}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="client-note">Note</Label>
          <Textarea
            id="client-note"
            value={values.note}
            onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
            placeholder="e.g. first design partner, Wien"
            rows={2}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{client ? "Save changes" : "Add client"}</Button>
      </DialogFooter>
    </form>
  );
}
