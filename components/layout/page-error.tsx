"use client";

import { AlertTriangle, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PageError({ reset }: { reset: () => void }) {
  return (
    <Card className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 p-10 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-[var(--error-bg)] text-error">
        <AlertTriangle className="size-6" />
      </span>
      <div>
        <h2 className="text-base font-semibold">Something went wrong</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We couldn&apos;t load this section. Please try again.
        </p>
      </div>
      <Button onClick={reset}>
        <RotateCw /> Retry
      </Button>
    </Card>
  );
}
