"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function IndustrialAgriculturePage() {
  return (
    <div className="min-h-screen bg-white text-black font-[family-name:var(--font-inter)]">
      <Navbar lightScrollBg invertLogo darkText />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-32 pb-24">

        {/* Page Header - Tektur hero */}
        <div className="mb-10 md:mb-16">
          <h1 className="font-[family-name:var(--font-tektur)] text-[80px] sm:text-[120px] md:text-[150px] lg:text-[180px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-[234px] tracking-tight text-black">
            <span className="block">Enotrium</span>
            <span className="block">
              The Industrial{" "}
              <span className="text-[0.5em] align-middle inline-block">↓</span>
            </span>
            <span className="block">Agri-Economy</span>
          </h1>
        </div>

        {/* Description row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16 mb-16">
          {/* Left - Inter Regular 24 */}
          <p className="font-[family-name:var(--font-inter)] text-base md:text-lg lg:text-[24px] font-normal leading-relaxed text-black/80 max-w-[240px] shrink-0">
            A New Model of
            <br />
            Sustainability and
            <br />
            Prosperity
          </p>

          {/* Right - Inter Medium 48 (Line Height 58) */}
          <p className="font-[family-name:var(--font-inter)] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium lg:leading-[58px] leading-snug text-black max-w-2xl">
            AI-driven strategy,
            <br className="hidden lg:block" />
            execution of the bio-
            <br className="hidden lg:block" />
            economy, and
            <br className="hidden lg:block" />
            establishment of the
            <br className="hidden lg:block" />
            industrial base.
          </p>
        </div>

        <div className="h-px w-full bg-black/20 mb-16" />

        {/* Opening */}
        <div className="max-w-3xl mb-20">
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium text-black">
            America&apos;s agrarian economy, which founded the nation and led to a free political
            and social system of prosperity and self sufficiency, has deteriorated and failed to
            match the rate of change of every other industry. Farmers are being left behind by
            evolving technological innovations in industries such as artificial intelligence, and
            an autonomous manufacturing revolution that is enabling the precision production of a
            new world.
          </p>
        </div>

        {/* Callout */}
        <div className="border-l-2 border-black pl-8 mb-20 max-w-3xl">
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80">
            Agriculture and the industrial base are increasingly different sectors
            altogether—yet their union is what ensures economic prosperity for both.
          </p>
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-10 max-w-3xl mb-24">
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
            This problem has compounded from a century of bad decisions. Industrial agriculture,
            specifically in the U.S., is on the brink of collapse. Just a few conglomerates
            dominate seed, fertilizer, equipment, and processing, locking farmers into high-input,
            low-margin models vulnerable to supply shocks, climate volatility, and rising costs.
            Yields have plateaued in many regions despite ever-greater chemical and mechanical
            intensity, soil health is degrading at alarming rates, and rural communities are
            hollowing out as young people leave for opportunities elsewhere.
          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
            Meanwhile, legacy farming systems face unprecedented challenges from the rapid rise of
            AI-powered precision tools, autonomous tractors and drones, widespread sensors,
            predictive software, and other affordable, scalable technologies. This shift is
            happening now—not in the future—seen in farms thriving with robotics, gene-edited
            crops, and data-driven operations, while traditional ones fall behind.
          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
            A major global conflict or prolonged food supply disruptions would demand production,
            attrition, and recovery at unimaginable scales—far beyond what today&apos;s agricultural
            base can handle. America must rebuild rural economies through a radically new approach
            to defining, designing, and producing agricultural output.
          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
            True deterrence against food insecurity requires an agri-industrial base capable of
            generating vastly more resilient, efficient, and sustainable material inputs.
            Traditional systems can&apos;t scale fast enough, but new autonomous machinery,
            precision biotech, and AI-optimized farming can—delivering large-scale capabilities to
            ensure abundance amid global threats. The U.S. and allies possess the tech, resources,
            talent, and manufacturing to mass-produce these systems and usher in a new golden age
            of agriculture.
          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
            We&apos;re investing aggressively—driven by conviction and aligned with government and
            farming partners—to expand capacity in precision seeds, autonomous equipment, and
            biotech facilities. These steps build real manufacturing scale, but we must push to
            autonomous regeneration.
          </p>

          <p className="text-base sm:text-lg leading-relaxed font-bold text-black">
            That&apos;s why we&apos;re committing even more to a breakthrough product: not a single
            crop or machine, but a maker of abundance itself. Enotrium is a software-defined
            manufacturing economy for hyper-scale advanced farming capabilities. Years in
            development, it will power everything we create moving forward.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
