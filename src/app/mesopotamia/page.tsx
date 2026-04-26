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
  globalFarmers: number | null; // billions
  note: string;
  link?: string;
  highlight?: boolean;
}

// Global farmer estimates (billions) — FAO + historical estimates
// Pre-modern entries have null (no reliable data)
const milestones: Milestone[] = [
  {
    year: "10000 BC",
    who: "Fertile Crescent peoples",
    description: "Neolithic Revolution — agriculture and the birth of civilization",
    tag: "TECHNOLOGY",
    globalFarmers: null,
    note: "Humans transition from hunter-gatherers to farmers. Wild grains become crops. The foundation of civilization — and its first dependency on the land.",
  },
  {
    year: "6000 BC",
    who: "Caucasus region, Georgia",
    description: "First evidence of winemaking — the vine is domesticated",
    tag: "TECHNOLOGY",
    globalFarmers: null,
    note: "The oldest fermented grape residue found in Georgia. The vine begins its ten-thousand-year relationship with human civilization. Terroir matters before the word exists.",
  },
  {
    year: "3100 BC",
    who: "Mesopotamia & Egypt",
    description: "Irrigation systems — water brought under human control",
    tag: "TECHNOLOGY",
    globalFarmers: null,
    note: "The Tigris and Euphrates tamed. The Fertile Crescent earns its name. For the first time, agriculture is not at the mercy of rain.",
  },
  {
    year: "4000 BC",
    who: "Sumerians",
    description: "The plow — one farmer feeds more, cities grow",
    tag: "TECHNOLOGY",
    globalFarmers: null,
    note: "The plow transforms agriculture. The surplus that makes cities possible begins here. Civilization accelerates.",
  },
  {
    year: "900 BC",
    who: "Ancient Greeks",
    description: "Viticulture — wine becomes central to Mediterranean civilization",
    tag: "TECHNOLOGY",
    globalFarmers: null,
    note: "Vineyards spread across the Mediterranean. Wine becomes both commodity and culture. The origin of what Enotrium carries forward.",
  },
  {
    year: "100 BC",
    who: "Roman latifundia",
    description: "Large-scale estate farming — the first industrial agriculture model",
    tag: "CORPORATE",
    globalFarmers: null,
    note: "Latifundia emerge. Large estates worked by slaves. The first consolidation of land away from small holders. A pattern that would repeat for two thousand years.",
  },
  {
    year: "600 AD",
    who: "Medieval European farmers",
    description: "Three-field crop rotation — soil health encoded into practice",
    tag: "TECHNOLOGY",
    globalFarmers: null,
    note: "The first systematic approach to soil stewardship. Yields increase. The commons sustain communities for centuries.",
  },
  {
    year: "1701",
    who: "Jethro Tull",
    description: "Seed drill — precision planting, less waste, higher yields",
    tag: "TECHNOLOGY",
    globalFarmers: null,
    note: "The seed drill allows precise planting. The English agricultural revolution begins. Mechanization enters the field for the first time.",
  },
  {
    year: "1793",
    who: "Eli Whitney",
    description: "Cotton gin invented — mechanizing harvest, entrenching monoculture",
    tag: "TECHNOLOGY",
    globalFarmers: 0.9,
    note: "The cotton gin exponentially increased cotton production but locked the South into a single crop economy — an early warning of monoculture dependency that would define American agriculture.",
  },
  {
    year: "1843",
    who: "John Lawes",
    description: "Superphosphate fertilizer — chemistry enters the field",
    tag: "CHEMICAL",
    globalFarmers: 0.95,
    note: "The first artificial fertilizer. Yields soar. But so does soil dependency. The beginning of agriculture's chemical entanglement, which would culminate in glyphosate a century later.",
  },
  {
    year: "1862",
    who: "Abraham Lincoln & USDA founders",
    description: "USDA established — the first federal hand reaches into the field",
    tag: "LEGISLATION",
    globalFarmers: 1.0,
    note: "The USDA was created as a 'people's department.' Within decades it would grow into the administrative apparatus Hayek warned of — supervising all of farmers' production to make sure they don't overproduce.",
  },
  {
    year: "1866",
    who: "Gregor Mendel",
    description: "Laws of heredity — the invisible logic of the seed revealed",
    tag: "TECHNOLOGY",
    globalFarmers: 1.05,
    note: "The laws of inheritance discovered. Breeding becomes science. The foundation of modern genetics — and eventually, the corporate seed patents that would bind farmers to annual purchase cycles.",
  },
  {
    year: "1910",
    who: "American farmers",
    description: "6 million US farms — peak of American agricultural self-sufficiency",
    tag: "TECHNOLOGY",
    globalFarmers: 1.4,
    note: "The high water mark. More farms than ever before. More independence than ever before. 40% of Americans still worked in agriculture. It would never be this good again.",
  },
  {
    year: "1922",
    who: "Congress",
    description: "Capper–Volstead Act — cooperatives shielded, consolidation begins",
    tag: "LEGISLATION",
    globalFarmers: 1.45,
    note: "Well-intentioned legislation that would eventually concentrate market power away from individual farmers. The law that let farmers organize also let them consolidate.",
  },
  {
    year: "1928",
    who: "Bernard Baruch & Beardsley Ruml",
    description: "Wall Street designs the New Deal's agricultural price controls",
    tag: "CORPORATE",
    globalFarmers: 1.5,
    note: "Baruch — the fiftieth richest man in America — and Ruml, of the Rockefeller Memorial Fund and later the Federal Reserve Bank of New York, drew from German agricultural control models to impose parity pricing on behalf of FDR. The market becomes a policy instrument.",
  },
  {
    year: "1933",
    who: "FDR & the AAA",
    description: "Agricultural Adjustment Act — farmers paid not to farm, production controlled",
    tag: "LEGISLATION",
    globalFarmers: 1.55,
    note: "As Hayek wrote: 'American agriculture would be in a healthier state if the government had never meddled with prices and quantities and methods of production.' The patronization of the American farmer — and its justification as defending 'rugged individualism' — begins here.",
  },
  {
    year: "1944",
    who: "Norman Borlaug",
    description: "Green Revolution — high-yield monocrops scale, chemical dependence institutionalized",
    tag: "TECHNOLOGY",
    globalFarmers: 1.7,
    note: "A genuine leap in yield. But one that anchored global agriculture to proprietary seeds, synthetic nitrogen, and pesticide cycles. The land becomes a factory. The farmer becomes a technician.",
  },
  {
    year: "1950",
    who: "American agribusiness",
    description: "Rapid consolidation — small farms absorbed into industrial operations",
    tag: "CORPORATE",
    globalFarmers: 1.85,
    note: "Between 1950 and 1970, two million American family farms disappeared. The era of agribusiness begins. This pattern would repeat globally.",
  },
  {
    year: "1974",
    who: "Monsanto",
    description: "Glyphosate introduced to the US market — herbicide dependency begins",
    tag: "CHEMICAL",
    globalFarmers: 2.1,
    note: "Roundup hits the market. By the 1990s it would become the world's most-used herbicide, enabling Roundup Ready GMO crops and locking farmers into annual seed and chemical purchase cycles controlled by a single corporation.",
  },
  {
    year: "1985",
    who: "Congress",
    description: "Farm Bill restructured — commodity subsidies formalized, specialty crops sidelined",
    tag: "LEGISLATION",
    globalFarmers: 2.2,
    note: "The farm bill architecture that persists today — rewarding corn, soy, wheat, and cotton at scale while leaving fruit, vegetable, and specialty crop growers without a safety net. The government picks winners.",
  },
  {
    year: "1996",
    who: "Monsanto",
    description: "Roundup Ready soybean — GMO seed patents bind farmers to chemical ecosystems",
    tag: "CORPORATE",
    globalFarmers: 2.35,
    note: "Farmers sign technology agreements surrendering the ancient right to save seed. The crop becomes a licensed product. Supply is managed not by nature or the farmer, but by the IP holder.",
  },
  {
    year: "2008",
    who: "Global recession",
    description: "Commodity price collapse — USDA bailouts begin normalizing ad hoc payments",
    tag: "CORPORATE",
    globalFarmers: 2.5,
    note: "The pattern solidifies: markets fail, government intervenes with emergency payments, structural problems are left unaddressed. Farmers are kept solvent enough not to quit — and dependent enough not to resist.",
  },
  {
    year: "2012",
    who: "Doudna & Charpentier",
    description: "CRISPR — biology becomes editable, agriculture's genetic future opens",
    tag: "TECHNOLOGY",
    globalFarmers: 2.55,
    note: "The same tool that could liberate farmers from proprietary seed ecosystems — or deepen corporate control. Enotrium sees this as the beginning of sovereign agricultural biotechnology. The choice is still ours.",
  },
  {
    year: "2025",
    who: "USDA",
    description: "$12 billion Farmer Bridge Assistance — ad hoc bailout exceeds $30B since January",
    tag: "CORPORATE",
    globalFarmers: 2.6,
    note: "The FBA program allocated up to $11B for row crop producers and $1B for specialty crops, capped at $155,000 per farm. Sector-wide losses estimated at $35–44 billion. Most farmers agree: subsidies cannot fix a broken and manipulated market.",
  },
  {
    year: "2026",
    who: "Enotrium",
    description: "The new economic order — Enotrium establishes the bioeconomy",
    tag: "TECHNOLOGY",
    globalFarmers: 2.6,
    note: "A parity of agricultural crops not to cheap commodity markets, but to America's most important industries — defense, construction, housing, and energy. Enotrium is the new order which will bridge agriculture to real industry. USDA can have the century off.",
    link: "/aip",
    highlight: true,
  },
];

