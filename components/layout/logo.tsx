import { cn } from "@/lib/utils";

/** FitLoyalty mark — custom inline dumbbell SVG in a green rounded tile. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[17px]"
        aria-hidden="true"
      >
        <path d="M6.5 6.5 17.5 17.5" />
        <path d="m21 21-1-1" />
        <path d="m3 3 1 1" />
        <path d="m18 22 4-4" />
        <path d="m2 6 4-4" />
        <path d="m3 10 7-7" />
        <path d="m14 21 7-7" />
      </svg>
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-base font-bold tracking-tight">
        Fit<span className="text-brand">Loyalty</span>
      </span>
    </div>
  );
}
