import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingBento } from "@/components/landing/landing-bento";
import { LandingShowcase } from "@/components/landing/landing-showcase";
import { LandingSteps } from "@/components/landing/landing-steps";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingStats />
        <LandingBento />
        <LandingShowcase />
        <LandingSteps />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
