"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const stats = [
  {
    number: "1.6 Million Farms",
    label: "On Chain",
    description:
      "We help people help the land and improve conservation of the nation's soil and water resources. We track environmental data, on soil health, crop variety, and land conservation to support the work of American farmers.",
  },
  {
    number: "1 Million Acres",
    label: "Acres Regenerated",
    description:
      "Land Quality requires Stewardship. Enotrium is proud steward of nature and our nation's environment. We seek to convert under-invested regions into regenerative agriculture powerhouses, one farm at a time.",
  },
  {
    number: "30+ Tribes",
    label: "Creating the Industry",
    description:
      "Badlands represents the single largest Regenerative Agriculture and Technology company led by Indigenous Americans across the West, creating thousands of new jobs in agriculture.",
  },
  {
    number: "$1 Billion",
    label: "Annual Production",
    description:
      "$1 Billion per year in projected economic output, contributing to America's agriculture and manufacturing production.",
  },
];

export default function BadlandsPage() {
  useEffect(() => {
    const prev = document.documentElement.style.backgroundColor;
    document.documentElement.style.backgroundColor = "#ffffff";
    return () => {
      document.documentElement.style.backgroundColor = prev;
    };
  }, []);

  return (
    <div
      className={`min-h-screen ${inter.className}`}
      style={{ backgroundColor: "#ffffff", color: "#111" }}
    >
      <Navbar lightScrollBg invertLogo darkText lightMegaMenu />

      {/* Hero */}
      <section className="pt-28 pb-6 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <h1
          className="text-4xl sm:text-8xl lg:text-8xl font-normal font-[family-name:var(--font-tektur)]"
          style={{ color: "#111" }}
        >
          Badlands
        </h1>
        <div className="mt-4 mb-6 h-0.5 w-full" style={{ backgroundColor: "#999" }} />
        <div className="space-y-0">
          <p className="text-sm font-semibold" style={{ color: "#555" }}>
            Built by Enotrium
          </p>
          <p className="text-sm font-semibold" style={{ color: "#555" }}>
            Led by the People
          </p>
        </div>
      </section>

      {/* Landscape image */}
      <section className="relative mt-4 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mountains.jpg"
            alt="Mountain landscape"
            className="w-full h-auto object-contain"
          />
          {/* Down arrow */}
          <div className="absolute bottom-5 right-6" style={{ pointerEvents: "none" }}>
            <svg
              width="18"
              height="36"
              viewBox="0 0 18 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="9" y1="0" x2="9" y2="33" stroke="white" strokeWidth="1.5" />
              <polyline points="2,26 9,33 16,26" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* Bio-Based heading */}
      <section className="py-16 px-6 text-center">
        <h2
          className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight"
          style={{ color: "#111" }}
        >
          Bio-Based
          <br />
          Materials Production
        </h2>
      </section>

      {/* Farmland image */}
      <section className="px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="w-full overflow-hidden" style={{ height: "480px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fields.jpg"
            alt="Fields"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Description */}
      <section className="px-6 lg:px-16 max-w-[1400px] mx-auto py-12">
        <p className="text-base font-bold leading-relaxed max-w-xs" style={{ color: "#111" }}>
          The Enotrium Value chain begins with the farmer and ends with American manufacturing.
        </p>
      </section>

      {/* Stats */}
      <section
        className="px-6 lg:px-16 max-w-[1400px] mx-auto py-8"
        style={{ borderTop: "1px solid #ccc" }}
      >
        <div>
          {stats.map((stat, i) => (
            <div
              key={stat.number}
              className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              style={i < stats.length - 1 ? { borderBottom: "1px solid #ddd" } : {}}
            >
              <div>
                <p
                  className="text-4xl sm:text-5xl font-bold"
                  style={{ color: "#111" }}
                >
                  {stat.number}
                </p>
                <p className="text-sm font-semibold mt-1" style={{ color: "#888" }}>
                  {stat.label}
                </p>
              </div>
              <div className="md:pt-2">
                <p className="text-sm font-semibold leading-relaxed" style={{ color: "#555" }}>
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
