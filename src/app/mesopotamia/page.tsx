"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type TagType = "TECHNOLOGY" | "CORPORATE" | "LEGISLATION" | "CHEMICAL";

interface Milestone {
  year: string;
  who: string;
  description: string;
  tag: TagType;
  farmPopulation: number;
  note: string;
  link?: string;
  highlight?: boolean;
}

const milestones: Milestone[] = [
  {
    year: "10000 BC",
    who: "Fertile Crescent peoples",
    description: "Neolithic Revolution — the birth of cultivation",
    tag: "TECHNOLOGY",
    farmPopulation: 0,
    note: "Humans transition from hunter-gatherers to farmers. Wild grains become crops. The foundation of civilization — and its first dependency.",
  },
  {
    year: "6000 BC",
    who: "Caucasus region, Georgia",
    description: "First evidence of winemaking — the vine is domesticated",
    tag: "TECHNOLOGY",
    farmPopulation: 0,
    note: "The oldest fermented grape residue found in Georgia. The vine begins its ten-thousand-year relationship with human civilization.",
  },
  {
    year: "3100 BC",
    who: "Mesopotamia & Egypt",
    description: "Irrigation systems — water brought under human control",
    tag: "TECHNOLOGY",
    farmPopulation: 0,
    note: "The Tigris and Euphrates tamed. The Fertile Crescent earns its name. For the first time, agriculture is not at the mercy of rain.",
  },
  {
    year: "4000 BC",
    who: "Sumerians",
    description: "The plow — one farmer feeds more, cities grow",
    tag: "TECHNOLOGY",
    farmPopulation: 0,
    note: "The plow transforms agriculture. Civilization accelerates. The surplus that makes cities possible begins here.",
  },
  {
    year: "900 BC",
    who: "Ancient Greeks",
    description: "Viticulture — wine becomes central to Mediterranean civilization",
    tag: "TECHNOLOGY",
    farmPopulation: 0,
    note: "Vineyards spread across the Mediterranean. Terroir matters for the first time. Wine becomes both commodity and culture.",
  },
  {
    year: "100 BC",
    who: "Roman latifundia",
    description: "Large-scale estate farming — the first industrial agriculture model",
    tag: "CORPORATE",
    farmPopulation: 0,
    note: "Latifundia emerge. Large estates worked by slaves. The first consolidation of land away from small holders. A pattern that would repeat.",
  },
  {
    year: "600 AD",
    who: "Medieval European farmers",
    description: "Three-field crop rotation — soil health encoded into practice",
    tag: "TECHNOLOGY",
    farmPopulation: 0,
    note: "The three-field system revolutionizes medieval farming. Yields increase. The first systematic approach to soil stewardship.",
  },
  {
    year: "1701",
    who: "Jethro Tull",
    description: "Seed drill — precision planting, less waste, higher yields",
    tag: "TECHNOLOGY",
    farmPopulation: 0,
    note: "The seed drill allows precise planting. Less waste. Higher yields. The English agricultural revolution begins.",
  },
  {
    year: "1793",
    who: "Eli Whitney",
    description: "Cotton gin invented — mechanizing harvest, entrenching monoculture",
    tag: "TECHNOLOGY",
    farmPopulation: 6.8,
    note: "The cotton gin exponentially increased cotton production but locked the South into a single crop economy — an early warning of monoculture dependency that persists in American agriculture today.",
  },
  {
    year: "1843",
    who: "John Lawes",
    description: "Superphosphate fertilizer — chemistry enters the field",
    tag: "CHEMICAL",
    farmPopulation: 6.8,
    note: "The first artificial fertilizer. Yields soar. But so does soil dependency. The beginning of agriculture's chemical entanglement.",
  },
  {
    year: "1862",
    who: "Abraham Lincoln & USDA founders",
    description: "USDA established — the first federal hand reaches into the field",
    tag: "LEGISLATION",
    farmPopulation: 6.6,
    note: "The USDA was created as a 'people's department.' Within decades it would grow into the administrative apparatus Hayek warned of — supervising all of farmers' production to make sure we don't overproduce.",
  },
  {
    year: "1866",
    who: "Gregor Mendel",
    description: "Laws of heredity — the invisible logic of the seed revealed",
    tag: "TECHNOLOGY",
    farmPopulation: 6.4,
    note: "The laws of inheritance discovered. Breeding becomes science. The foundation of modern genetics — and eventually, corporate seed patents.",
  },
  {
    year: "1910",
    who: "American farmers",
    description: "6 million farms — peak of US agricultural self-sufficiency",
    tag: "TECHNOLOGY",
    farmPopulation: 6.0,
    note: "The high water mark. More farms than ever before. More independence than ever before. 40% of Americans still worked in agriculture. It would never be this good again.",
  },
  {
    year: "1922",
    who: "Congress",
    description: "Capper–Volstead Act — cooperatives shielded, consolidation begins",
    tag: "LEGISLATION",
    farmPopulation: 5.5,
    note: "Well-intentioned legislation that would eventually concentrate market power away from individual farmers. The law that let farmers organize also let them consolidate.",
  },
  {
    year: "1928",
    who: "Bernard Baruch & Beardsley Ruml",
    description: "Wall Street designs the New Deal's agricultural price controls",
    tag: "CORPORATE",
    farmPopulation: 5.2,
    note: "Baruch — the fiftieth richest man in America — and Ruml, of the Rockefeller Memorial Fund and later the Federal Reserve Bank of New York, drew from German agricultural control models to impose parity pricing on behalf of FDR. The market becomes a policy tool.",
  },
  {
    year: "1933",
    who: "FDR & the AAA",
    description: "Agricultural Adjustment Act — farmers paid not to farm",
    tag: "LEGISLATION",
    farmPopulation: 4.8,
    note: "As Hayek wrote: 'American agriculture would be in a healthier state if the government had never meddled with prices and quantities and methods of production.' The patronization of the American farmer — justified as defending 'rugged individualism' — begins here.",
  },
  {
    year: "1944",
    who: "Norman Borlaug",
    description: "Green Revolution — high-yield monocrops, chemical dependence institutionalized",
    tag: "TECHNOLOGY",
    farmPopulation: 4.5,
    note: "A genuine leap in yield. But one that anchored global agriculture to proprietary seeds, synthetic nitrogen, and pesticide cycles. The land becomes a factory. The farmer becomes a technician.",
  },
  {
    year: "1950",
    who: "American agribusiness",
    description: "Rapid consolidation — small farms absorbed into industrial operations",
    tag: "CORPORATE",
    farmPopulation: 4.0,
    note: "Between 1950 and 1970, two million family farms disappeared. The family farm begins its long decline. Corporations enter the field. The era of agribusiness begins.",
  },
  {
    year: "1974",
    who: "Monsanto",
    description: "Glyphosate introduced to the US market — herbicide dependency begins",
    tag: "CHEMICAL",
    farmPopulation: 3.2,
    note: "Roundup hits the market. By the 1990s it would become the world's most-used herbicide, enabling Roundup Ready GMO crops and locking farmers into annual seed and chemical purchase cycles controlled by a single corporation.",
  },
  {
    year: "1985",
    who: "Congress",
    description: "Farm Bill restructured — commodity subsidies formalized, specialty crops sidelined",
    tag: "LEGISLATION",
    farmPopulation: 2.8,
    note: "The farm bill architecture that persists today — rewarding corn, soy, wheat, and cotton at scale while leaving fruit, vegetable, and specialty crop growers without a safety net. The government picks winners.",
  },
  {
    year: "1996",
    who: "Monsanto",
    description: "Roundup Ready soybean — GMO seed patents bind farmers to chemical ecosystems",
    tag: "CORPORATE",
    farmPopulation: 2.5,
    note: "Farmers sign technology agreements surrendering the ancient right to save seed. The crop becomes a licensed product. Supply is now managed not by nature or the farmer, but by the IP holder.",
  },
  {
    year: "2008",
    who: "Global recession",
    description: "Commodity price collapse — USDA bailouts normalize ad hoc payments",
    tag: "CORPORATE",
    farmPopulation: 2.2,
    note: "The pattern solidifies: markets fail, government intervenes with emergency payments, structural problems are left unaddressed. Farmers are kept solvent enough not to quit — and dependent enough not to resist.",
  },
  {
    year: "2012",
    who: "Doudna & Charpentier",
    description: "CRISPR — biology becomes editable, agriculture's genetic future opens",
    tag: "TECHNOLOGY",
    farmPopulation: 2.1,
    note: "The same tool that could liberate farmers from proprietary seed ecosystems — or deepen corporate control of genetics. Enotrium sees this as the beginning of sovereign agricultural biotechnology. The choice is still ours.",
  },
  {
    year: "2025",
    who: "USDA",
    description: "$12 billion Farmer Bridge Assistance — ad hoc bailout exceeds $30B since January",
    tag: "CORPORATE",
    farmPopulation: 2.0,
    note: "The FBA program allocated up to $11B for row crop producers and $1B for specialty crops, capped at $155,000 per farm. Sector-wide losses estimated at $35–44 billion. Most farmers agree: subsidies cannot fix a broken and manipulated market. The takeover of agriculture has been a slow encroachment of centralized power.",
  },
  {
    year: "Future",
    who: "Enotrium",
    description: "The new order — bridging agriculture to real industry",
    tag: "TECHNOLOGY",
    farmPopulation: 1.9,
    note: "A parity of agricultural crops not to cheap commodity markets, but to America's most important industries — defense, construction, housing, and energy. Enotrium is the new order which will bridge agriculture to real industry. USDA can have the century off.",
    link: "/aip",
    highlight: true,
  },
];

