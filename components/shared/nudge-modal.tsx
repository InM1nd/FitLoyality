"use client";

import * as React from "react";
import { Send } from "lucide-react";
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

interface NudgeModalProps {
  memberName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function firstName(full: string): string {
  return full.split(" ")[0];
}

function defaultMessage(name: string): string {
  return (
    `Hey ${firstName(name)}! 💪 We've missed you at the studio. ` +
    `You're only a few workouts away from your next reward — come crush a session this week!`
  );
}

export function NudgeModal({ memberName, open, onOpenChange }: NudgeModalProps) {
  const name = memberName ?? "";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {/* key remounts the form per member, so the message re-seeds without render-phase setState */}
        <NudgeForm key={name} name={name} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}

function NudgeForm({
  name,
  onOpenChange,
}: {
  name: string;
  onOpenChange: (open: boolean) => void;
}) {
  const [message, setMessage] = React.useState(() => (name ? defaultMessage(name) : ""));

  const handleSend = () => {
    onOpenChange(false);
    toast.success(`Nudge sent to ${firstName(name)}`, {
      description: "Push notification delivered to their member app.",
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Send a nudge to {name}</DialogTitle>
        <DialogDescription>
          A friendly push notification lands directly in their member app.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 p-6">
        <Label htmlFor="nudge-message">Message</Label>
        <Textarea
          id="nudge-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-28"
        />
        <p className="text-[11px] text-faint">{message.length} characters</p>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSend}>
          <Send /> Send Push Notification
        </Button>
      </DialogFooter>
    </>
  );
}
