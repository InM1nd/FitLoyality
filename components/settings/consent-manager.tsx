"use client";

import * as React from "react";
import { ShieldCheck, FileText, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useT } from "@/lib/i18n/context";
import { CONSENT_STATS } from "@/lib/data";

export function ConsentManager() {
  const t = useT("settings");
  const [autoDelete, setAutoDelete] = React.useState(CONSENT_STATS.autoDeleteEnabled);

  const consentPct = Math.round(
    (CONSENT_STATS.nudgeConsentCount / CONSENT_STATS.membersTotal) * 100,
  );

  const toggleAutoDelete = (checked: boolean) => {
    setAutoDelete(checked);
    if (checked) {
      toast.success(t("consentRetentionToastOn"), {
        description: t("consentRetentionToastOnDesc", { n: String(CONSENT_STATS.autoDeleteMonths) }),
      });
    } else {
      toast(t("consentRetentionToastOff"), { description: t("consentRetentionToastOffDesc") });
    }
  };

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">{t("consentTitle")}</CardTitle>
        <CardDescription>{t("consentDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-5">
        {/* zero-knowledge biometrics — a fixed guarantee, not a toggle */}
        <div className="flex items-start gap-4 rounded-lg border border-border bg-surface-2 p-4">
          <div className="grid size-9 shrink-0 place-items-center rounded-md bg-[var(--info-bg)] text-[var(--info)]">
            <ShieldCheck className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[13.5px] font-medium leading-tight">{t("consentZkTitle")}</p>
              <span className="rounded-full bg-[var(--info-bg)] px-2 py-0.5 text-[10.5px] font-semibold text-[var(--info)]">
                {t("consentZkBadge")}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{t("consentZkDesc")}</p>
          </div>
        </div>

        {/* double opt-in consent audit */}
        <div className="flex items-start gap-4 rounded-lg border border-border bg-surface-2 p-4">
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-medium leading-tight">{t("consentNudgeTitle")}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t("consentNudgeDesc")}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 w-full max-w-40 overflow-hidden rounded-full bg-surface-3">
                <div className="h-full rounded-full bg-success" style={{ width: `${consentPct}%` }} />
              </div>
              <span className="num shrink-0 text-[11px] font-semibold text-muted-foreground">
                {consentPct}%
              </span>
            </div>
            <p className="num mt-1.5 text-[11px] text-faint">
              {t("consentNudgeStat", {
                count: String(CONSENT_STATS.nudgeConsentCount),
                total: String(CONSENT_STATS.membersTotal),
              })}
            </p>
          </div>
        </div>

        {/* AVV document */}
        <div className="flex items-center gap-4 rounded-lg border border-border bg-surface-2 p-4">
          <div className="grid size-9 shrink-0 place-items-center rounded-md bg-surface-3 text-muted-foreground">
            <FileText className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-medium leading-tight">{t("consentAvvTitle")}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("consentAvvDesc", { region: CONSENT_STATS.dataRegion })}
            </p>
            <p className="mt-1 text-[11px] text-faint">
              {t("consentAvvSigned", { date: CONSENT_STATS.avvSignedDate })}
            </p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="shrink-0"
            onClick={() => toast.success(t("consentAvvDownloadToast"))}
          >
            <Download className="size-3.5" /> {t("consentAvvDownload")}
          </Button>
        </div>

        {/* auto-delete retention */}
        <div className="flex items-center gap-4 rounded-lg border border-border bg-surface-2 p-4">
          <div className="grid size-9 shrink-0 place-items-center rounded-md bg-surface-3 text-muted-foreground">
            <Trash2 className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-medium leading-tight">{t("consentRetentionTitle")}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("consentRetentionDesc", { n: String(CONSENT_STATS.autoDeleteMonths) })}
            </p>
          </div>
          <Switch
            checked={autoDelete}
            onCheckedChange={toggleAutoDelete}
            aria-label={t("consentRetentionTitle")}
          />
        </div>

        <div className="flex justify-end pt-1">
          <Button
            variant="secondary"
            onClick={() =>
              toast.success(t("consentExportToast"), {
                description: t("consentExportToastDesc", { n: String(CONSENT_STATS.membersTotal) }),
              })
            }
          >
            <Download className="size-3.5" /> {t("consentExportBtn")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
