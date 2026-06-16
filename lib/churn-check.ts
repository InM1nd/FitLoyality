/**
 * Client-side Churn-Check — the lead-magnet wedge.
 *
 * Parses a gym's attendance export (Eversports/Magicline CSV) entirely in the
 * browser and flags members in the churn window. Nothing is uploaded — the
 * DSGVO-safe promise that removes the German owner's main objection.
 *
 * Pure functions only (no DOM, no "use client"): easy to reason about and test.
 */

export interface FlaggedMember {
  name: string;
  /** days since last visit, relative to the most recent activity in the file */
  daysInactive: number;
  /** monthly fee in € (parsed, or the assumed default) */
  fee: number;
  /** true if the fee was assumed because no fee column was found */
  feeAssumed: boolean;
  status: "churn-window" | "lapsed";
}

export interface ChurnReport {
  totalMembers: number;
  /** members inactive 14-29 days — still saveable */
  churnWindow: FlaggedMember[];
  /** members inactive 30+ days — likely already gone */
  lapsed: FlaggedMember[];
  /** monthly € at risk across churn-window + lapsed members */
  monthlyAtRisk: number;
  /** annualised revenue walking out (monthlyAtRisk × 12) */
  annualAtRisk: number;
  /** realistic share recoverable with timely nudges (~30%) */
  recoverable: number;
  /** true if no fee column was found and a default was assumed for everyone */
  feeAssumed: boolean;
  /** the anchor "today" used — the latest visit date found in the file */
  asOf: number;
}

/** Default monthly fee assumed when the export carries no price column. */
export const ASSUMED_FEE = 79;
const CHURN_WINDOW_DAYS = 14;
const LAPSED_DAYS = 30;
const DAY_MS = 86_400_000;

/* ---------------- CSV parsing ---------------- */

/** Split a single CSV line, honouring quoted fields and escaped quotes. */
function splitLine(line: string, delim: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQuotes = false;
      } else cur += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === delim) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

export function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };
  // German exports often use ';'. Pick whichever delimiter dominates the header.
  const head = lines[0];
  const semi = (head.match(/;/g) ?? []).length;
  const comma = (head.match(/,/g) ?? []).length;
  const tab = (head.match(/\t/g) ?? []).length;
  const delim = tab > semi && tab > comma ? "\t" : semi > comma ? ";" : ",";
  const all = lines.map((l) => splitLine(l, delim));
  return { headers: all[0], rows: all.slice(1) };
}

/* ---------------- field detection ---------------- */

function findCol(headers: string[], keywords: string[]): number {
  const lower = headers.map((h) => h.toLowerCase());
  for (const kw of keywords) {
    const i = lower.findIndex((h) => h.includes(kw));
    if (i >= 0) return i;
  }
  return -1;
}

const NAME_KEYS = ["name", "member", "mitglied", "kunde", "customer", "teilnehmer"];
const DATE_KEYS = [
  "last visit",
  "last_visit",
  "lastvisit",
  "letzter besuch",
  "letzter_besuch",
  "last seen",
  "last attended",
  "check-in",
  "checkin",
  "besuch",
  "datum",
  "date",
];
const FEE_KEYS = ["fee", "beitrag", "preis", "betrag", "price", "mrr", "amount", "monthly", "tarif"];

/** Parse dd.mm.yyyy, dd/mm/yyyy, yyyy-mm-dd, or anything Date.parse handles. */
export function parseDate(s: string): number | null {
  const v = s.trim();
  if (!v) return null;
  let m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return Date.UTC(+m[1], +m[2] - 1, +m[3]);
  m = v.match(/^(\d{1,2})[./](\d{1,2})[./](\d{2,4})/);
  if (m) {
    let y = +m[3];
    if (y < 100) y += 2000;
    return Date.UTC(y, +m[2] - 1, +m[1]);
  }
  const t = Date.parse(v);
  return Number.isNaN(t) ? null : t;
}

/** Parse "€79", "79,00", "1.299,00", "79.00" → number. */
export function parseFee(s: string): number | null {
  if (!s) return null;
  let cleaned = s.replace(/[^\d.,-]/g, "");
  if (!cleaned) return null;
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  // whichever separator is rightmost is the decimal one
  if (lastComma > lastDot) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    cleaned = cleaned.replace(/,/g, "");
  }
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? null : n;
}

/* ---------------- analysis ---------------- */

export class ChurnCheckError extends Error {}

