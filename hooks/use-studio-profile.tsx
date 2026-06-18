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

export function StudioProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = React.useState<StudioProfileState>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setProfile(readStudioProfile());
    setHydrated(true);
  }, []);

  const saveProfile = React.useCallback((next: StudioProfile | "skipped") => {
    writeStudioProfile(next);
    setProfile(next);
    window.dispatchEvent(new CustomEvent(STUDIO_PROFILE_READY_EVENT));
  }, []);

  const resetProfile = React.useCallback(() => {
    clearStudioProfile();
    setProfile(null);
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
