"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/config/content";

const FLIP_WORDS = [
  "ORPH1", "AGI01", "ENTR", "AGRI",
  "E0API", "1MESO", "Farming", "I5SNN",
  "SF342", "AIP00", "Enotrium",
];
const FINAL_WORD = "Enotrium";

export function MissionSection() {
  const { mission } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [displayWord, setDisplayWord] = useState(FINAL_WORD);
  const [isFlipping, setIsFlipping] = useState(false);
  const hasFlipped = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger all line divs
          gridRef.current?.querySelectorAll<HTMLDivElement>("[data-line]").forEach((el) => {
            el.style.transform = "scaleX(1)";
          });
          gridRef.current?.querySelectorAll<HTMLDivElement>("[data-line='v']").forEach((el) => {
            el.style.transform = "scaleY(1)";
          });

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
    const totalFlips = FLIP_WORDS.length * 6;
    const fastInterval = setInterval(() => {
      setDisplayWord(FLIP_WORDS[i % FLIP_WORDS.length]);
      i++;
      if (i >= totalFlips) {
        clearInterval(fastInterval);
        slowLand(i);
      }
    }, 30);
  }

  function slowLand(startIndex: number) {
    let i = startIndex;
    const delays = [100, 180, 280];
    let step = 0;
    function nextStep() {
      if (step < delays.length) {
        setDisplayWord(FLIP_WORDS[i % FLIP_WORDS.length]);
        i++;
        step++;
        setTimeout(nextStep, delays[step - 1]);
      } else {
        setDisplayWord(FINAL_WORD);
        setIsFlipping(false);
      }
    }
    nextStep();
  }

  const hLine = (delay: string) =>
    ({
      width: "100%",
      height: "1px",
      background: "rgba(255,255,255,0.2)",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: `transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
    } as React.CSSProperties);

  const vLine = (delay: string) =>
    ({
      width: "1px",
      height: "100%",
      borderLeft: "1px solid rgba(255,255,255,0.2)",
      transform: "scaleY(0)",
      transformOrigin: "top",
      transition: `transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
    } as React.CSSProperties);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#000] overflow-hidden"
    >
      <style>{`
        .flip-word { display: inline-block; color: rgba(255,255,255,0.85); }
        .flip-word.flipping { color: rgba(255,255,255,0.5); }
      `}</style>

      {/* Grid Lines — pure div/CSS transform, no SVG */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none">
        {/* Vertical 1 — 25% */}
        <div className="absolute top-0" style={{ left: "25%", width: "1px", height: "80%" }}>
          <div data-line="v" style={vLine("0s")} />
        </div>
        {/* Vertical 2 — 75% */}
        <div className="absolute top-0" style={{ left: "75%", width: "1px", height: "80%" }}>
          <div data-line="v" style={vLine("0s")} />
        </div>
        {/* Horizontal 1 */}
        <div className="absolute left-0 right-0" style={{ top: "calc(15% - 1.5cm)", height: "1px" }}>
          <div data-line="h" style={hLine("0.2s")} />
        </div>
        {/* Horizontal 2 */}
        <div className="absolute left-0 right-0" style={{ top: "calc(55% + 1.5cm)", height: "1px" }}>
          <div data-line="h" style={hLine("0.3s")} />
        </div>
      </div>

      {/* Label */}
      <div className="absolute z-10" style={{ right: "calc(75% + 12px)", top: "126px" }}>
        <p
          className="text-[14px] uppercase"
          style={{ fontFamily: '"Söhne", "Inter", system-ui, sans-serif', letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)" }}
        >
          <span className={`flip-word${isFlipping ? " flipping" : ""}`}>{displayWord}</span>
        </p>
      </div>

      {/* Content */}
      <div
        className="relative z-10 px-6 py-[120px] md:py-[120px]"
        style={{ paddingLeft: "calc(25% + 24px)", paddingRight: "calc(25% + 24px)" }}
      >
        <ScrollReveal>
          <p
            className="text-[24px] md:text-[28px] lg:text-[32px] text-center"
            style={{ fontFamily: '"Söhne", "Inter", system-ui, sans-serif', fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1.4, color: "rgba(255,255,255,0.85)" }}
          >
            {mission.text}
          </p>
        </ScrollReveal>

        <div className="mt-6 ml-4">
          <a
            href={mission.ctaLink}
            className="group inline-flex items-center transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "10px 18px", fontSize: "14px", fontFamily: '"Söhne", "Inter", system-ui, sans-serif', color: "rgba(255,255,255,0.85)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
          >
            {mission.cta}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}