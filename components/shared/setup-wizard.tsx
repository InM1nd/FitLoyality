"use client";

import * as React from "react";
import { Dumbbell, Users, Globe, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/context";
import { useStudioProfile } from "@/hooks/use-studio-profile";
import { REOPEN_WIZARD_EVENT } from "@/lib/studio-profile";
import type { AggregatorChoice, SizeRange, StudioProfile, StudioType } from "@/lib/studio-profile";

const STUDIO_TYPES: { id: StudioType; labelKey: string; subKey: string }[] = [
  { id: "yoga", labelKey: "typeYoga", subKey: "typeYogaSub" },
  { id: "crossfit", labelKey: "typeCrossfit", subKey: "typeCrossfitSub" },
  { id: "opengym", labelKey: "typeOpengym", subKey: "typeOpengymSub" },
  { id: "other", labelKey: "typeOther", subKey: "typeOtherSub" },
];

const SIZES: { id: SizeRange; labelKey: string; subKey: string }[] = [
  { id: "small", labelKey: "sizeSmall", subKey: "sizeSmallSub" },
  { id: "medium", labelKey: "sizeMedium", subKey: "sizeMediumSub" },
  { id: "large", labelKey: "sizeLarge", subKey: "sizeLargeSub" },
];

const AGGREGATOR_OPTIONS: { id: AggregatorChoice; labelKey: string; subKey: string }[] = [
  { id: "yes", labelKey: "aggYes", subKey: "aggYesSub" },
  { id: "none", labelKey: "aggNo", subKey: "aggNoSub" },
];

const STUDIO_TYPE_LABEL_KEY: Record<StudioType, string> = {
  yoga: "typeYogaShort",
  crossfit: "typeCrossfitShort",
  opengym: "typeOpengymShort",
  other: "typeOtherShort",
};

export function SetupWizard() {
  const t = useT("setupWizard");
  const { hydrated, wizardPending, saveProfile } = useStudioProfile();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<"type" | "size" | "aggregators">("type");
  const [profile, setProfile] = React.useState<Partial<StudioProfile>>({});

  React.useEffect(() => {
    const timer = setTimeout(() => setOpen(wizardPending), wizardPending ? 400 : 0);
    return () => clearTimeout(timer);
  }, [wizardPending]);

  React.useEffect(() => {
    const reopen = () => {
      setStep("type");
      setProfile({});
      setOpen(true);
    };
    window.addEventListener(REOPEN_WIZARD_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_WIZARD_EVENT, reopen);
  }, []);

  const finish = (final: StudioProfile) => {
    saveProfile(final);
    setOpen(false);
    const studioLabel = t(STUDIO_TYPE_LABEL_KEY[final.studioType]);
    const sizeLabel = t(SIZES.find((s) => s.id === final.size)?.labelKey ?? "sizeSmall");
    toast.success(t("configuredToast"), {
      description: t("configuredToastDesc", {
        studio: studioLabel,
        size: sizeLabel,
        agg:
          final.aggregators === "yes"
            ? t("configuredAggOn")
            : t("configuredAggOff"),
      }),
    });
  };

  const skip = () => {
    saveProfile("skipped");
    setOpen(false);
  };

  if (!hydrated) return null;

  const stepNum = step === "type" ? "1" : step === "size" ? "2" : "3";
  const progress = step === "type" ? "33%" : step === "size" ? "66%" : "100%";

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) skip(); }}>
      <DialogContent className="max-w-sm overflow-hidden p-0">
        <div className="h-0.5 bg-surface-3">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: progress }}
          />
        </div>

        <div className="px-6 pt-5 pb-2">
          <div className="mb-1 flex items-center justify-between">
            <DialogTitle className="text-base font-bold">
              {step === "type" && t("typeTitle")}
              {step === "size" && t("sizeTitle")}
              {step === "aggregators" && t("aggTitle")}
            </DialogTitle>
            <span className="text-[11px] text-faint">{stepNum} / 3</span>
          </div>
          <DialogDescription className="text-[12px]">
            {step === "type" && t("typeDesc")}
            {step === "size" && t("sizeDesc")}
            {step === "aggregators" && t("aggDesc")}
          </DialogDescription>
        </div>

        <div className="flex flex-col gap-2 px-6 py-3">
          {step === "type" &&
            STUDIO_TYPES.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setProfile((p) => ({ ...p, studioType: opt.id }));
                  setStep("size");
                }}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-surface-2"
              >
                <Dumbbell className="size-4 shrink-0 text-brand" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-tight">{t(opt.labelKey)}</p>
                  <p className="text-[11px] text-faint">{t(opt.subKey)}</p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-faint" />
              </button>
            ))}

          {step === "size" &&
            SIZES.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setProfile((p) => ({ ...p, size: opt.id }));
                  setStep("aggregators");
                }}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-surface-2"
              >
                <Users className="size-4 shrink-0 text-brand" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-tight">{t(opt.labelKey)}</p>
                  <p className="text-[11px] text-faint">{t(opt.subKey)}</p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-faint" />
              </button>
            ))}

          {step === "aggregators" &&
            AGGREGATOR_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  const final = { ...profile, aggregators: opt.id } as StudioProfile;
                  finish(final);
                }}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-surface-2"
              >
                <Globe className="size-4 shrink-0 text-brand" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-tight">{t(opt.labelKey)}</p>
                  <p className="text-[11px] text-faint">{t(opt.subKey)}</p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-faint" />
              </button>
            ))}
        </div>

        <div className="border-t border-border px-6 py-3">
          <Button variant="ghost" className="w-full text-[12px] text-faint" onClick={skip}>
            {t("skip")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
