import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { Marker } from "@/components/landing/marker";

export function LandingCta() {
  return (
    <section className="px-5 pb-24 pt-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grain relative overflow-hidden border border-[var(--ink)] bg-paper2 px-6 py-16 md:px-14 md:py-24">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
            <span className="mono-label t-mut">06 — Ready?</span>
            <span className="mono-label t-faint">Break even at 2 members/mo</span>
          </div>

          <h2 className="font-display mt-10 max-w-4xl text-5xl font-bold uppercase leading-[0.92] tracking-tight t-ink md:text-7xl lg:text-8xl">
            Stop losing the members you <Marker>fought</Marker> to win.
          </h2>

          <p className="mt-7 max-w-md text-base leading-relaxed t-mut">
            Explore the full FitLoyalty experience — admin dashboard and member app — right now. No
            signup, all data simulated.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="/overview"
              className="group inline-flex items-center gap-2 bg-acid px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-transform hover:-translate-y-0.5"
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
