"use client";

import { useLocale, type Locale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "de", label: "DE" },
];

/**
 * DE/EN language switch. Two visual variants:
 * `dark` for the cream landing nav, `app` for the dashboard header.
 */
export function LocaleToggle({ variant = "app" }: { variant?: "app" | "landing" }) {
  const { locale, setLocale } = useLocale();

  if (variant === "landing") {
    return (
      <div className="flex items-center gap-0.5 rounded-full border border-black/10 bg-[#f5f2ec] p-0.5">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => setLocale(o.value)}
            aria-pressed={locale === o.value}
            className={cn(
              "mono rounded-full px-2 py-1 text-[11px] font-semibold tracking-[0.08em] transition-colors",
              locale === o.value ? "bg-[#1a1a1a] text-[#f5f2ec]" : "text-[#6b6b6b] hover:text-[#1a1a1a]",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-surface-1 p-1">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLocale(o.value)}
          aria-pressed={locale === o.value}
          className={cn(
            "rounded-full px-2 py-1 text-[11px] font-semibold tracking-[0.04em] transition-colors",
            locale === o.value ? "bg-surface-3 text-brand" : "text-faint hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
