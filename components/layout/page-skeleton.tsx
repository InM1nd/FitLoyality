import { Skeleton } from "@/components/ui/skeleton";

type Variant = "cards" | "table" | "grid" | "stack";

export function PageSkeleton({ variant = "cards" }: { variant?: Variant }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-80" />
      </div>

      {variant === "cards" && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <Skeleton className="h-80 w-full lg:col-span-7" />
            <Skeleton className="h-80 w-full lg:col-span-5" />
          </div>
        </>
      )}

      {variant === "table" && (
        <>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-72" />
            <Skeleton className="h-9 w-80" />
          </div>
          <Skeleton className="h-96 w-full" />
        </>
      )}

      {variant === "grid" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      )}

      {variant === "stack" && (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-56 w-full" />
          ))}
        </div>
      )}
    </div>
  );
}