const tagColors: Record<TagType, string> = {
  TECHNOLOGY: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
  CORPORATE: "text-red-400 bg-red-400/10 border border-red-400/20",
  LEGISLATION: "text-amber-400 bg-amber-400/10 border border-amber-400/20",
  CHEMICAL: "text-pink-400 bg-pink-400/10 border border-pink-400/20",
};

const farmPopulationData = [
  { year: 1793, population: 6.8 },
  { year: 1862, population: 6.6 },
  { year: 1910, population: 6.0 },
  { year: 1922, population: 5.5 },
  { year: 1928, population: 5.2 },
  { year: 1933, population: 4.8 },
  { year: 1944, population: 4.5 },
  { year: 1950, population: 4.0 },
  { year: 1974, population: 3.2 },
  { year: 1985, population: 2.8 },
  { year: 1996, population: 2.5 },
  { year: 2008, population: 2.2 },
  { year: 2012, population: 2.1 },
  { year: 2025, population: 2.0 },
  { year: 2026, population: 1.9 },
];

const MIN_POP = 1.5;
const MAX_POP = 6.8;
const CHART_W = 220;
const CHART_H = 110;

function toChartCoords(yearIndex: number, total: number, pop: number) {
  const x = (yearIndex / (total - 1)) * CHART_W;
  const y = CHART_H - ((pop - MIN_POP) / (MAX_POP - MIN_POP)) * CHART_H;
  return { x, y };
}

