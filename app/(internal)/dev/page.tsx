"use client";

import * as React from "react";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GatesTab } from "@/components/dev-dashboard/gates-tab";
import { MetricsTab } from "@/components/dev-dashboard/metrics-tab";
import { SimulatorTab } from "@/components/dev-dashboard/simulator-tab";
import { useDevDashboard } from "@/components/dev-dashboard/store-context";

export default function DevDashboardPage() {
  const { hydrated, exportJson, importJson } = useDevDashboard();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function handleExport() {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fitloyalty-dev-dashboard-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const text = await file.text();
    const ok = importJson(text);
    toast(
      ok ? "Dashboard data imported" : "Import failed",
      { description: ok ? "Simulator, clients and checklist replaced." : "That file isn't valid dashboard JSON." },
    );
  }

  // Wait for localStorage hydration before rendering — avoids a flash of
  // default values before the real, persisted data loads.
  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface-1 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight">Business Model Dashboard</h1>
            <Badge variant="warning">INTERNAL — not for demo</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={handleExport}>
              <Download className="size-3.5" />
              Export JSON
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={handleImportClick}>
              <Upload className="size-3.5" />
              Import JSON
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 py-6 md:px-8">
        <Tabs defaultValue="simulator">
          <TabsList>
            <TabsTrigger value="simulator">Симулятор</TabsTrigger>
            <TabsTrigger value="metrics">Реальные метрики</TabsTrigger>
            <TabsTrigger value="gates">Гейты и беклог</TabsTrigger>
          </TabsList>
          <TabsContent value="simulator">
            <SimulatorTab />
          </TabsContent>
          <TabsContent value="metrics">
            <MetricsTab />
          </TabsContent>
          <TabsContent value="gates">
            <GatesTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
