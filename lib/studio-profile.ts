export type StudioType = "yoga" | "crossfit" | "opengym" | "other";
export type SizeRange = "small" | "medium" | "large";
export type AggregatorChoice = "none" | "yes";

export interface StudioProfile {
  studioType: StudioType;
  size: SizeRange;
  aggregators: AggregatorChoice;
}

export type StudioProfileState = StudioProfile | "skipped" | null;

export const STUDIO_PROFILE_STORAGE_KEY = "fitloyalty-studio-profiled";

export const STUDIO_PROFILE_READY_EVENT = "fitloyalty:studio-profile-ready";
export const REOPEN_WIZARD_EVENT = "fitloyalty:reopen-setup-wizard";

export type AggregatorLayout = "default" | "prominent" | "deemphasized";
export type OverviewDescKey = "default" | "yoga" | "opengym" | "crossfit" | "other";
export type RecommendedPlanKey = "starter" | "growth" | "pro";

export interface DemoPersonalization {
  showAggregatorHub: boolean;
  aggregatorLayout: AggregatorLayout;
  showClassOccupancyTeaser: boolean;
  recommendedPlanKey: RecommendedPlanKey | null;
  descKey: OverviewDescKey;
  includeAggregatorTourSteps: boolean;
}

export function readStudioProfile(): StudioProfileState {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STUDIO_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    if (raw === "skipped") return "skipped";
    return JSON.parse(raw) as StudioProfile;
  } catch {
    return null;
  }
}

export function writeStudioProfile(profile: StudioProfile | "skipped"): void {
  if (typeof window === "undefined") return;
  if (profile === "skipped") {
    window.localStorage.setItem(STUDIO_PROFILE_STORAGE_KEY, "skipped");
  } else {
    window.localStorage.setItem(STUDIO_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }
}

export function clearStudioProfile(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STUDIO_PROFILE_STORAGE_KEY);
}

export function getDemoPersonalization(profile: StudioProfileState): DemoPersonalization {
  if (!profile || profile === "skipped") {
    return {
      showAggregatorHub: true,
      aggregatorLayout: "default",
      showClassOccupancyTeaser: false,
      recommendedPlanKey: null,
      descKey: "default",
      includeAggregatorTourSteps: true,
    };
  }

  const hasAggregators = profile.aggregators === "yes";
  const isYoga = profile.studioType === "yoga";
  const isOpenGym = profile.studioType === "opengym";

  let descKey: OverviewDescKey = "other";
  if (isYoga) descKey = "yoga";
  else if (isOpenGym) descKey = "opengym";
  else if (profile.studioType === "crossfit") descKey = "crossfit";

  return {
    showAggregatorHub: hasAggregators,
    aggregatorLayout: hasAggregators
      ? isOpenGym
        ? "prominent"
        : isYoga
          ? "deemphasized"
          : "default"
      : "default",
    showClassOccupancyTeaser: isYoga && !hasAggregators,
    recommendedPlanKey:
      profile.size === "small" ? "starter" : profile.size === "medium" ? "growth" : "pro",
    descKey,
    includeAggregatorTourSteps: hasAggregators,
  };
}

export function isWizardPending(profile: StudioProfileState, hydrated: boolean): boolean {
  return hydrated && profile === null;
}
