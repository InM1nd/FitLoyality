import { Quote, Plus } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";

const STACK = [
  "Eversports Manager",
  "Urban Sports Club",
  "EGYM Wellpass",
  "Hansefit",
  "Magicline",
  "Apple Health",
];

const QUOTES: { text: string; name: string; detail: string }[] = [
  {
    text: "We won back seven members in the first month. The morning briefing tells me exactly who to call today — I stopped guessing.",
    name: "Stefanie K.",
    detail: "Yoga studio owner · Wien · 180 members",
  },
  {
    text: "Half our visits come through USC. Now I finally see what that's worth in euros — and who's ready for a direct membership.",
    name: "Markus H.",
    detail: "CrossFit box owner · Graz · 240 members",
  },
  {
    text: "The weekly streak is genius. Members ask about it at the front desk more than about anything else we've ever introduced.",
    name: "Daniela P.",
    detail: "EMS studio owner · Linz · 95 members",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do I have to replace Eversports or Magicline?",
    a: "No. FitLoyalty sits on top of your existing booking and billing software. We import your attendance data (CSV or integration) and add the retention layer your tools don't have. Nothing about your daily operations changes.",
  },
  {
    q: "Is it GDPR-compliant?",
    a: "Yes — EU hosting, an AVV (data-processing agreement) with every studio, and documented double opt-in collected in the member app before any WhatsApp or email nudge goes out. We never process biometrics or health values, only visits.",
  },
  {
    q: "What about my USC partner contract?",
    a: "Direct-membership offers are shown in-app to members who voluntarily joined your branded app and gave consent — no unsolicited outreach to aggregator-sourced contact data. The share-of-wallet loop (more visits, more payouts) needs no offers at all.",
  },
  {
    q: "What if members don't scan the QR code?",
    a: "For class-based studios they don't have to: attendance comes from your booking data automatically. The QR code only covers open-gym visits — and the gesture is familiar, because USC members already scan one at your front desk.",
  },
  {
    q: "How long does setup take?",
    a: "An afternoon. Upload one attendance export, print one QR code, pick your brand color — your members get a link to their app the same day.",
  },
];

export function LandingProof() {
  return (
    <section id="faq" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* stack strip */}
        <Reveal>
          <div className="flex flex-col items-center gap-4 border-y border-[var(--line)] py-6">
            <span className="mono-label t-faint">Plays nicely with your stack</span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {STACK.map((s) => (
                <span
                  key={s}
                  className="mono rounded-full border border-[var(--line)] bg-paper2 px-4 py-1.5 text-[12px] t-mut"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* quotes */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 0.08}
              className="flex flex-col rounded-2xl border border-[var(--line)] bg-paper2 p-7"
            >
              <Quote className="size-5 text-[#ff7403]" />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed t-ink">{q.text}</p>
              <div className="mt-5 border-t border-[var(--line)] pt-4">
                <p className="text-sm font-semibold t-ink">{q.name}</p>
                <p className="mono-label mt-1 t-faint">{q.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <Reveal className="mt-20">
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mono-label t-faint">08 — Questions</span>
              <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
                Asked by every studio owner.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-2">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group border-b border-[var(--line)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg font-semibold t-ink md:text-xl">
                    {item.q}
                  </span>
                  <Plus className="size-5 shrink-0 t-faint transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="max-w-3xl pb-6 text-[15px] leading-relaxed t-mut">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
