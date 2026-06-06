"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GYM } from "@/lib/mock-data";

export function Branding() {
  const [color, setColor] = React.useState<string>(GYM.brandColor);
  const [appName, setAppName] = React.useState<string>(GYM.appName);

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">Member App Branding</CardTitle>
        <CardDescription>Customize your branded, white-label member experience.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 p-5 md:grid-cols-[1fr_auto]">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="b-color">Accent color</Label>
            <div className="flex items-center gap-3">
              <input
                id="b-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="size-10 cursor-pointer rounded-md border border-input bg-surface-2 p-1 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch-wrapper]:p-0"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-32 font-mono uppercase"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="b-name">App name</Label>
            <Input id="b-name" value={appName} onChange={(e) => setAppName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Logo</Label>
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-surface-2 px-4 py-7 text-center transition-colors hover:border-border-strong">
              <UploadCloud className="size-6 text-faint" />
              <p className="text-[13px] font-medium">Drag &amp; drop your logo</p>
              <p className="text-[11px] text-faint">PNG or SVG, up to 2&nbsp;MB</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() =>
                toast.success("Branding saved", {
                  description: "Your member app has been re-themed.",
                })
              }
            >
              Save Branding
            </Button>
          </div>
        </div>

        {/* Phone preview */}
        <div className="flex flex-col items-center gap-2 justify-self-center">
          <div
            className="flex h-[280px] w-[160px] flex-col gap-3 overflow-hidden rounded-[28px] border-4 border-surface-3 bg-[#0a0a0a] p-3"
            style={{ ["--brand-preview" as string]: color }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="grid size-5 place-items-center rounded text-[9px] font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {GYM.initials}
              </div>
              <span className="truncate text-[9px] font-semibold text-white">{appName}</span>
            </div>

            <div
              className="rounded-xl p-2.5 text-white"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
            >
              <p className="text-[7px] font-semibold uppercase tracking-wide opacity-90">
                Points this month
              </p>
              <p className="num text-lg font-bold leading-tight">2,840</p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/25">
                <div className="h-full w-3/4 rounded-full bg-white/90" />
              </div>
            </div>

            <div className="rounded-lg bg-white/5 p-2">
              <p className="text-[8px] font-medium text-white">🔥 14-day streak</p>
              <p className="mt-0.5 text-[7px] text-white/50">Top 8% at your gym</p>
            </div>

            <button
              type="button"
              className="mt-auto rounded-lg py-1.5 text-[9px] font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              Redeem reward
            </button>
          </div>
          <span className="text-[11px] text-faint">Live preview</span>
        </div>
      </CardContent>
    </Card>
  );
}
