"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";

// Lazy load below-the-fold sections for faster initial load
const MissionSection = dynamic(
  () => import("@/components/sections/MissionSection").then(mod => ({ default: mod.MissionSection })),
  { ssr: true }
);

const InvectiveSection = dynamic(
  () => import("@/components/sections/InvectiveSection").then(mod => ({ default: mod.InvectiveSection })),
  { ssr: true }
);

const SupplyChainSection = dynamic(
  () => import("@/components/sections/SupplyChainSection").then(mod => ({ default: mod.SupplyChainSection })),
  { ssr: false } // Globe needs client-side only
);

const Footer = dynamic(
  () => import("@/components/layout/Footer").then(mod => ({ default: mod.Footer })),
  { ssr: true }
);

const FeatureCarousel = dynamic(
  () => import("@/components/sections/FeatureCarousel").then(mod => ({ default: mod.FeatureCarousel })),
  { ssr: true }
);

// Lazy load heavy visualizations
const DarkVeil = dynamic(() => import("@/components/visualizations/DarkVeil"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground">
      <Navbar />

      {/* DarkVeil - Only visible in dark mode, lazy loaded */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DarkVeil />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <MissionSection />
        
        <FeatureCarousel />

        {/* AI Intelligence Section */}
        <section className="px-6 lg:px-16 max-w-[1400px] mx-auto py-24">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white font-[family-name:var(--font-inter)] text-center">
            Enotrium's Edge AI Models power real‑world, AI‑driven intelligence deployed in autonomous drones, and distributed sensing fleets—turning raw hardware into self-learning, intelligent agents <span className="text-silver-400">in the sky</span>
          </p>
        </section>

        <InvectiveSection />
        <div className="mb-36">
          <SupplyChainSection />
        </div>

        <Footer />
      </div>
    </main>
  );
}
