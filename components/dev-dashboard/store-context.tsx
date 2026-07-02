"use client";

import * as React from "react";

import { useDevDashboardStore, type DevDashboardStore } from "@/hooks/use-dev-dashboard-store";

const DevDashboardContext = React.createContext<DevDashboardStore | null>(null);

export function DevDashboardProvider({ children }: { children: React.ReactNode }) {
  const store = useDevDashboardStore();
  return <DevDashboardContext.Provider value={store}>{children}</DevDashboardContext.Provider>;
}

export function useDevDashboard(): DevDashboardStore {
  const ctx = React.useContext(DevDashboardContext);
  if (!ctx) {
    throw new Error("useDevDashboard must be used within DevDashboardProvider");
  }
  return ctx;
}
