import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

const STEPS: { no: string; title: string; body: string }[] = [
  {
    no: "01",
    title: "Connect",
    body: "Import your members and sync wearables in minutes. No migration headaches, no IT team.",
  },
  {
    no: "02",
    title: "Reward",
    body: "Set up automated perks for the habits you want — streaks, workouts, referrals. FitLoyalty runs them.",
  },
  {
    no: "03",
    title: "Retain",
    body: "Spot at-risk members early, nudge them back, and watch retention climb — with the ROI to prove it.",
  },
];

export function LandingSteps() {
  return (
    <section id="process" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label t-faint">05 — Process</span>
            <h2 className="font-display mt-2 text-4xl font-semibold uppercase tracking-tight t-ink md:text-5xl">
              Live in an afternoon.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">
            Three steps from spreadsheet chaos to a retention engine that runs itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.no}
              delay={i * 0.1}
              className={cn(
                "border-b border-[var(--line)] py-8 md:border-b-0 md:border-l md:px-8",
                i === 0 && "md:border-l-0 md:pl-0",
              )}
            >
              <span className="font-display block text-6xl num-ghost md:text-7xl">{step.no}</span>
              <h3 className="font-display mt-5 text-2xl font-semibold uppercase tracking-tight t-ink">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed t-mut">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
