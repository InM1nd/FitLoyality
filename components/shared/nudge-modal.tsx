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
  const [message, setMessage] = React.useState("");
  // Re-seed the message whenever a new member is targeted (set-state-during-render reset pattern).
  const [seededFor, setSeededFor] = React.useState<string | null>(null);
  if (open && memberName && seededFor !== memberName) {
    setSeededFor(memberName);
    setMessage(defaultMessage(memberName));
  }

  const handleSend = () => {
    onOpenChange(false);
    toast.success(`Nudge sent to ${firstName(name)}`, {
      description: "Push notification delivered to their member app.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
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
      </DialogContent>
    </Dialog>
  );
}