export function analyseCSV(text: string): ChurnReport {
  const { headers, rows } = parseCSV(text);
  if (headers.length === 0 || rows.length === 0) {
    throw new ChurnCheckError("That file looks empty — export your attendance list and try again.");
  }

  const nameCol = findCol(headers, NAME_KEYS);
  const dateCol = findCol(headers, DATE_KEYS);
  const feeCol = findCol(headers, FEE_KEYS);

  if (dateCol === -1) {
    throw new ChurnCheckError(
      "Couldn't find a last-visit / date column. Eversports & Magicline exports include one — or try the sample.",
    );
  }

  interface Parsed {
    name: string;
    date: number;
    fee: number | null;
  }
  const parsed: Parsed[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const date = parseDate(row[dateCol] ?? "");
    if (date === null) continue;
    const name = (nameCol >= 0 ? row[nameCol] : row[0])?.trim() || `Member ${i + 1}`;
    const fee = feeCol >= 0 ? parseFee(row[feeCol] ?? "") : null;
    parsed.push({ name, date, fee });
  }

  if (parsed.length === 0) {
    throw new ChurnCheckError("Couldn't read any valid visit dates from that file. Try the sample to see how it works.");
  }

  const asOf = Math.max(...parsed.map((p) => p.date));
  const feeAssumed = feeCol === -1 || parsed.every((p) => p.fee === null);

  const churnWindow: FlaggedMember[] = [];
  const lapsed: FlaggedMember[] = [];

  for (const p of parsed) {
    const daysInactive = Math.round((asOf - p.date) / DAY_MS);
    if (daysInactive < CHURN_WINDOW_DAYS) continue;
    const feeKnown = p.fee !== null && p.fee > 0;
    const flagged: FlaggedMember = {
      name: p.name,
      daysInactive,
      fee: feeKnown ? (p.fee as number) : ASSUMED_FEE,
      feeAssumed: !feeKnown,
      status: daysInactive >= LAPSED_DAYS ? "lapsed" : "churn-window",
    };
    if (flagged.status === "churn-window") churnWindow.push(flagged);
    else lapsed.push(flagged);
  }

  churnWindow.sort((a, b) => b.daysInactive - a.daysInactive);
  lapsed.sort((a, b) => b.daysInactive - a.daysInactive);

  const monthlyAtRisk =
    churnWindow.reduce((s, m) => s + m.fee, 0) + lapsed.reduce((s, m) => s + m.fee, 0);
  const annualAtRisk = Math.round(monthlyAtRisk * 12);

  return {
    totalMembers: parsed.length,
    churnWindow,
    lapsed,
    monthlyAtRisk: Math.round(monthlyAtRisk),
    annualAtRisk,
    recoverable: Math.round(annualAtRisk * 0.3),
    feeAssumed,
    asOf,
  };
}

/* ---------------- sample data ---------------- */

/**
 * A realistic Eversports-style export (semicolon-delimited, German headers,
 * dd.mm.yyyy dates) so the demo works with one click, no file needed.
 * Dates are anchored around the demo's "today" (2026-06-14).
 */
export const SAMPLE_CSV = `Mitglied;Letzter Besuch;Tarif;Monatsbeitrag
Anna Müller;14.06.2026;Unlimited;89,00
Thomas Gruber;14.06.2026;Unlimited;89,00
Lisa Berger;13.06.2026;10er-Block;79,00
David Lang;13.06.2026;Unlimited;89,00
Sarah Klein;12.06.2026;Premium;99,00
Markus Köhler;11.06.2026;Unlimited;89,00
Julia Hofmann;29.05.2026;Standard;69,00
Felix Schmid;26.05.2026;Unlimited;89,00
Nina Wagner;24.05.2026;Standard;69,00
Peter Maier;22.05.2026;Premium;99,00
Sophie Brunner;20.05.2026;Unlimited;89,00
Jonas Weber;19.05.2026;Standard;69,00
Laura Eder;30.04.2026;Unlimited;89,00
Martin Holzer;22.04.2026;Premium;99,00
Eva Pichler;18.04.2026;Standard;69,00
Daniel Auer;12.04.2026;Unlimited;89,00
Hannah Wolf;05.04.2026;Standard;69,00
Michael Bauer;09.06.2026;Unlimited;89,00
Lukas Fischer;10.06.2026;10er-Block;79,00
Clara Weiss;08.06.2026;Premium;99,00
Florian Mayr;07.06.2026;Standard;69,00
Sandra Gruber;31.05.2026;Unlimited;89,00`;
