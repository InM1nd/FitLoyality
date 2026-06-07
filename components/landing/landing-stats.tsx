import { Counter } from "@/components/landing/counter";
import { Reveal } from "@/components/landing/reveal";

const STUDIOS = [
  "CrossFit Vienna Nord",
  "PowerHaus Graz",
  "Alpenfit Innsbruck",
  "Studio Nord Linz",
  "Eisen & Co. Salzburg",
  "Donau Strength Wien",
  "Zürich Kraftwerk",
  "Berlin Barbell Club",
];

const STATS: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}[] = [
  { value: 81.4, decimals: 1, suffix: "%", label: "Average member retention" },
  { value: 12, prefix: "+", suffix: "/mo", label: "Net new members" },
  { value: 89, label: "Rewards redeemed monthly" },
  { value: 1847, prefix: "€", label: "Saved in prevented churn /mo" },
];

export function LandingStats() {
  return (
    <section className="relative border-y border-border bg-surface-1/40 py-14">
      {/* marquee */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-faint">
          Trusted by studios across the DACH region
        </p>
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {[...STUDIOS, ...STUDIOS].map((s, i) => (
            <span
              key={i}
              className="font-display whitespace-nowrap text-lg font-semibold text-muted-foreground/60"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* stats */}
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-8 px-5 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <div className="num font-display text-4xl font-bold text-gradient-green md:text-5xl">
              <Counter
                to={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
