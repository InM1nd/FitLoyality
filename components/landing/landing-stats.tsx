import { Counter } from "@/components/landing/counter";
import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

const STATS: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}[] = [
  { value: 81.4, decimals: 1, suffix: "%", label: "Average retention" },
  { value: 12, prefix: "+", suffix: "/mo", label: "Net new members" },
  { value: 89, label: "Rewards redeemed" },
  { value: 1847, prefix: "€", label: "Saved in churn /mo" },
];

export function LandingStats() {
  return (
    <section className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label t-faint">02 — By the numbers</span>
            <h2 className="font-display mt-2 text-3xl font-semibold uppercase tracking-tight t-ink md:text-4xl">
              The math of staying.
            </h2>
          </div>
          <p className="mono max-w-xs text-[11px] leading-relaxed t-faint sm:text-right">
            Aggregated across pilot studios · trailing 30 days
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={cn(
                "border-b border-[var(--line)] px-1 py-8 md:border-b-0 md:border-l md:px-6",
                i % 2 === 1 && "border-l border-[var(--line)] pl-5 md:pl-6",
                i === 0 && "md:border-l-0 md:pl-0",
              )}
            >
              <div className="font-display num text-5xl font-semibold tracking-tight t-ink md:text-6xl">
                {s.prefix && <span className="t-acid">{s.prefix}</span>}
                <Counter to={s.value} decimals={s.decimals} />
                {s.suffix && <span className="t-acid">{s.suffix}</span>}
              </div>
              <p className="mono-label mt-3 t-mut">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
