"use client";

import * as React from "react";

import {
  clearStudioProfile,
  getDemoPersonalization,
  readStudioProfile,
  REOPEN_WIZARD_EVENT,
  STUDIO_PROFILE_READY_EVENT,
  writeStudioProfile,
  type DemoPersonalization,
  type StudioProfile,
  type StudioProfileState,
} from "@/lib/studio-profile";

interface StudioProfileContextValue {
  profile: StudioProfileState;
  hydrated: boolean;
  personalization: DemoPersonalization;
  wizardPending: boolean;
  saveProfile: (profile: StudioProfile | "skipped") => void;
  resetProfile: () => void;
}

const StudioProfileContext = React.createContext<StudioProfileContextValue | null>(null);

const PROFILE_CHANGED_EVENT = "fitloyalty:studio-profile-changed";
const emptySubscribe = () => () => {};

function subscribeToProfile(callback: () => void) {
  window.addEventListener(PROFILE_CHANGED_EVENT, callback);
  return () => window.removeEventListener(PROFILE_CHANGED_EVENT, callback);
}

const getServerProfileSnapshot = (): StudioProfileState => null;

export function StudioProfileProvider({ children }: { children: React.ReactNode }) {
  // Read localStorage via useSyncExternalStore (not useEffect+setState) so the
  // profile is available on the client's first render, SSR-safe, no extra render.
  const profile = React.useSyncExternalStore(
    subscribeToProfile,
    readStudioProfile,
    getServerProfileSnapshot,
  );
  const hydrated = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  const saveProfile = React.useCallback((next: StudioProfile | "skipped") => {
    writeStudioProfile(next);
    window.dispatchEvent(new CustomEvent(PROFILE_CHANGED_EVENT));
    window.dispatchEvent(new CustomEvent(STUDIO_PROFILE_READY_EVENT));
  }, []);

  const resetProfile = React.useCallback(() => {
    clearStudioProfile();
    window.dispatchEvent(new CustomEvent(PROFILE_CHANGED_EVENT));
    window.dispatchEvent(new CustomEvent(REOPEN_WIZARD_EVENT));
  }, []);

  const personalization = React.useMemo(() => getDemoPersonalization(profile), [profile]);
  const wizardPending = hydrated && profile === null;

  const value = React.useMemo(
    () => ({
      profile,
      hydrated,
      personalization,
      wizardPending,
      saveProfile,
      resetProfile,
    }),
    [profile, hydrated, personalization, wizardPending, saveProfile, resetProfile],
  );

  return (
    <StudioProfileContext.Provider value={value}>{children}</StudioProfileContext.Provider>
  );
}

export function useStudioProfile(): StudioProfileContextValue {
  const ctx = React.useContext(StudioProfileContext);
  if (!ctx) {
    throw new Error("useStudioProfile must be used within StudioProfileProvider");
  }
  return ctx;
}