const tagColors: Record<TagType, { pill: string; dot: string }> = {
  TECHNOLOGY: { pill: "text-blue-400 bg-blue-400/10 border border-blue-400/20", dot: "#60a5fa" },
  CORPORATE:  { pill: "text-red-400 bg-red-400/10 border border-red-400/20",   dot: "#f87171" },
  LEGISLATION:{ pill: "text-amber-400 bg-amber-400/10 border border-amber-400/20", dot: "#fbbf24" },
  CHEMICAL:   { pill: "text-pink-400 bg-pink-400/10 border border-pink-400/20", dot: "#f472b6" },
};

// Global farmer data for sparkline (FAO estimates, billions)
const sparklineData = [
  { year: 1793, v: 0.9 },
  { year: 1850, v: 1.0 },
  { year: 1910, v: 1.4 },
  { year: 1933, v: 1.55 },
  { year: 1950, v: 1.85 },
  { year: 1974, v: 2.1 },
  { year: 1985, v: 2.2 },
  { year: 1996, v: 2.35 },
  { year: 2008, v: 2.5 },
  { year: 2020, v: 2.57 },
  { year: 2025, v: 2.6 },
];

const SL_W = 200;
const SL_H = 80;
const MIN_V = 0.7;
const MAX_V = 2.7;

