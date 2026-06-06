import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { DemoBanner } from "@/components/layout/demo-banner";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <DemoBanner />
      <Sidebar />
      <div className="md:pl-60">
        <Header />
        <main className="mx-auto max-w-[1280px] px-5 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
