"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/config/content";

export function MissionSection() {
  const { mission } = siteConfig;

  return (
    <section className="relative w-full min-h-screen bg-[#000] overflow-hidden">
      {/* Grid Lines Container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical Line 1 - 25%, shortened from bottom */}
        <div
          className="absolute top-0"
          style={{
            left: "25%",
            width: "2px",
            height: "80%",
            background: "rgba(255,255,255,0.2)",
          }}
        />
        {/* Vertical Line 2 - 75%, shortened from bottom */}
        <div
          className="absolute top-0"
          style={{
            left: "75%",
            width: "2px",
            height: "80%",
            background: "rgba(255,255,255,0.2)",
          }}
        />

        {/* Horizontal Line 1 - 15% */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "calc(15% - 2cm)",
            height: "2px",
            background: "rgba(255,255,255,0.2)",
          }}
        />
        {/* Horizontal Line 2 - 55% (pushed up 30% from 85%) */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "calc(55% + 2cm)",
            height: "2px",
            background: "rgba(255,255,255,0.2)",
          }}
        />
      </div>

      {/* Label - Left of first grid line, aligned with text top */}
      <div
        className="absolute z-10"
        style={{
          right: "calc(75% + 12px)",
          top: "126px",
        }}
      >
        <p
          className="text-[12px] uppercase"
          style={{
            fontFamily: '"Söhne", "Inter", system-ui, sans-serif',
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {mission.label}
        </p>
      </div>

      {/* Content */}
      <div
        className="relative z-10 px-6 py-[120px] md:py-[120px]"
        style={{
          paddingLeft: "calc(25% + 24px)",
          paddingRight: "calc(25% + 24px)",
        }}
      >
        <ScrollReveal>
          <p
            className="text-[24px] md:text-[28px] lg:text-[32px] text-center"
            style={{
              fontFamily: '"Söhne", "Inter", system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {mission.text}
          </p>
        </ScrollReveal>

        {/* Button */}
        <div className="mt-6 ml-4">
          <a
            href={mission.ctaLink}
            className="group inline-flex items-center transition-all duration-300"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "10px 18px",
              fontSize: "14px",
              fontFamily: '"Söhne", "Inter", system-ui, sans-serif',
              color: "rgba(255,255,255,0.85)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            {mission.cta}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