function toXY(i: number, total: number, v: number) {
  return {
    x: (i / (total - 1)) * SL_W,
    y: SL_H - ((v - MIN_V) / (MAX_V - MIN_V)) * SL_H,
  };
}

function Sparkline({ active }: { active: number | null }) {
  const pts = sparklineData.map((d, i) => {
    const { x, y } = toXY(i, sparklineData.length, d.v);
    return `${x},${y}`;
  }).join(" ");

  const dotIdx = active !== null
    ? sparklineData.reduce((b, d, i) =>
        Math.abs(d.v - active) < Math.abs(sparklineData[b].v - active) ? i : b, 0)
    : null;

  const dot = dotIdx !== null ? toXY(dotIdx, sparklineData.length, sparklineData[dotIdx].v) : null;

  return (
    <svg width="100%" viewBox={`-4 -4 ${SL_W + 8} ${SL_H + 12}`} aria-hidden="true">
      {/* grid */}
      <line x1="0" y1="0"     x2={SL_W} y2="0"     stroke="#222" strokeWidth="0.5" />
      <line x1="0" y1={SL_H/2} x2={SL_W} y2={SL_H/2} stroke="#1e1e1e" strokeWidth="0.5" strokeDasharray="3 3" />
      <line x1="0" y1={SL_H}  x2={SL_W} y2={SL_H}  stroke="#222" strokeWidth="0.5" />
      {/* line */}
      <polyline points={pts} fill="none" stroke="#4a5e3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* dot */}
      {dot && (
        <>
          <circle cx={dot.x} cy={dot.y} r="5" fill="#9ab868" />
          <circle cx={dot.x} cy={dot.y} r="9" fill="none" stroke="#9ab868" strokeWidth="1" opacity="0.35" />
        </>
      )}
      {/* axis labels */}
      <text x="0"   y={SL_H + 10} fontSize="7" fill="#333" fontFamily="monospace">1793</text>
      <text x={SL_W} y={SL_H + 10} fontSize="7" fill="#333" fontFamily="monospace" textAnchor="end">2025</text>
    </svg>
  );
}

