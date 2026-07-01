"use client";

import * as React from "react";
import { HeartPulse, Watch, Zap } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEVICES = [
  {
    id: "apple",
    label: "Apple Watch",
    sub: "iOS · HealthKit",
    icon: Watch,
    color: "text-[#1a1a1a]",
    bg: "bg-[#f5f5f5]",
  },
  {
    id: "fitbit",
    label: "Fitbit",
    sub: "iOS + Android",
    icon: HeartPulse,
    color: "text-[#00b0b9]",
    bg: "bg-[#00b0b9]/10",
  },
  {
    id: "garmin",
    label: "Garmin",
    sub: "iOS + Android",
    icon: Zap,
    color: "text-[#007dc5]",
    bg: "bg-[#007dc5]/10",
  },
] as const;

const STORAGE_KEY = "fitloyalty-wearable-onboarded";

export function WearableOnboardingModal() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (deviceLabel?: string) => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
    if (deviceLabel) {
      toast.success(`${deviceLabel} connected!`, {
        description: "You can now earn up to +250 bonus pts per session based on your effort.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) dismiss(); }}>
      <DialogContent className="max-w-sm p-0 overflow-hidden">
        {/* header strip */}
        <div className="bg-primary/5 border-b border-border px-6 pt-6 pb-5">
          <div className="grid size-10 place-items-center rounded-full bg-primary/10 mb-3">
            <HeartPulse className="size-5 text-brand" />
          </div>
          <DialogTitle className="text-base font-bold leading-snug">
            Earn more with every workout
          </DialogTitle>
          <DialogDescription className="mt-1 text-[12.5px] leading-relaxed">
            Connect your smartwatch to unlock effort-verified bonus points — the harder you train, the more you earn.
          </DialogDescription>
        </div>

        {/* device options */}
        <div className="flex flex-col gap-2 px-6 py-4">
          {DEVICES.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => dismiss(d.label)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-left transition-colors hover:bg-surface-2",
                )}
              >
                <div className={cn("grid size-8 shrink-0 place-items-center rounded-md", d.bg)}>
                  <Icon className={cn("size-4", d.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-tight">{d.label}</p>
                  <p className="text-[11px] text-faint">{d.sub}</p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] font-bold text-brand">+250 pts</span>
                  <span className="text-[9px] text-faint">max / session</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* base pts note + skip */}
        <div className="border-t border-border px-6 py-4">
          <p className="text-[11px] text-faint text-center mb-3">
            +50 base points per check-in regardless of wearable — no one is excluded.
          </p>
          <Button
            variant="ghost"
            className="w-full text-[12px] text-faint"
            onClick={() => dismiss()}
          >
            Skip — I&apos;ll use QR check-in only
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
