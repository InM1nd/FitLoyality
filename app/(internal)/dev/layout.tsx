import * as React from "react";
import type { Metadata } from "next";

import { DevDashboardGate } from "@/components/dev-dashboard/gate";
import { DevDashboardProvider } from "@/components/dev-dashboard/store-context";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DevDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DevDashboardGate>
      <DevDashboardProvider>{children}</DevDashboardProvider>
    </DevDashboardGate>
  );
}
