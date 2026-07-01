"use client";

import * as React from "react";
import { Send, Pause } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useT } from "@/lib/i18n/context";

interface NudgeModalProps {
  memberName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Show the "Offer pause" save-flow CTA — only relevant for at-risk/churn-window members. */
  offerPause?: boolean;
}

function firstName(full: string): string {
  return full.split(" ")[0];
}

export function NudgeModal({ memberName, open, onOpenChange, offerPause = false }: NudgeModalProps) {
  const name = memberName ?? "";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {/* key remounts the form per member so the message re-seeds without render-phase setState */}
        <NudgeForm key={name} name={name} onOpenChange={onOpenChange} offerPause={offerPause} />
      </DialogContent>
    </Dialog>
  );
}

function NudgeForm({
  name,
  onOpenChange,
  offerPause,
}: {
  name: string;
  onOpenChange: (open: boolean) => void;
  offerPause: boolean;
}) {
  const t = useT("briefing");
  const first = firstName(name);
  const [message, setMessage] = React.useState(() =>
    name ? t("nudgeDefaultMsg", { first }) : "",
  );

  const handleSend = () => {
    onOpenChange(false);
    toast.success(t("nudgeToastTitle", { name: first }), {
      description: t("nudgeToastDesc"),
    });
  };

  const handleOfferPause = () => {
    onOpenChange(false);
    toast.success(t("pauseToastTitle", { name: first }), {
      description: t("pauseToastDesc"),
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("nudgeTitle", { name })}</DialogTitle>
        <DialogDescription>{t("nudgeDesc")}</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 p-6">
        <Label htmlFor="nudge-message">{t("nudgeLabel")}</Label>
        <Textarea
          id="nudge-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-28"
        />
        <p className="text-[11px] text-faint">{t("nudgeChars", { n: message.length })}</p>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={() => onOpenChange(false)}>{t("nudgeCancel")}</Button>
        {offerPause && (
          <Button variant="secondary" onClick={handleOfferPause}>
            <Pause /> {t("pauseCta")}
          </Button>
        )}
        <Button onClick={handleSend}>
          <Send /> {t("nudgeSend")}
        </Button>
      </DialogFooter>
    </>
  );
}
