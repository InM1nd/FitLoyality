"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, UploadCloud, FileSpreadsheet, ShieldCheck, RotateCcw } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { formatEUR } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";
import {
  analyseCSV,
  ChurnCheckError,
  SAMPLE_CSV,
  type ChurnReport,
} from "@/lib/churn-check";

type Mode = "upload" | "estimate";

export function ChurnCheck() {
  const t = useT("churnCheck");
  const [mode, setMode] = React.useState<Mode>("upload");

  return (
    <section id="churn-check" className="scroll-mt-20 px-5 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mono-label t-faint">{t("eyebrow")}</span>
              <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">{t("sub")}</p>
          </div>
        </Reveal>

        {/* mode toggle */}
        <Reveal className="mt-8 flex gap-2">
          <ModeButton active={mode === "upload"} onClick={() => setMode("upload")}>
            {t("modeUpload")}
          </ModeButton>
          <ModeButton active={mode === "estimate"} onClick={() => setMode("estimate")}>
            {t("modeEstimate")}
          </ModeButton>
        </Reveal>

        {mode === "upload" ? <UploadMode /> : <EstimateMode />}
      </div>
    </section>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
        active
          ? "bg-[#1a1a1a] text-[#f5f2ec]"
          : "bg-[var(--paper-3)] t-mut hover:t-ink"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Upload mode — real client-side CSV analysis                                */
/* -------------------------------------------------------------------------- */

function UploadMode() {
  const t = useT("churnCheck");
  const [report, setReport] = React.useState<ChurnReport | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const run = (text: string) => {
    try {
      setReport(analyseCSV(text));
      setError(null);
    } catch (e) {
      setReport(null);
      setError(e instanceof ChurnCheckError ? e.message : "Couldn't read that file — try the sample.");
    }
  };

  const handleFile = async (file: File) => {
    try {
      run(await file.text());
    } catch {
      setError("Couldn't read that file — try the sample.");
    }
  };

  const reset = () => {
    setReport(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Reveal className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* left: dropzone / scan summary */}
      <div className="flex flex-col">
        {!report ? (
          <>
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) void handleFile(file);
              }}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
                dragOver
                  ? "border-[var(--lime)] bg-[var(--lime)]/5"
                  : "border-[var(--line)] hover:border-[var(--ink-2)]"
              }`}
            >
              <span className="grid size-12 place-items-center rounded-full bg-[var(--paper-3)]">
                <UploadCloud className="size-6 t-mut" />
              </span>
              <span className="text-[15px] font-semibold t-ink">{t("dropTitle")}</span>
              <span className="text-[12.5px] t-mut">{t("dropSub")}</span>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv,text/plain"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleFile(file);
                }}
              />
            </label>

            <button
              type="button"
              onClick={() => run(SAMPLE_CSV)}
              className="mt-4 inline-flex items-center justify-center gap-2 text-[13px] font-semibold t-ink underline underline-offset-4 hover:t-lime"
            >
              <FileSpreadsheet className="size-4" />
              {t("trySample")}
            </button>

            {error && (
              <p className="mt-4 rounded-lg bg-[#1a1a1a] px-4 py-3 text-[12.5px] text-[#ff7403]">
                {error}
              </p>
            )}

            <div className="mt-auto flex items-start gap-2 pt-8">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 t-lime" />
              <p className="text-[12px] leading-relaxed t-mut">
                <span className="font-semibold t-ink">{t("privacyStrong")}</span>{" "}
                {t("privacyRest")}
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <span className="mono-label t-faint">{t("scanComplete")}</span>
            <p className="font-display mt-2 text-3xl font-semibold t-ink">
              {t("scanned", { n: report.totalMembers })}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed t-mut">
              {t("scanSummary", { window: report.churnWindow.length, lapsed: report.lapsed.length })}
              {report.feeAssumed && t("feeAssumed")}
            </p>

            {/* flagged member list */}
            <div className="mt-5 rounded-xl border border-[var(--line)]">
              <FlaggedList report={report} />
            </div>

            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex w-fit items-center gap-2 text-[13px] font-semibold t-mut underline underline-offset-4 hover:t-ink"
            >
              <RotateCcw className="size-4" /> {t("scanAnother")}
            </button>
          </div>
        )}
      </div>

      {/* right: result */}
      <div className="flex flex-col justify-between rounded-2xl bg-[#1a1a1a] p-8 md:p-10">
        {report ? (
          <>
            <div>
              <span className="mono-label text-[#f5f2ec]/50">{t("walkingOut")}</span>
              <div
                className="font-display num mt-3 text-5xl font-bold tracking-tight text-[#ff7403] md:text-6xl"
                aria-live="polite"
              >
                {formatEUR(report.annualAtRisk)}
                <span className="text-2xl font-medium text-[#f5f2ec]/40"> {t("perYear")}</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f5f2ec]/70">
                {t("resultBody", {
                  n: report.churnWindow.length + report.lapsed.length,
                  recovered: formatEUR(report.recoverable),
                })}
              </p>
            </div>
            <Link
              href="/overview"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#ff7403] px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
            >
              {t("seeHow")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </>
        ) : (
          <div className="flex h-full flex-col justify-center gap-3 text-center">
            <FileSpreadsheet className="mx-auto size-10 text-[#f5f2ec]/25" />
            <p className="text-sm text-[#f5f2ec]/55">{t("emptyResult")}</p>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function FlaggedList({ report }: { report: ChurnReport }) {
  const t = useT("churnCheck");
  const all = [...report.churnWindow, ...report.lapsed];
  const shown = all.slice(0, 7);
  const rest = all.length - shown.length;
  return (
    <>
      {shown.map((m, i) => (
        <div
          key={`${m.name}-${i}`}
          className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-2.5 last:border-0"
        >
          <span
            className={`size-2 shrink-0 rounded-full ${
              m.status === "churn-window" ? "bg-[#ff7403]" : "bg-[var(--ink-2)]"
            }`}
          />
          <span className="min-w-0 flex-1 truncate text-[13px] font-medium t-ink">{m.name}</span>
          <span className="num text-[11.5px] t-mut">{t("inactive", { n: m.daysInactive })}</span>
          <span className="num w-14 text-right text-[12.5px] font-semibold t-ink">
            {formatEUR(m.fee)}
          </span>
        </div>
      ))}
      {rest > 0 && (
        <div className="px-4 py-2.5 text-[11.5px] t-faint">{t("moreFlagged", { n: rest })}</div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Estimate mode — the original three-slider sketch                           */
/* -------------------------------------------------------------------------- */

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, step, format, onChange }: SliderRowProps) {
  const id = React.useId();
  return (
    <div className="border-b border-[var(--line)] py-5 last:border-0">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="mono-label t-mut">
          {label}
        </label>
        <span className="num font-display text-2xl font-semibold t-ink">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--paper-3)] accent-[var(--lime)]"
      />
    </div>
  );
}

function EstimateMode() {
  const t = useT("churnCheck");
  const [members, setMembers] = React.useState(220);
  const [fee, setFee] = React.useState(79);
  const [churn, setChurn] = React.useState(15);

  // steady-state: every month `members × churn%` walk out, each worth `fee` MRR
  const annualLoss = Math.round(members * (churn / 100) * fee * 12);
  const recovered = Math.round(annualLoss * 0.3);

  return (
    <Reveal className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div>
        <SliderRow
          label={t("estMembers")}
          value={members}
          min={50}
          max={800}
          step={10}
          format={(v) => String(v)}
          onChange={setMembers}
        />
        <SliderRow
          label={t("estFee")}
          value={fee}
          min={39}
          max={159}
          step={5}
          format={(v) => `€${v}`}
          onChange={setFee}
        />
        <SliderRow
          label={t("estChurn")}
          value={churn}
          min={5}
          max={40}
          step={1}
          format={(v) => `${v}%`}
          onChange={setChurn}
        />
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-[#1a1a1a] p-8 md:p-10">
        <div>
          <span className="mono-label text-[#f5f2ec]/50">{t("walkingOut")}</span>
          <div
            className="font-display num mt-3 text-5xl font-bold tracking-tight text-[#ff7403] md:text-6xl"
            aria-live="polite"
          >
            {formatEUR(annualLoss)}
            <span className="text-2xl font-medium text-[#f5f2ec]/40"> {t("perYear")}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f5f2ec]/70">
            {t("estBody", { recovered: formatEUR(recovered) })}
          </p>
        </div>
        <Link
          href="/overview"
          className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#ff7403] px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
        >
          {t("seeHow")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Reveal>
  );
}
