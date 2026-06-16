"use client";

import { Quote, Plus } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { useT } from "@/lib/i18n/context";

const STACK = [
  "Eversports Manager",
  "Urban Sports Club",
  "EGYM Wellpass",
  "Hansefit",
  "Magicline",
  "Apple Health",
];

const QUOTES = [
  { key: "q1", name: "Stefanie K." },
  { key: "q2", name: "Markus H." },
  { key: "q3", name: "Daniela P." },
];
const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5"];

export function LandingProof() {
  const t = useT("proof");
  return (
    <section id="faq" className="scroll-mt-20 px-5 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* stack strip */}
        <Reveal>
          <div className="flex flex-col items-center gap-4 border-y border-[var(--line)] py-6">
            <span className="mono-label t-faint">{t("stackLabel")}</span>
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
              key={q.key}
              delay={i * 0.08}
              className="flex flex-col rounded-2xl border border-[var(--line)] bg-paper2 p-7"
            >
              <Quote className="size-5 text-[#ff7403]" />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed t-ink">{t(q.key)}</p>
              <div className="mt-5 border-t border-[var(--line)] pt-4">
                <p className="text-sm font-semibold t-ink">{q.name}</p>
                <p className="mono-label mt-1 t-faint">{t(`${q.key}detail`)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <Reveal className="mt-20">
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mono-label t-faint">{t("faqEyebrow")}</span>
              <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
                {t("faqTitle")}
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-2">
          {FAQ_KEYS.map((k, i) => (
            <Reveal key={k} delay={i * 0.04}>
              <details className="group border-b border-[var(--line)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg font-semibold t-ink md:text-xl">
                    {t(`${k}q`)}
                  </span>
                  <Plus className="size-5 shrink-0 t-faint transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="max-w-3xl pb-6 text-[15px] leading-relaxed t-mut">{t(`${k}a`)}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