function Sparkline({ activePop }: { activePop: number | null }) {
  const points = farmPopulationData
    .map((d, i) => {
      const { x, y } = toChartCoords(i, farmPopulationData.length, d.population);
      return `${x},${y}`;
    })
    .join(" ");

  const activeIndex = activePop !== null
    ? farmPopulationData.reduce((best, d, i) =>
        Math.abs(d.population - activePop) < Math.abs(farmPopulationData[best].population - activePop) ? i : best, 0)
    : null;

  const dot = activeIndex !== null
    ? toChartCoords(activeIndex, farmPopulationData.length, farmPopulationData[activeIndex].population)
    : null;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      className="overflow-visible"
      aria-hidden="true"
    >
      <line x1="0" y1="0" x2={CHART_W} y2="0" stroke="#2a2a2a" strokeWidth="1" />
      <line x1="0" y1={CHART_H / 2} x2={CHART_W} y2={CHART_H / 2} stroke="#2a2a2a" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="0" y1={CHART_H} x2={CHART_W} y2={CHART_H} stroke="#2a2a2a" strokeWidth="1" />
      <polyline
        points={points}
        fill="none"
        stroke="#4a5e3a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {dot && (
        <>
          <circle cx={dot.x} cy={dot.y} r={5} fill="#9ab868" />
          <circle cx={dot.x} cy={dot.y} r={9} fill="none" stroke="#9ab868" strokeWidth="1" opacity="0.4" />
        </>
      )}
      <text x="0" y={CHART_H - 2} fontSize="8" fill="#444" fontFamily="monospace">1793</text>
      <text x={CHART_W} y={CHART_H - 2} fontSize="8" fill="#444" fontFamily="monospace" textAnchor="end">2025</text>
      <text x="2" y="9" fontSize="8" fill="#444" fontFamily="monospace">6.8M</text>
      <text x="2" y={CHART_H - 2} fontSize="8" fill="#444" fontFamily="monospace">1.5M</text>
    </svg>
  );
}

