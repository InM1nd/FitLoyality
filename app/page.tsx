import { Suspense } from "react";

import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingTicker } from "@/components/landing/landing-ticker";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingCapabilities } from "@/components/landing/landing-capabilities";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { PhoneGallery } from "@/components/landing/phone-gallery";
import { LandingSteps } from "@/components/landing/landing-steps";
import { ChurnCheck } from "@/components/landing/churn-check";
import { LandingPricing } from "@/components/landing/landing-pricing";
import { LandingProof } from "@/components/landing/landing-proof";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="landing grain relative min-h-screen overflow-x-clip">
      <LandingNav />
      <Suspense fallback={<div className="min-h-screen" />}>
        <main>
          <LandingHero />
          <LandingTicker />
          <LandingStats />
          <LandingCapabilities />
          <ProductShowcase />
          <PhoneGallery />
          <LandingSteps />
          <ChurnCheck />
          <LandingPricing />
          <LandingProof />
          <LandingCta />
        </main>
      </Suspense>
      <LandingFooter />
    </div>
  );
}
