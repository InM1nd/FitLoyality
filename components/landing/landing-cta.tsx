import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { PulseLine } from "@/components/landing/pulse-line";

export function LandingCta() {
  return (
    <section className="px-5 py-24 md:py-32">
      <Reveal className="mx-auto max-w-5xl">
        <div className="grain relative overflow-hidden rounded-[32px] border border-[color-mix(in_srgb,var(--accent-brand)_30%,transparent)] bg-surface-1/60 px-6 py-16 text-center backdrop-blur md:px-16 md:py-24">
          {/* atmosphere */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.22),transparent)]" />
            <div className="absolute inset-0 bg-dotgrid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_75%)]" />
            <PulseLine className="absolute inset-x-0 bottom-0 h-40 w-full opacity-40" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            Break even by retaining just 2 members/month
          </span>

          <h2 className="font-display mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Stop losing the members
            <br />
            you fought to <span className="text-gradient-green">win.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Explore the full FitLoyalty experience — admin dashboard and member app — right now. No
            signup, all data simulated.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/overview"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_0_1px_rgba(34,197,94,0.4)] transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Explore the dashboard
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/member"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-border-strong"
            >
              <Smartphone className="size-4" /> See the member app
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
