"use client";

import * as React from "react";

import { DICTIONARIES, type Locale } from "@/lib/i18n/dictionaries";

export type { Locale };

const STORAGE_KEY = "fitloyalty-locale";
const DEFAULT_LOCALE: Locale = "en";

/* ------------------------------------------------------------------ *
 * Module-level locale store consumed via useSyncExternalStore.        *
 * Server + first client paint return DEFAULT_LOCALE (no hydration     *
 * mismatch); the persisted choice is read once on first subscribe     *
 * (after commit) and broadcast, swapping the UI to the stored locale. *
 * ------------------------------------------------------------------ */

let current: Locale = DEFAULT_LOCALE;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function applyLang(l: Locale) {
  document.documentElement.lang = l === "de" ? "de-AT" : "en";
}

function subscribe(cb: () => void): () => void {
  if (!hydrated) {
    hydrated = true;
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v === "de" || v === "en") {
        current = v;
        applyLang(v);
        queueMicrotask(emit); // re-render subscribers with the stored locale
      }
    } catch {
      /* localStorage unavailable — stay on default */
    }
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const getSnapshot = (): Locale => current;
const getServerSnapshot = (): Locale => DEFAULT_LOCALE;

function setLocaleStore(l: Locale) {
  current = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* ignore */
  }
  applyLang(l);
  emit();
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** resolve a dotted key against the active locale, with {var} interpolation */
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

function resolve(dict: Record<string, unknown>, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
  return typeof value === "string" ? value : undefined;
}

function interpolate(s: string, vars?: Record<string, string | number>): string {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, name) => (name in vars ? String(vars[name]) : `{${name}}`));
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = React.useCallback((l: Locale) => setLocaleStore(l), []);

  const t = React.useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const active = resolve(DICTIONARIES[locale] as Record<string, unknown>, key);
      const fallback = resolve(DICTIONARIES.en as Record<string, unknown>, key);
      return interpolate(active ?? fallback ?? key, vars);
    },
    [locale],
  );

  const value = React.useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}

/**
 * Scoped translator. `const t = useT("overview")` lets components call
 * `t("title")` instead of `t("overview.title")`.
 */
export function useT(namespace?: string) {
  const { t } = useLocale();
  return React.useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      t(namespace ? `${namespace}.${key}` : key, vars),
    [t, namespace],
  );
}