export default function MesopotamiaPage() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const entryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const frameRef = useRef<number | null>(null);

  // Dark background on mount
  useEffect(() => {
    const prev = document.documentElement.style.backgroundColor;
    document.documentElement.style.backgroundColor = "#0a0a0a";
    return () => { document.documentElement.style.backgroundColor = prev; };
  }, []);

  // Fade-in on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt(e.target.getAttribute("data-index") ?? "0");
            setVisibleItems((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.05 }
    );
    entryRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll tracker — finds entry closest to viewport center
  const onScroll = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const mid = window.scrollY + window.innerHeight * 0.42;
      let best: { dist: number; m: Milestone | null } = { dist: Infinity, m: null };
      entryRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elMid = window.scrollY + rect.top + rect.height / 2;
        const dist = Math.abs(elMid - mid);
        if (dist < best.dist) best = { dist, m: milestones[i] };
      });
      setActiveMilestone(best.m);
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

  const pop = activeMilestone?.globalFarmers ?? null;
  const hasPop = pop !== null && pop > 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── HERO (Cursor-style: centered, generous whitespace) ── */}
      <section className="pt-36 pb-24 px-6 max-w-2xl mx-auto">
        <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-neutral-600 mb-6">
          Enotrium — A new civilization
        </p>

        <h1
          className="text-5xl sm:text-6xl font-light leading-[1.08] text-neutral-100 mb-8"
          style={{ fontFamily: "var(--font-tektur, Georgia, serif)" }}
        >
          Mesopotamia,<br />
          <em className="text-[#9ab868] not-italic">the Cradle of Civilization</em>
        </h1>

        <p className="text-neutral-400 text-lg font-light leading-relaxed mb-5">
          For millennia, the distance between a farmer and his harvest was measured in seasons, soil, and the knowledge passed hand to hand across generations.
        </p>
        <p className="text-neutral-400 text-lg font-light leading-relaxed mb-5">
          For a century, that distance has been filled by the administrative state — its subsidies, its price floors, its corporate beneficiaries. The takeover of agriculture has been a slow encroachment of centralized power determining what we as individuals can do with our operations and our destiny.
        </p>
        <p className="text-neutral-400 text-lg font-light leading-relaxed mb-10">
          With Enotrium, we are building the technology necessary to recreate the cradle of civilization. There is great work to be done. And you&apos;re part of it.
        </p>

        <Link
          href="/aip"
          className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#6a7e4a] border-b border-[#6a7e4a]/40 pb-0.5 hover:text-[#9ab868] hover:border-[#9ab868] transition-colors"
        >
          What could we grow together? →
        </Link>
      </section>

      {/* ── THREE-COLUMN BODY ── */}
      <section className="max-w-[1320px] mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_240px] gap-0">

          {/* ── LEFT SIDEBAR: active event context, sticky the full height ── */}
          <aside className="hidden lg:block">
            {/*
              The trick: position:sticky + top + min-height on the outer div
              keeps the panel visible at all times while scrolling.
              The inner content transitions as activeMilestone changes.
            */}
            <div className="sticky top-24 pr-8 border-r border-neutral-800/50 min-h-[calc(100vh-6rem)] flex flex-col">
              <p className="text-[9px] font-mono tracking-[0.28em] uppercase text-neutral-700 mb-6">
                Active event
              </p>

              {activeMilestone ? (
                <div className="space-y-4 transition-all duration-500">
                  {/* year */}
                  <p className="text-[11px] font-mono text-[#6a7e4a]">
                    {activeMilestone.year}
                  </p>
                  {/* who */}
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {activeMilestone.who}
                  </p>
                  {/* tag dot */}
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: tagColors[activeMilestone.tag].dot }}
                    />
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-700">
                      {activeMilestone.tag}
                    </span>
                  </div>

                  <div className="h-px w-full bg-neutral-800" />

                  <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-700">
                    context
                  </p>
                  <p className="text-[11px] text-neutral-500 leading-[1.7]">
                    {activeMilestone.note}
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-neutral-800 italic">
                  Scroll to explore the timeline
                </p>
              )}
            </div>
          </aside>

          {/* ── CENTER: Cursor-style numbered list ── */}
          <main className="lg:px-16">
            <ol className="list-none m-0 p-0">
              {milestones.map((m, i) => (
                <li
                  key={`${m.year}-${i}`}
                  ref={(el) => { entryRefs.current[i] = el; }}
                  data-index={i}
                  className={`transition-all duration-700 ease-out ${
                    visibleItems.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div
                    className={`
                      flex items-start gap-5 py-6 border-b border-neutral-800/60
                      transition-colors duration-300
                      ${activeMilestone?.year === m.year ? "bg-neutral-900/25" : ""}
                      ${m.highlight ? "pt-10 pb-10" : ""}
                    `}
                  >
                    {/* Index number — like Cursor */}
                    <span className="text-[11px] font-mono text-neutral-800 min-w-[2rem] pt-0.5 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Year + content */}
                    <div className="flex-1">
                      <span className="text-[11px] font-mono text-neutral-600 block mb-1">
                        {m.year}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-600 block mb-2">
                        {m.who}
                      </span>

                      {m.highlight ? (
                        // Final Enotrium entry — italic hero style
                        m.link ? (
                          <Link
                            href={m.link}
                            className="text-xl font-light italic text-[#c8e898] hover:text-[#9ab868] transition-colors leading-snug block"
                            style={{ fontFamily: "var(--font-tektur, Georgia, serif)" }}
                          >
                            {m.description}
                          </Link>
                        ) : (
                          <p className="text-xl font-light italic text-[#c8e898] leading-snug">
                            {m.description}
                          </p>
                        )
                      ) : (
                        <p
                          className={`text-base font-light leading-snug transition-colors duration-300 ${
                            activeMilestone?.year === m.year
                              ? "text-white"
                              : "text-neutral-300"
                          }`}
                        >
                          {m.description}
                        </p>
                      )}

                      <span className={`inline-block mt-3 px-2 py-0.5 text-[8px] font-mono tracking-[0.15em] uppercase ${tagColors[m.tag].pill}`}>
                        {m.tag}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Closing Enotrium quote */}
            <div className="pt-20 pb-12 max-w-md">
              <p className="text-neutral-600 text-sm font-light leading-relaxed italic">
                &ldquo;The agricultural economy must make changes to its internal structure which will change the relative prices of new and different products. Reliance on bailouts prevents our necessary evolution. Of course, this cannot be made into a crisis. The crisis began a century ago.&rdquo;
              </p>
              <p className="text-neutral-800 text-xs font-mono mt-4">— Enotrium</p>
              <Link
                href="/aip"
                className="inline-block mt-8 text-[10px] font-mono tracking-[0.18em] uppercase text-[#6a7e4a] border-b border-[#6a7e4a]/40 pb-0.5 hover:text-[#9ab868] hover:border-[#9ab868] transition-colors"
              >
                Build the new order →
              </Link>
            </div>
          </main>

          {/* ── RIGHT SIDEBAR: farmer count + sparkline, sticky, full height ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 pl-8 border-l border-neutral-800/50 min-h-[calc(100vh-6rem)] flex flex-col">
              <p className="text-[9px] font-mono tracking-[0.28em] uppercase text-neutral-700 mb-6">
                Global farmers
              </p>

              {/* Big animated number */}
              <div className="mb-6">
                <div
                  className="font-light leading-none mb-2 transition-all duration-500"
                  style={{
                    fontFamily: "var(--font-tektur, Georgia, serif)",
                    fontSize: hasPop ? "48px" : "32px",
                    color: hasPop ? "#c8e898" : "#2a2a2a",
                  }}
                >
                  {hasPop ? `${pop!.toFixed(2)}B` : "—"}
                </div>
                <p className="text-[10px] font-mono text-neutral-700">
                  {activeMilestone && hasPop
                    ? `est. ${activeMilestone.year}`
                    : "scroll to reveal"}
                </p>
              </div>

              {/* Sparkline */}
              <div className="mb-6 w-full">
                <Sparkline active={hasPop ? pop : null} />
                <p className="text-[8px] font-mono text-neutral-800 mt-1">
                  global agricultural workers (est.)
                </p>
              </div>

              {/* Legend */}
              <div className="space-y-2 mb-6">
                {(["TECHNOLOGY", "CORPORATE", "LEGISLATION", "CHEMICAL"] as TagType[]).map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: tagColors[t].dot }}
                    />
                    <span className="text-[9px] font-mono tracking-[0.12em] uppercase text-neutral-700">
                      {t}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px w-full bg-neutral-800/60 mb-4" />

              {/* Hayek pullquote — static */}
              <p className="text-[10px] text-neutral-700 leading-[1.7] italic">
                &ldquo;Few people will deny that the main problem has become that of how policy can extricate itself from the situation it has produced.&rdquo;
              </p>
              <p className="text-[9px] font-mono text-neutral-800 mt-2">— F.A. Hayek</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/96 backdrop-blur-sm border-t border-neutral-800 px-5 py-3 z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <p className="text-[8px] font-mono tracking-[0.2em] uppercase text-neutral-700">Global farmers</p>
            <p
              className="text-xl font-light text-[#c8e898] leading-tight"
              style={{ fontFamily: "var(--font-tektur, serif)" }}
            >
              {hasPop ? `${pop!.toFixed(2)}B` : "—"}
            </p>
          </div>
          <div className="text-right min-w-0">
            <p className="text-[9px] font-mono text-[#6a7e4a] truncate">{activeMilestone?.year ?? ""}</p>
            <p className="text-[9px] text-neutral-600 truncate">{activeMilestone?.description ?? "Scroll to explore"}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}