"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/config/content";

const FLIP_WORDS = [
  "Orpheus",
  "Agriculture",
  "Technology",
  "Agri-Base",
  "Farming",
  "Arthedain",
  "Industry",
  "AIP",
  "Enotrium",
];

const FINAL_WORD = "Enotrium";

export function MissionSection() {
  const { mission } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const [displayWord, setDisplayWord] = useState(FINAL_WORD);
  const [isFlipping, setIsFlipping] = useState(false);
  const hasFlipped = useRef(false);

  // Grid line draw-on animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          linesRef.current.forEach((line) => {
            line?.classList.add("drawn");
          });

          // Trigger flip once
          if (!hasFlipped.current) {
            hasFlipped.current = true;
            startFlip();
          }
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  function startFlip() {
    setIsFlipping(true);
    let i = 0;
    const totalCycles = 8;
    const totalFlips = FLIP_WORDS.length * totalCycles;
    // Fast phase: cycle through all words 10 times, faster
    const fastInterval = setInterval(() => {
      setDisplayWord(FLIP_WORDS[i % FLIP_WORDS.length]);
      i++;
      // After 10 full cycles, slow down for the final land
      if (i >= totalFlips) {
        clearInterval(fastInterval);
        slowLand(i);
      }
    }, 40);
  }

  function slowLand(startIndex: number) {
    let i = startIndex;
    // Progressively slow down over the last 3 steps
    const delays = [100, 180, 280];
    let step = 0;

    function nextStep() {
      if (step < delays.length) {
        setDisplayWord(FLIP_WORDS[i % FLIP_WORDS.length]);
        i++;
        step++;
        setTimeout(nextStep, delays[step - 1]);
      } else {
        // Land on final
        setDisplayWord(FINAL_WORD);
        setIsFlipping(false);
      }
    }
    nextStep();
  }


  const textStyle: React.CSSProperties = {
    fontFamily: '"Söhne", "Inter", system-ui, sans-serif',
    fontWeight: 300,
    letterSpacing: "-0.01em",
    lineHeight: 1.4,
    color: "rgba(255,255,255,0.85)",
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#000] overflow-hidden"
    >
      <style>{`
        .grid-line {
          stroke-dasharray: var(--l);
          stroke-dashoffset: var(--l);
          transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .grid-line.drawn { stroke-dashoffset: 0; }

        .flip-word {
          display: inline-block;
          position: relative;
          color: rgba(255,255,255,0.85);
          transition: opacity 0.04s ease;
        }
        .flip-word.flipping {
          color: rgba(255,255,255,0.5);
        }
      `}</style>

      {/* Animated Grid Lines — SVG layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          ref={(el) => { linesRef.current[0] = el; }}
          className="grid-line"
          style={{ "--l": "80%" } as React.CSSProperties}
          x1="25%" y1="0" x2="25%" y2="80%"
          stroke="rgba(255,255,255,0.2)" strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <line
          ref={(el) => { linesRef.current[1] = el; }}
          className="grid-line"
          style={{ "--l": "80%", transitionDelay: "0.1s" } as React.CSSProperties}
          x1="75%" y1="0" x2="75%" y2="80%"
          stroke="rgba(255,255,255,0.2)" strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <line
          ref={(el) => { linesRef.current[2] = el; }}
          className="grid-line"
          style={{ "--l": "100%", transitionDelay: "0.2s" } as React.CSSProperties}
          x1="0" y1="calc(15% - 1.5cm)" x2="100%" y2="calc(15% - 1.5cm)"
          stroke="rgba(255,255,255,0.2)" strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <line
          ref={(el) => { linesRef.current[3] = el; }}
          className="grid-line"
          style={{ "--l": "100%", transitionDelay: "0.3s" } as React.CSSProperties}
          x1="0" y1="calc(55% + 1.5cm)" x2="100%" y2="calc(55% + 1.5cm)"
          stroke="rgba(255,255,255,0.2)" strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Label */}
      <div
        className="absolute z-10"
        style={{ right: "calc(75% + 12px)", top: "126px" }}
      >
        <p
          className="text-[14px] uppercase"
          style={{
            fontFamily: '"Söhne", "Inter", system-ui, sans-serif',
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span className={`flip-word${isFlipping ? " flipping" : ""}`}>
            {displayWord}
          </span>
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
            style={textStyle}
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