"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-black font-[family-name:var(--font-inter)]">
      <Navbar darkText />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-32 pb-24">

        {/* Page Header */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-6 font-[family-name:var(--font-inter)]">
          Careers
        </h1>
        <div className="h-px w-full bg-black/20 mb-16" />

        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-24">
          <p className="text-[10px] font-regular tracking-[0.25em] uppercase text-black pt-1">
            Join Us
          </p>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black max-w-2xl">
            Today&apos;s industrial markets can&apos;t keep up with demand — we need a new approach, where AI works with industry and deployed in live settings. We&apos;ve
            built a new kind of AI powered economic system for agricultural prosperity, delivering
            an order-of-magnitude better products in agriculture, manufacturing, compute, industrial production and farming. We&apos;re solving the hardest problems in global supply chains
            to unlock faster, more rural economic systems for individuals around the world.
          </p>
        </div>

        {/* The Enotrium Team */}
        <div id="team" className="mb-24 scroll-mt-32">
          <div className="h-px w-full bg-black/20 mb-12" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 font-[family-name:var(--font-tektur)]">
            The Enotrium Team
          </h2>

          <div className="space-y-8 max-w-3xl">
            <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
              The Enotrium Founders are an enterprising young team of engineers dedicated
              to achieving global farm security and industrial liberty for the free world.
            </p>

            <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
              The world is full of seven billion people. There are of course great minds and builders we have not
              encountered. The Enotrium hiring process is designed to override chance and meet individuals
              who share our vision and work ethic.
            </p>

            <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
              If you are an ambitious builder and have what we call &ldquo;Founder
              Mentality,&rdquo; We&apos;re looking for people who demand excellence from themselves
              and the individuals around them, obsess over details, and value creating excellence over
              prestige and conformism.
            </p>

            <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
              On the night of December 25, 1776, George Washington crossed the ice-ridden Delaware
              to take British forces by surprise. Washington did not take Christmas off, wait a week,
              or delay the destiny of America. He understood the strategic importance of the moment
              and was driven by a motivation that surpassed comfort and fear. 250 years later,
              America&apos;s situation is likewise dire. Freedom is under attack, technology and
              hyper-financialization increasingly erode human dignity and excellence. It is time
              Americans and the world at large work to re-founding a free and prosperous world order.
              2026 marks the beginning of a new techno-industrial revolution.
            </p>

            <div className="pt-4">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
                If you are a founder and engineer at heart, reach out about coming on to Enotrium.
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <div className="h-px w-full bg-black/20 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-black pt-1">
              Open Positions
            </p>
            <div>
              <p className="text-base sm:text-lg font-medium text-black mb-8 max-w-2xl">
                We don&apos;t have any specific roles open right now, but we&apos;re always interested
                in hearing from talented people who want to help rebuild rural America.
              </p>
              <p className="text-sm font-medium text-black/60 mb-2">Send your resume to</p>
              <a
                href="mailto:enotrium@atomicmail.io"
                target="_self"
                className="text-base sm:text-lg text-black hover:opacity-50 transition-opacity"
              >
                enotrium@atomicmail.io
              </a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
