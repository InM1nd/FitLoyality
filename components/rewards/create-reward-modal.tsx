"use client";

import * as React from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useT } from "@/lib/i18n/context";
import type { Reward, RewardType, TriggerType } from "@/lib/types";

const REWARD_TYPES: RewardType[] = ["Free Item", "Discount", "Service", "Points Bonus"];
const TRIGGER_TYPES: TriggerType[] = [
  "Workout Count",
  "Streak",
  "Google Review",
  "Check-ins",
  "Referral",
  "Comeback",
  "Birthday",
];

const NEEDS_VALUE: TriggerType[] = ["Workout Count", "Streak", "Check-ins"];

const EMOJI: Record<RewardType, string> = {
  "Free Item": "🥤",
  Discount: "🎽",
  Service: "💪",
  "Points Bonus": "⭐",
};

const schema = z.object({
  name: z.string().min(2, "Give the reward a name"),
  rewardType: z.enum(["Free Item", "Discount", "Service", "Points Bonus"]),
  triggerType: z.enum([
    "Workout Count",
    "Streak",
    "Google Review",
    "Check-ins",
    "Referral",
    "Comeback",
    "Birthday",
  ]),
  triggerValue: z.string().optional(),
  description: z.string().min(5, "Add a short description"),
  pointsValue: z.string().min(1, "Set a points value"),
});

type FormValues = z.infer<typeof schema>;

function triggerLabel(type: TriggerType, value: string): string {
  const v = value || "—";
  switch (type) {
    case "Workout Count": return `Complete ${v} workouts in a month`;
    case "Streak":        return `${v}-week streak, no missed weeks`;
    case "Google Review": return "Leave a Google review";
    case "Check-ins":     return `${v} check-ins this month`;
    case "Referral":      return "Refer a friend who joins";
    case "Comeback":      return "First visit after a missed week";
    case "Birthday":      return "On the member's birthday";
  }
}

interface CreateRewardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (reward: Reward) => void;
}

export function CreateRewardModal({ open, onOpenChange, onCreate }: CreateRewardModalProps) {
  const t = useT("rewards");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      rewardType: "Free Item",
      triggerType: "Workout Count",
      triggerValue: "10",
      description: "",
      pointsValue: "200",
    },
  });

  const values = useWatch({ control }) as FormValues;
  const showValue = NEEDS_VALUE.includes(values.triggerType);
  const emoji = EMOJI[values.rewardType];
  const baseId = React.useId();
  const [createdCount, setCreatedCount] = React.useState(0);

  const onSubmit = (data: FormValues) => {
    setCreatedCount((c) => c + 1);
    onCreate({
      id: `r-new-${baseId}-${createdCount}`,
      emoji: EMOJI[data.rewardType],
      name: data.name,
      description: data.description,
      trigger: triggerLabel(data.triggerType, data.triggerValue ?? ""),
      redemptions: 0,
      enabled: true,
    });
    toast.success(t("createdToast"), { description: t("createdToastDesc", { name: data.name }) });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("createTitle")}</DialogTitle>
          <DialogDescription>{t("createDesc")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="r-name">{t("fieldName")}</Label>
                <Input id="r-name" placeholder={t("namePlaceholder")} {...register("name")} />
                {errors.name && <p className="text-[11px] text-error">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>{t("fieldType")}</Label>
                  <Controller
                    control={control}
                    name="rewardType"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {REWARD_TYPES.map((rt) => (
                            <SelectItem key={rt} value={rt}>{rt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>{t("fieldTrigger")}</Label>
                  <Controller
                    control={control}
                    name="triggerType"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {TRIGGER_TYPES.map((tt) => (
                            <SelectItem key={tt} value={tt}>{tt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {showValue && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="r-value">{t("fieldValue")}</Label>
                  <Input id="r-value" type="number" min={1} {...register("triggerValue")} />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="r-desc">{t("fieldDesc")}</Label>
                <Textarea id="r-desc" placeholder={t("descPlaceholder")} {...register("description")} />
                {errors.description && <p className="text-[11px] text-error">{errors.description.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="r-points">{t("fieldPoints")}</Label>
                <Input id="r-points" type="number" min={0} {...register("pointsValue")} />
                {errors.pointsValue && <p className="text-[11px] text-error">{errors.pointsValue.message}</p>}
              </div>
            </div>

            <div className="flex flex-col border-t border-border bg-background p-6 md:border-l md:border-t-0">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-faint">
                {t("previewHint")}
              </p>
              <div className="rounded-xl border border-[color-mix(in_srgb,var(--accent-brand)_40%,transparent)] bg-[linear-gradient(180deg,var(--accent-subtle),transparent_60%)] p-4 shadow-[var(--shadow-glow)]">
                <div className="flex items-start justify-between">
                  <div className="grid size-11 place-items-center rounded-md bg-surface-3 text-2xl">
                    {emoji}
                  </div>
                  <span className="num rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[11px] font-semibold text-brand">
                    {values.pointsValue || "0"} pts
                  </span>
                </div>
                <p className="mt-3 font-semibold">{values.name || t("nameDefault")}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {values.description || t("descDefault")}
                </p>
                <p className="mt-3 border-t border-border pt-2.5 text-xs text-faint">
                  {triggerLabel(values.triggerType, values.triggerValue ?? "")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              {t("cancelBtn")}
            </Button>
            <Button type="submit">{t("createBtn2")}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
