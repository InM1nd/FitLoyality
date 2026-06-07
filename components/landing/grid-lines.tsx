import { cn } from "@/lib/utils";

/** Swiss vertical hairlines aligned to the content column — the editorial scaffold. */
export function GridLines({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="mx-auto h-full max-w-6xl px-5">
        <div
          className="grid h-full"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="border-l border-[var(--line-soft)] last:border-r last:border-r-[var(--line-soft)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
