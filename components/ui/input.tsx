import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-surface-2 px-3 py-2 text-sm text-foreground transition-[border-color,box-shadow] outline-none",
        "placeholder:text-faint",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-[var(--accent-subtle)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
