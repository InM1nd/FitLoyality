import { Counter } from "@/components/landing/counter";
import { Reveal } from "@/components/landing/reveal";
import { HeatStrip } from "@/components/landing/heat-field";
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
    <section id="streak" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <span className="mono-label t-faint">01 — The streak effect</span>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-[1.05] tracking-tight t-ink md:text-5xl">
            A member on a streak is a member who&apos;s{" "}
            <span className="text-heat">staying.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed t-mut">
            Consistency compounds. Every workout logged, every reward earned, every day kept warms
            the grid — and the warmer it runs, the longer they stay. FitLoyalty makes that visible,
            and acts the moment it cools.
          </p>
        </Reveal>

        <div className="mt-10">
          <HeatStrip cols={64} seed={11} />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4">
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
                {s.prefix && <span className="t-lime">{s.prefix}</span>}
                <Counter to={s.value} decimals={s.decimals} />
                {s.suffix && <span className="t-lime">{s.suffix}</span>}
              </div>
              <p className="mono-label mt-3 t-mut">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
