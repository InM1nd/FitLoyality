"use client";

import * as React from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { INTEGRATIONS } from "@/lib/data";
import type { Integration } from "@/lib/types";

export function Integrations() {
  const [items, setItems] = React.useState<Integration[]>(INTEGRATIONS);
  const [active, setActive] = React.useState<Integration | null>(null);
  const [apiKey, setApiKey] = React.useState("");

  const connect = () => {
    if (!active) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === active.id
          ? { ...i, connected: true, detail: "Connected · just now" }
          : i,
      ),
    );
    toast.success(`${active.name} connected`, { description: "Sync will begin shortly." });
    setActive(null);
    setApiKey("");
  };

  return (
    <>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="text-base">Integrations</CardTitle>
          <CardDescription>Connect the tools that already run your studio.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-5">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-surface-2 p-4"
            >
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  it.connected ? "bg-success" : "bg-faint",
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium leading-tight">{it.name}</p>
                <p className="truncate text-xs text-muted-foreground">{it.detail}</p>
              </div>
              {it.connected ? (
                <span className="text-xs font-medium text-success">Connected</span>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setActive(it);
                    setApiKey("");
                  }}
                >
                  Connect
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Connect {active?.name}</DialogTitle>
            <DialogDescription>{active?.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 p-6">
            <Label htmlFor="api-key">Enter your {active?.name} API key</Label>
            <Input
              id="api-key"
              placeholder="sk_live_•••••••••••••••"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setActive(null)}>
              Cancel
            </Button>
            <Button onClick={connect} disabled={apiKey.trim().length === 0}>
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
