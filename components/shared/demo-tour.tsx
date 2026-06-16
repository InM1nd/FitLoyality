"use client";

import * as React from "react";
import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";

import { useT } from "@/lib/i18n/context";

const TOUR_SEEN_KEY = "fitloyalty-tour-seen";
/** DemoBanner dispatches this to restart the tour on demand. */
export const TOUR_EVENT = "fitloyalty:start-tour";

/**
 * Guided dashboard tour (driver.js). Auto-starts once per browser on the
 * overview page; the DemoBanner "Tour" button restarts it any time.
 * Re-initialises when the locale changes so all copy stays in sync.
 */
export function DemoTour() {
  const t = useT("demo");
  const driverRef = React.useRef<Driver | null>(null);

  React.useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const steps = [
      {
        element: '[data-tour="saved-revenue"]',
        popover: { title: t("tour1Title"), description: t("tour1Desc") },
      },
      {
        element: '[data-tour="churn-window"]',
        popover: { title: t("tour2Title"), description: t("tour2Desc") },
      },
      {
        element: '[data-tour="aggregator-hub"]',
        popover: { title: t("tour3Title"), description: t("tour3Desc") },
      },
      {
        element: '[data-tour="usc-converter"]',
        popover: { title: t("tour4Title"), description: t("tour4Desc") },
      },
      {
        element: '[data-tour="member-app"]',
        popover: { title: t("tour5Title"), description: t("tour5Desc") },
      },
    ];

    const d = driver({
      steps,
      animate: !reducedMotion,
      showProgress: true,
      progressText: "{{current}} / {{total}}",
      nextBtnText: t("tourNext"),
      prevBtnText: t("tourBack"),
      doneBtnText: t("tourDone"),
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
      autoStart = setTimeout(start, 1200);
    }

    return () => {
      window.removeEventListener(TOUR_EVENT, start);
      if (autoStart) clearTimeout(autoStart);
      d.destroy();
      driverRef.current = null;
    };
  }, [t]);

  return null;
}
