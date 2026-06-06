import { cn } from "@/lib/utils";

/** Deterministic QR-style placeholder (not a real scannable code). */
function pattern(seedStr: string, size: number): boolean[] {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: size * size }, () => rand() > 0.5);
}

function FinderEye({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width={7} height={7} rx={1.5} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={1} fill="var(--qr-bg)" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.5} fill="currentColor" />
    </>
  );
}

export function QrCode({ value, className }: { value: string; className?: string }) {
  const size = 25;
  const cells = pattern(value, size);

  const inFinder = (r: number, c: number) =>
    (r < 8 && c < 8) || (r < 8 && c >= size - 8) || (r >= size - 8 && c < 8);

  return (
    <div
      className={cn("rounded-xl bg-white p-3 text-black [--qr-bg:#ffffff]", className)}
      role="img"
      aria-label="Reward QR code (demo placeholder)"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" shapeRendering="crispEdges">
        {cells.map((on, i) => {
          const r = Math.floor(i / size);
          const c = i % size;
          if (!on || inFinder(r, c)) return null;
          return <rect key={i} x={c} y={r} width={1} height={1} fill="currentColor" />;
        })}
        <FinderEye x={0} y={0} />
        <FinderEye x={size - 7} y={0} />
        <FinderEye x={0} y={size - 7} />
      </svg>
    </div>
  );
}
