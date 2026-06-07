import * as React from "react";

import { cn } from "@/lib/utils";

/** Realistic dark browser window chrome — used to frame product screens. */
export function BrowserFrame({
  url = "app.fitloyalty.io/overview",
  children,
  className,
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/5",
        className,
      )}
    >
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-[#0e0f0e] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-white/8 bg-white/5 px-3 py-1 text-[10px] text-zinc-400">
          <svg viewBox="0 0 24 24" className="size-2.5 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {url}
        </div>
        <div className="w-8" />
      </div>
      {/* sheen */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        {children}
      </div>
    </div>
  );
}
