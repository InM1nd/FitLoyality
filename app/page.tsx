import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingTicker } from "@/components/landing/landing-ticker";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingCapabilities } from "@/components/landing/landing-capabilities";
import { LandingShowcase } from "@/components/landing/landing-showcase";
import { LandingSteps } from "@/components/landing/landing-steps";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="landing grain relative min-h-screen overflow-x-clip">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingTicker />
        <LandingStats />
        <LandingCapabilities />
        <LandingShowcase />
        <LandingSteps />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
