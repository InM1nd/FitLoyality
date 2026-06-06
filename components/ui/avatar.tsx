import * as React from "react";

import { cn } from "@/lib/utils";
import type { AvatarGrad } from "@/lib/types";

const GRAD_CLASS: Record<AvatarGrad, string> = {
  1: "bg-[linear-gradient(135deg,#22c55e,#15803d)] text-[#052e16]",
  2: "bg-[linear-gradient(135deg,#3b82f6,#1d4ed8)] text-white",
  3: "bg-[linear-gradient(135deg,#f59e0b,#b45309)] text-white",
  4: "bg-[linear-gradient(135deg,#a78bfa,#7c3aed)] text-white",
  5: "bg-[linear-gradient(135deg,#f472b6,#be185d)] text-white",
};

const SIZE_CLASS = {
  sm: "size-7 text-[11px]",
  md: "size-9 text-[13px]",
  lg: "size-16 text-[22px]",
} as const;

function Avatar({
  initials,
  grad,
  size = "md",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  initials: string;
  grad?: AvatarGrad;
  size?: keyof typeof SIZE_CLASS;
}) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold select-none",
        grad ? GRAD_CLASS[grad] : "bg-surface-3 text-foreground",
        SIZE_CLASS[size],
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  );
}

export { Avatar };
