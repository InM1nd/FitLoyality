import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-md border border-input bg-surface-2 px-3 py-2 text-sm text-foreground transition-[border-color,box-shadow] outline-none",
        "placeholder:text-faint",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-[var(--accent-subtle)]",
        "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
