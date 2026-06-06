import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-tight whitespace-nowrap [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-[var(--accent-subtle)] text-brand border border-[color-mix(in_srgb,var(--accent-brand)_30%,transparent)]",
        success: "bg-[var(--success-bg)] text-success",
        warning: "bg-[var(--warning-bg)] text-warning",
        error: "bg-[var(--error-bg)] text-error",
        info: "bg-[var(--info-bg)] text-info",
        secondary: "bg-surface-3 text-muted-foreground",
        outline: "border border-input bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
