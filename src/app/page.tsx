"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";

// Lazy load below-the-fold sections for faster initial load
const ManifestoSection = dynamic(
  () => import("@/components/sections/ManifestoSection").then(mod => ({ default: mod.ManifestoSection })),
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
        <ManifestoSection />
        <div className="mb-36">
          <SupplyChainSection />
        </div>

        <Footer />
      </div>
    </main>
  );
}
