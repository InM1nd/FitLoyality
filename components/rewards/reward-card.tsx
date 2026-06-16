"use client";

import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";
import type { Reward } from "@/lib/types";

interface RewardCardProps {
  reward: Reward;
  onToggle: (id: string, enabled: boolean) => void;
}

export function RewardCard({ reward, onToggle }: RewardCardProps) {
  const t = useT("rewards");

  const handleToggle = (enabled: boolean) => {
    onToggle(reward.id, enabled);
    toast.success(enabled ? t("enabledToast", { name: reward.name }) : t("pausedToast", { name: reward.name }), {
      description: enabled ? t("enabledToastDesc") : t("pausedToastDesc"),
    });
  };

  return (
    <Card className={cn("flex flex-col gap-4 p-5 transition-opacity", !reward.enabled && "opacity-60")}>
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-11 place-items-center rounded-md bg-surface-3 text-2xl">
          {reward.emoji}
        </div>
        <Switch
          checked={reward.enabled}
          onCheckedChange={handleToggle}
          aria-label={`Toggle ${reward.name}`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">{reward.name}</p>
        <p className="text-sm text-muted-foreground">{reward.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs">
        <span className="text-faint">{t("triggerPrefix", { trigger: reward.trigger })}</span>
        <span className="num font-medium text-foreground">{t("redemptionsCount", { n: String(reward.redemptions) })}</span>
      </div>
    </Card>
  );
}
