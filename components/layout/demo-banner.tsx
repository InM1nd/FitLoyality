"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, Smartphone, Sparkles } from "lucide-react";

import { TOUR_EVENT } from "@/components/shared/demo-tour";

export function DemoBanner() {
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const startTour = () => {
    // tour anchors live on the overview page
    if (pathname !== "/overview") {
      router.push("/overview");
      setTimeout(() => window.dispatchEvent(new CustomEvent(TOUR_EVENT)), 600);
    } else {
      window.dispatchEvent(new CustomEvent(TOUR_EVENT));
    }
  };

  return (
    <div
      className="grid overflow-hidden transition-all duration-300 ease-out"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="min-h-0">
        <div className="flex h-9 items-center justify-center gap-3 bg-[#1a1a1a] px-4 text-xs">
          <p className="truncate text-white/60">
            Demo mode —{" "}
            <span className="font-semibold text-[#ff7403]">all data is simulated</span>
            {". "}Book a real demo at{" "}
            <span className="font-semibold text-white underline underline-offset-2">fitloyalty.io</span>
          </p>
          <button
            type="button"
            onClick={startTour}
            className="hidden shrink-0 items-center gap-1.5 rounded-full bg-[#ff7403]/15 px-3 py-1 font-semibold text-[#ff7403] transition-colors hover:bg-[#ff7403]/25 sm:inline-flex"
          >
            <Sparkles className="size-3" /> Tour
          </button>
          <Link
            href="/member"
            data-tour="member-app"
            className="hidden shrink-0 items-center gap-1.5 rounded-full bg-[#93dafe]/15 px-3 py-1 font-semibold text-[#93dafe] transition-colors hover:bg-[#93dafe]/25 sm:inline-flex"
          >
            <Smartphone className="size-3" /> Member app
          </Link>
          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={() => setOpen(false)}
            className="grid size-5 shrink-0 place-items-center rounded text-white/40 transition-colors hover:text-white/80"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
