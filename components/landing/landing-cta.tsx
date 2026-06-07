import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { HeatField } from "@/components/landing/heat-field";

export function LandingCta() {
  return (
    <section className="px-5 pb-24 pt-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-paper2 px-6 py-16 md:px-14 md:py-24">
          {/* heat field backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(180deg,transparent,#000_30%,#000_70%,transparent)]">
            <HeatField cols={40} rows={12} hotBand seed={99} gap={5} className="h-full w-full" />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(closest-side,transparent,var(--paper-2))]" />

          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
            <span className="mono-label t-mut">06 — Ready?</span>
            <span className="mono-label t-faint">Break even at 2 members/mo</span>
          </div>

          <h2 className="font-display mt-10 max-w-4xl text-5xl font-bold uppercase leading-[0.92] tracking-tight t-ink md:text-7xl lg:text-8xl">
            Don&apos;t let them <span className="text-heat">break the chain.</span>
          </h2>

          <p className="mt-7 max-w-md text-base leading-relaxed t-mut">
            Explore the full FitLoyalty experience — admin dashboard and member app — right now. No
            signup, all data simulated.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="/overview"
              className="group inline-flex items-center gap-2 bg-acid px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] transition-transform hover:-translate-y-0.5"
            >
              Explore the dashboard
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/member" className="mono-label group inline-flex items-center gap-1.5 t-ink">
              <span className="underline decoration-[var(--line)] underline-offset-4 transition-colors group-hover:decoration-[var(--acid)]">
                or see the member app
              </span>
              ↗
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
