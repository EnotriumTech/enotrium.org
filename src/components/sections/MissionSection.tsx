"use client";
import { useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/config/content";
import { section } from "framer-motion/client";

export function MissionSection() {
  const { mission } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          linesRef.current.forEach((line) => {
            line?.classList.add("drawn");
          });
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#000] overflow-hidden"
    >
      {/* Animated Grid Lines — SVG layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          .grid-line {
            stroke-dasharray: var(--l);
            stroke-dashoffset: var(--l);
            transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .grid-line.drawn { stroke-dashoffset: 0; }
        `}</style>

        {/* Vertical line 1 — 25%, draws top → down */}
        <line
          ref={(el) => (linesRef.current[0] = el)}
          className="grid-line"
          style={{ "--l": "80%" } as React.CSSProperties}
          x1="25%"
          y1="0"
          x2="25%"
          y2="80%"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          /* delay so h-lines start slightly after */
        />

        {/* Vertical line 2 — 75%, draws top → down, slight delay */}
        <line
          ref={(el) => (linesRef.current[1] = el)}
          className="grid-line"
          style={
            {
              "--l": "80%",
              transitionDelay: "0.1s",
            } as React.CSSProperties
          }
          x1="75%"
          y1="0"
          x2="75%"
          y2="80%"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Horizontal line 1 — draws left → right */}
        <line
          ref={(el) => (linesRef.current[2] = el)}
          className="grid-line"
          style={
            {
              "--l": "100%",
              transitionDelay: "0.2s",
            } as React.CSSProperties
          }
          x1="0"
          y1="calc(15% - 1.5cm)"
          x2="100%"
          y2="calc(15% - 1.5cm)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Horizontal line 2 — draws left → right */}
        <line
          ref={(el) => (linesRef.current[3] = el)}
          className="grid-line"
          style={
            {
              "--l": "100%",
              transitionDelay: "0.3s",
            } as React.CSSProperties
          }
          x1="0"
          y1="calc(55% + 1.5cm)"
          x2="100%"
          y2="calc(55% + 1.5cm)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Label */}
      <div
        className="absolute z-10"
        style={{ right: "calc(75% + 12px)", top: "126px" }}
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