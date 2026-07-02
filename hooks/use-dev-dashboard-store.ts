"use client";

import * as React from "react";

import {
  DEV_DASHBOARD_CHANGED_EVENT,
  DEV_DASHBOARD_DEFAULTS,
  readDevDashboardData,
  writeDevDashboardData,
  type DevDashboardData,
  type RealClient,
  type SimulatorInputs,
} from "@/lib/dev-dashboard";

const emptySubscribe = () => () => {};

function subscribeToDevDashboard(callback: () => void) {
  window.addEventListener(DEV_DASHBOARD_CHANGED_EVENT, callback);
  return () => window.removeEventListener(DEV_DASHBOARD_CHANGED_EVENT, callback);
}

const getServerSnapshot = (): DevDashboardData => DEV_DASHBOARD_DEFAULTS;

function persist(next: DevDashboardData) {
  writeDevDashboardData(next);
  window.dispatchEvent(new CustomEvent(DEV_DASHBOARD_CHANGED_EVENT));
}

/**
 * Sole state owner for the internal dev dashboard. Reads via
 * useSyncExternalStore (not useEffect+setState) so data is available on the
 * client's first render, SSR-safe, no extra render — mirrors
 * hooks/use-studio-profile.tsx. Writes go straight to localStorage and
 * broadcast a change event that the snapshot read subscribes to.
 */
export function useDevDashboardStore() {
  const data = React.useSyncExternalStore(subscribeToDevDashboard, readDevDashboardData, getServerSnapshot);
  const hydrated = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  const setSimulator = React.useCallback((patch: Partial<SimulatorInputs>) => {
    const current = readDevDashboardData();
    persist({ ...current, simulator: { ...current.simulator, ...patch } });
  }, []);

  const replaceSimulator = React.useCallback((values: SimulatorInputs) => {
    persist({ ...readDevDashboardData(), simulator: values });
  }, []);

  const addClient = React.useCallback((client: Omit<RealClient, "id">) => {
    const current = readDevDashboardData();
    persist({ ...current, clients: [...current.clients, { ...client, id: crypto.randomUUID() }] });
  }, []);

  const updateClient = React.useCallback((id: string, patch: Partial<RealClient>) => {
    const current = readDevDashboardData();
    persist({ ...current, clients: current.clients.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  }, []);

  const deleteClient = React.useCallback((id: string) => {
    const current = readDevDashboardData();
    persist({ ...current, clients: current.clients.filter((c) => c.id !== id) });
  }, []);

  const toggleChecklistItem = React.useCallback((id: string) => {
    const current = readDevDashboardData();
    persist({ ...current, checklist: { ...current.checklist, [id]: !current.checklist[id] } });
  }, []);

  const exportJson = React.useCallback(() => JSON.stringify(data, null, 2), [data]);

  const importJson = React.useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as Partial<DevDashboardData>;
      persist({
        simulator: { ...DEV_DASHBOARD_DEFAULTS.simulator, ...parsed.simulator },
        clients: parsed.clients ?? [],
        checklist: parsed.checklist ?? {},
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    data,
    hydrated,
    setSimulator,
    replaceSimulator,
    addClient,
    updateClient,
    deleteClient,
    toggleChecklistItem,
    exportJson,
    importJson,
  };
}

export type DevDashboardStore = ReturnType<typeof useDevDashboardStore>;