export default function FutureOfAgriculturePage() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prev = document.documentElement.style.backgroundColor;
    document.documentElement.style.backgroundColor = "#0a0a0a";
    return () => { document.documentElement.style.backgroundColor = prev; };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.08 }
    );
    entryRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onScroll = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const viewMid = window.scrollY + window.innerHeight * 0.45;
      let closest: { dist: number; milestone: Milestone | null } = { dist: Infinity, milestone: null };
      entryRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elMid = window.scrollY + rect.top + rect.height / 2;
        const dist = Math.abs(elMid - viewMid);
        if (dist < closest.dist) {
          closest = { dist, milestone: milestones[i] };
        }
      });
      setActiveMilestone(closest.milestone);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [onScroll]);

  const displayPop = activeMilestone?.farmPopulation ?? null;
  const hasPopData = displayPop !== null && displayPop > 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto">
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-500 mb-4">
          Enotrium — The Future of Agriculture
        </p>
        <h1 className="text-5xl sm:text-7xl font-light leading-tight text-neutral-100 mb-8" style={{ fontFamily: "var(--font-tektur, serif)" }}>
          From the soil,<br />
          <em className="text-[#9ab868] not-italic">a reckoning</em>
        </h1>
        <p className="max-w-xl text-neutral-400 text-lg font-light leading-relaxed mb-4">
          For a century, the distance between a farmer and his own harvest has been filled by the administrative state — its subsidies, its price floors, its corporate beneficiaries.
        </p>
        <p className="max-w-xl text-neutral-400 text-lg font-light leading-relaxed mb-12">
          With Enotrium, we are building the bridge back to sovereign agriculture. There is great work to be done. And you're part of it.
        </p>
        <Link href="/aip" className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#6a7e4a] border-b border-[#6a7e4a]/40 pb-0.5 hover:text-[#9ab868] hover:border-[#9ab868] transition-colors">
          What could we grow together? →
        </Link>
        <div className="mt-16 h-px w-full bg-neutral-800" />
      </section>

      {/* Three-column layout */}
      <section className="px-6 max-w-[1400px] mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-0">

          {/* LEFT SIDEBAR — Farmer Count */}
          <div className="hidden lg:block relative">
            <div ref={sidebarRef} className="sticky top-24 pr-8 border-r border-neutral-800/60">
              <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-neutral-600 mb-5">
                US farm operations
              </p>

              {/* Big number */}
              <div className="mb-6">
                <div
                  className="font-light leading-none mb-1 transition-all duration-500"
                  style={{
                    fontFamily: "var(--font-tektur, serif)",
                    fontSize: hasPopData ? "52px" : "36px",
                    color: hasPopData ? "#c8e898" : "#3a3a3a",
                  }}
                >
                  {hasPopData ? `${displayPop!.toFixed(1)}M` : "—"}
                </div>
                <p className="text-[11px] font-mono text-neutral-600">
                  {activeMilestone && hasPopData
                    ? `circa ${activeMilestone.year}`
                    : "scroll to reveal"}
                </p>
              </div>

              {/* Sparkline */}
              <div className="mb-6">
                <Sparkline activePop={hasPopData ? displayPop : null} />
              </div>

              {/* Legend */}
              <div className="mb-6 space-y-1.5">
                {(["TECHNOLOGY","CORPORATE","LEGISLATION","CHEMICAL"] as TagType[]).map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className={`inline-block px-1.5 py-0.5 text-[8px] font-mono tracking-wider ${tagColors[t]}`}>{t}</span>
                  </div>
                ))}
              </div>

              {/* Contextual note */}
              <div className="border-t border-neutral-800 pt-4">
                <p
                  className="text-[11px] leading-relaxed text-neutral-500 transition-all duration-500"
                  style={{ fontStyle: activeMilestone ? "italic" : "normal" }}
                >
                  {activeMilestone?.note ?? "Scroll through the timeline to track how US farm populations changed at each inflection point in history."}
                </p>
              </div>
            </div>
          </div>

          {/* CENTER — Timeline */}
          <div className="lg:px-12">
            {milestones.map((milestone, index) => (
              <div
                key={`${milestone.year}-${index}`}
                ref={(el) => { entryRefs.current[index] = el; }}
                data-index={index}
                className={`transition-all duration-700 ease-out ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div
                  className={`py-5 border-b border-neutral-800/70 transition-colors duration-300 ${
                    activeMilestone?.year === milestone.year
                      ? "border-neutral-700 bg-neutral-900/30"
                      : "hover:bg-neutral-900/20"
                  } ${milestone.highlight ? "pt-8 pb-8" : ""}`}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-[11px] font-mono text-neutral-600 min-w-[72px] shrink-0 pt-0.5">
                      {milestone.year}
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] font-mono text-neutral-600 mb-1">
                        {milestone.who}
                      </p>
                      <p
                        className={`font-light leading-snug transition-colors duration-300 ${
                          milestone.highlight
                            ? "text-[#c8e898] text-xl italic"
                            : activeMilestone?.year === milestone.year
                            ? "text-white text-base"
                            : "text-neutral-300 text-base"
                        }`}
                        style={{ fontFamily: milestone.highlight ? "var(--font-tektur, serif)" : undefined }}
                      >
                        {milestone.highlight && milestone.link
                          ? <Link href={milestone.link} className="hover:text-[#9ab868] transition-colors">{milestone.description}</Link>
                          : milestone.description}
                      </p>
                      <span className={`inline-block mt-3 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase ${tagColors[milestone.tag]}`}>
                        {milestone.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Closing statement */}
            <div className="pt-16 pb-8 border-t border-neutral-800 mt-4">
              <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-md italic">
                "The agricultural economy must make changes to its internal structure which will change the relative prices of new and different products. Reliance on bailouts prevents our necessary evolution."
              </p>
              <p className="text-neutral-700 text-xs font-mono mt-3">— Enotrium</p>
              <Link
                href="/aip"
                className="inline-block mt-8 text-[10px] font-mono tracking-[0.15em] uppercase text-[#6a7e4a] border-b border-[#6a7e4a]/40 pb-0.5 hover:text-[#9ab868] hover:border-[#9ab868] transition-colors"
              >
                Join Enotrium →
              </Link>
            </div>
          </div>

          {/* RIGHT SIDEBAR — mobile farm count (visible on mobile as bottom bar) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 pl-8 border-l border-neutral-800/60">
              <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-neutral-600 mb-5">
                Active event
              </p>
              {activeMilestone ? (
                <div className="space-y-3">
                  <p className="text-[11px] font-mono text-[#6a7e4a]">{activeMilestone.year}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">{activeMilestone.who}</p>
                  <div className={`h-px w-full my-3 bg-neutral-800`} />
                  <div className="space-y-2">
                    <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-700">context</p>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      {activeMilestone.note}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-neutral-700 italic">Scroll to explore the timeline</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-neutral-800 px-6 py-3 z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-600">US farms</p>
            <p className="text-2xl font-light text-[#c8e898]" style={{ fontFamily: "var(--font-tektur, serif)" }}>
              {hasPopData ? `${displayPop!.toFixed(1)}M` : "—"}
            </p>
          </div>
          <div className="text-right max-w-[60%]">
            <p className="text-[10px] font-mono text-[#6a7e4a]">{activeMilestone?.year ?? ""}</p>
            <p className="text-[10px] text-neutral-600 truncate">{activeMilestone?.description ?? "Scroll to explore"}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}