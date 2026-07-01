import { describe, expect, it } from "vitest";
import { ChurnCheckError, SAMPLE_CSV, analyseCSV, parseCSV, parseDate, parseFee } from "./churn-check";

describe("parseDate", () => {
  it("parses German dd.mm.yyyy", () => {
    expect(parseDate("14.06.2026")).toBe(Date.UTC(2026, 5, 14));
  });

  it("parses ISO yyyy-mm-dd", () => {
    expect(parseDate("2026-06-14")).toBe(Date.UTC(2026, 5, 14));
  });

  it("returns null for empty/garbage input", () => {
    expect(parseDate("")).toBeNull();
    expect(parseDate("not a date")).toBeNull();
  });
});

describe("parseFee", () => {
  it("parses German comma-decimal fees", () => {
    expect(parseFee("79,00")).toBe(79);
  });

  it("parses fees with currency symbol", () => {
    expect(parseFee("€89,00")).toBe(89);
  });

  it("parses thousands-separated fees", () => {
    expect(parseFee("1.299,00")).toBe(1299);
  });

  it("parses plain dot-decimal fees", () => {
    expect(parseFee("79.00")).toBe(79);
  });

  it("returns null for empty input", () => {
    expect(parseFee("")).toBeNull();
  });
});

describe("parseCSV", () => {
  it("detects semicolon delimiter for German exports", () => {
    const { headers, rows } = parseCSV("Mitglied;Letzter Besuch\nAnna;14.06.2026");
    expect(headers).toEqual(["Mitglied", "Letzter Besuch"]);
    expect(rows).toEqual([["Anna", "14.06.2026"]]);
  });

  it("detects comma delimiter", () => {
    const { headers, rows } = parseCSV("name,last visit\nAnna,2026-06-14");
    expect(headers).toEqual(["name", "last visit"]);
    expect(rows).toEqual([["Anna", "2026-06-14"]]);
  });

  it("honours quoted fields containing the delimiter", () => {
    const { rows } = parseCSV('name;last visit\n"Doe; Jane";14.06.2026');
    expect(rows).toEqual([["Doe; Jane", "14.06.2026"]]);
  });
});

describe("analyseCSV — the churn-check lead magnet", () => {
  it("parses the built-in demo sample without throwing", () => {
    const report = analyseCSV(SAMPLE_CSV);
    expect(report.totalMembers).toBeGreaterThan(0);
    expect(report.churnWindow.length + report.lapsed.length).toBeGreaterThan(0);
  });

  it("flags members 14-29 days inactive as churn-window, 30+ as lapsed", () => {
    const csv = `Mitglied;Letzter Besuch;Monatsbeitrag
Recent;14.06.2026;79,00
InWindow;30.05.2026;79,00
Lapsed;01.05.2026;79,00`;
    const report = analyseCSV(csv);
    expect(report.churnWindow.map((m) => m.name)).toEqual(["InWindow"]);
    expect(report.lapsed.map((m) => m.name)).toEqual(["Lapsed"]);
  });

  it("assumes the default fee when no fee column is present", () => {
    const csv = `Mitglied;Letzter Besuch
Recent;14.06.2026
Lapsed;01.05.2026`;
    const report = analyseCSV(csv);
    expect(report.feeAssumed).toBe(true);
    expect(report.lapsed[0].feeAssumed).toBe(true);
    expect(report.lapsed[0].fee).toBe(79);
  });

  it("throws ChurnCheckError on an empty file", () => {
    expect(() => analyseCSV("")).toThrow(ChurnCheckError);
  });

  it("throws ChurnCheckError when no date column is found", () => {
    const csv = `Mitglied;Tarif\nAnna;Unlimited`;
    expect(() => analyseCSV(csv)).toThrow(ChurnCheckError);
  });

  it("computes monthlyAtRisk and annualAtRisk from flagged members only", () => {
    const csv = `Mitglied;Letzter Besuch;Monatsbeitrag
Recent;14.06.2026;89,00
Lapsed;01.05.2026;79,00`;
    const report = analyseCSV(csv);
    expect(report.monthlyAtRisk).toBe(79);
    expect(report.annualAtRisk).toBe(79 * 12);
  });
});
