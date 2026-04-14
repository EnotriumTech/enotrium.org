"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const tabs = [
  {
    id: "upgrading",
    label: "Upgrading",
    image: "/upgrading-map.png",
    description:
      "Transform verified gaps into real growth. Build capabilities faster with personalized data featuring internal content, AI-powered insight.",
  },
  {
    id: "natural-resources",
    label: "Natural Resources",
    image: "/natural-resources.png",
    description:
      "Understand your operations in relation to ecological offsets. AI-driven analysis of land potential, regenerative practices, and resource mapping.",
  },
  {
    id: "command-center",
    label: "Command Center",
    image: "/command-center.png",
    description:
      "Unified observability and interoperability: Track every link, spot risks, and coordinate autonomously. Make decisions as soon as you see the pattern.",
  },
  {
    id: "vertical-integration",
    label: "Vertical Integration",
    image: "/vertical-integration.png",
    description:
      "Connecting farms → processors → manufacturers → end buyers for full supply chain control. Own your stack: From field to finished good with encrypted provenance and no intermediaries.",
  },
];

export default function PlatformPage() {
  const [activeTab, setActiveTab] = useState("upgrading");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="bg-white text-black min-h-screen font-[family-name:var(--font-inter)]">
      <Navbar invertLogo lightScrollBg darkText />

      {/* Hero */}
      <section className="pt-28 md:pt-32 px-6 lg:px-16 pb-16 max-w-[1400px] mx-auto">
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-black mb-6">
          Platform
        </p>
        <h1
          className="font-[family-name:var(--font-tektur)] tracking-tight text-black max-w-2xl"
          style={{ fontSize: "clamp(40px, 8vw, 110px)", lineHeight: 1.05, fontWeight: 400 }}
        >
          Measuring Agriculture&apos;s Potential in the AI Era
        </h1>
        <p className="mt-8 text-sm sm:text-base text-black/60 leading-relaxed max-w-sm">
          The only platform that verifies every farm and manufacturer across the world&apos;s supply chain.
        </p>
      </section>

      {/* Intelligence Feature Section */}
      <section className="px-6 lg:px-16 pb-24 max-w-[1400px] mx-auto">
        <h2
          className="font-[family-name:var(--font-tektur)] tracking-tight text-black mb-10"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.1, fontWeight: 400 }}
        >
          Intelligence that turns<br />instinct into action.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-0 border border-black/10">
          {/* Tab list */}
          <div className="border-b md:border-b-0 md:border-r border-black/10 py-6 px-6 flex flex-row md:flex-col gap-0 overflow-x-auto md:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left text-sm py-2 pr-6 md:pr-0 md:py-3 border-b border-black/10 last:border-b-0 whitespace-nowrap md:whitespace-normal transition-colors ${
                  activeTab === tab.id
                    ? "text-black font-medium"
                    : "text-black/40 hover:text-black/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="border-b md:border-b-0 md:border-r border-black/10 p-6 md:p-8 flex flex-col justify-start">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-black/40 mb-4">
              {active.label}
            </p>
            <p className="text-sm leading-relaxed text-black/70 max-w-xs">
              {active.description}
            </p>
          </div>

          {/* Screenshot */}
          <div className="relative min-h-[220px] md:min-h-0 overflow-hidden bg-black">
            <img
              key={active.id}
              src={active.image}
              alt={active.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-16 pb-32 max-w-[1400px] mx-auto">
        <h2
          className="font-[family-name:var(--font-tektur)] tracking-tight text-black"
          style={{ fontSize: "clamp(48px, 10vw, 140px)", lineHeight: 1.05, fontWeight: 400 }}
        >
          Request a<br />Demo
        </h2>
        <p className="mt-6 text-sm sm:text-base text-black/60 leading-relaxed max-w-sm">
          Reach out to us at{" "}
          <a
            href="mailto:enotriumtech@atomicmail.io"
            target="_self"
            className="text-black underline hover:text-neutral-600 transition-colors"
          >
            enotriumtech@atomicmail.io
          </a>{" "}
          for a demo.
        </p>
      </section>

      <Footer />
    </div>
  );
}
