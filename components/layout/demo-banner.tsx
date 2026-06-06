"use client";

import * as React from "react";
import Link from "next/link";
import { X, Smartphone } from "lucide-react";

export function DemoBanner() {
  const [open, setOpen] = React.useState(true);

  return (
    <div
      className="grid overflow-hidden transition-all duration-300 ease-out"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="min-h-0">
        <div className="flex h-8 items-center justify-center gap-3 bg-[#052e16] px-4 text-xs text-[#4ade80]">
          <p className="truncate">
            🎯 FitLoyalty Demo — All data is simulated. Book a real demo at{" "}
            <span className="font-semibold underline underline-offset-2">fitloyalty.io</span>
          </p>
          <Link
            href="/member"
            className="hidden shrink-0 items-center gap-1 rounded-full bg-[#4ade80]/15 px-2.5 py-0.5 font-semibold transition-colors hover:bg-[#4ade80]/25 sm:inline-flex"
          >
            <Smartphone className="size-3" /> View member app
          </Link>
          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={() => setOpen(false)}
            className="grid size-5 shrink-0 place-items-center rounded transition-colors hover:bg-white/10"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
