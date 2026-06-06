"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        "data-[state=checked]:border-transparent data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface-3",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-4 rounded-full shadow-sm transition-transform",
          "data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white data-[state=unchecked]:translate-x-[3px] data-[state=unchecked]:bg-muted-foreground",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
