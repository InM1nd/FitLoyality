"use client";

import * as React from "react";
import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";

const TOUR_SEEN_KEY = "fitloyalty-tour-seen";
/** DemoBanner dispatches this to restart the tour on demand. */
export const TOUR_EVENT = "fitloyalty:start-tour";

const STEPS = [
  {
    element: '[data-tour="saved-revenue"]',
    popover: {
      title: "The number that matters",
      description:
        "Every member won back in the churn window, counted in euros. Conservative attribution — this is what pays for FitLoyalty.",
    },
  },
  {
    element: '[data-tour="churn-window"]',
    popover: {
      title: "Who to call today",
      description:
        "Inactive 14+ days and close to their cancellation deadline. One tap on Nudge sends a personal message — before it's too late.",
    },
  },
  {
    element: '[data-tour="aggregator-hub"]',
    popover: {
      title: "Your true revenue mix",
      description:
        "Direct members vs USC, Wellpass and Hansefit in one view — visits, per-visit payouts and trends for every channel.",
    },
  },
  {
    element: '[data-tour="usc-converter"]',
    popover: {
      title: "Convertible USC regulars",
      description:
        "Self-paying USC members who already train here 2×+ a week. One conversion = ~€89 extra MRR, every month.",
    },
  },
  {
    element: '[data-tour="member-app"]',
    popover: {
      title: "What your members get",
      description:
        "A white-label app with weekly streaks, rewards and live occupancy — under your studio's name. Open it and take a look.",
    },
  },
];

/**
 * Guided dashboard tour (driver.js). Auto-starts once per browser on the
 * overview page; the DemoBanner "Tour" button restarts it any time.
 */
export function DemoTour() {
  const driverRef = React.useRef<Driver | null>(null);

  React.useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const d = driver({
      steps: STEPS,
      animate: !reducedMotion,
      showProgress: true,
      progressText: "{{current}} of {{total}}",
      nextBtnText: "Next →",
      prevBtnText: "← Back",
      doneBtnText: "Got it",
      overlayOpacity: 0.55,
      stagePadding: 6,
      stageRadius: 12,
      popoverClass: "fitloyalty-tour",
      onDestroyed: () => localStorage.setItem(TOUR_SEEN_KEY, "1"),
    });
    driverRef.current = d;

    const start = () => {
      if (!d.isActive()) d.drive();
    };
    window.addEventListener(TOUR_EVENT, start);

    let autoStart: ReturnType<typeof setTimeout> | undefined;
    if (!localStorage.getItem(TOUR_SEEN_KEY)) {
      // let the count-up animations land first
      autoStart = setTimeout(start, 1200);
    }

    return () => {
      window.removeEventListener(TOUR_EVENT, start);
      if (autoStart) clearTimeout(autoStart);
      d.destroy();
      driverRef.current = null;
    };
  }, []);

  return null;
}
