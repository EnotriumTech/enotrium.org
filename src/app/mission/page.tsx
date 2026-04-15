import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mission",
};

const features = [
  {
    title: "Our Technology",
    tagline: "Solutions for the systematic problems of today.",
    description:
      "Strategic Operations demands real time analytics that can analyze reality and leverage towards future supply chains. Enotrium's core product is an autonomous sensemaking agent that gives farmers and industrialists a path to accessing the future of agrarian economy.",
  },
  {
    title: "Our Team",
    tagline: "Engineers who make the hidden intuitive.",
    description:
      "Our team brings together the world's smartest young engineers with farmers and manufacturers who have first-hand knowledge of the craft. Enotrium engineers are experts in AI, robotics, advanced sensors, security, manufacturing, and industrial design. Farmers and Indigenous Americans are more than 50% of our team and use their agriculture experience to ensure our products meet the needs of the people.",
  },
  {
    title: "Our Business",
    tagline: "Cutting edge solutions that put farmers first.",
    description:
      "Enotrium is a technology company. Unlike traditional agriculture businesses who focus exclusively on existing systems, we create new supply chains and markets that begin with the farm. We bring farms to strategic operators in construction, defense and industrial production.",
  },
];

export default function MissionPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Use shared Navbar with light theme props */}
      <Navbar invertLogo lightScrollBg darkText />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black mb-8 font-[family-name:var(--font-inter)]">
          Mission
        </p>
        <div className="flex items-start justify-between gap-8">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-tight max-w-4xl font-[family-name:var(--font-inter)]">
            Transforming Agricultural Economies Through Cutting Edge Technology
          </h1>
          <span className="text-2xl mt-2 shrink-0">↓</span>
        </div>
      </section>

      {/* Hero Image */}
      <div className="relative w-full overflow-hidden" style={{ height: "480px" }}>
        <Image src="/field.png" alt="Agricultural landscape" fill className="object-cover" />
      </div>

      {/* Who We Are */}
      <section className="px-6 lg:px-16 py-24 max-w-[1400px] mx-auto font-[family-name:var(--font-inter)]">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-24 items-start">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-black pt-1">
            Who We Are
          </p>
          <p className="text-base md:text-lg font-medium leading-relaxed text-black max-w-xl">
            While the world&apos;s farmers are crossing a major inflection point, Enotrium delivers a
            new economic model based on cutting edge systems technology to farmers and operators
            in months, not decades.
          </p>
        </div>
      </section>

      {/* Second Image */}
      <div className="px-6 lg:px-16 mx-auto">
        <div className="relative w-full" style={{ height: "600px" }}>
          <Image src="/mission-vineyard.png" alt="Vineyard rows" fill className="object-contain" />
        </div>
      </div>

      {/* Large Display Text */}
      <section className="w-full overflow-hidden py-8 px-4">
        <h2
          className="font-[family-name:var(--font-tektur)] tracking-tight uppercase text-center"
          style={{ fontSize: "clamp(40px, 12vw, 180px)", lineHeight: "234px", fontWeight: 400 }}
        >
          Autonomy<br />For<br />Every Farmer
        </h2>
      </section>

      {/* Feature Rows */}
      <section className="px-6 lg:px-16 max-w-[1400px] mx-auto pb-24 font-[family-name:var(--font-inter)]">
        {features.map((row) => (
          <div
            key={row.title}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 py-10 border-t border-gray-200"
          >
            <p className="font-bold text-black">{row.title}</p>
            <p className="text-sm font-medium text-black leading-relaxed">{row.tagline}</p>
            <p className="text-sm font-medium text-black leading-relaxed">{row.description}</p>
          </div>
        ))}
        <div className="border-t border-gray-200" />
      </section>

      {/* CTA Cards */}
      <section className="px-6 lg:px-16 max-w-[1400px] mx-auto pb-24 font-[family-name:var(--font-inter)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Card 1 — The Agrarian Republic */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">The Agrarian Republic</p>
              <Link
                href="/invective"
                target="_self"
                className="text-xs font-semibold text-black hover:text-black transition-colors flex items-center gap-1"
              >
                Read More <span>↗</span>
              </Link>
            </div>
            <Link
              href="/invective"
              target="_self"
              className="block rounded-sm overflow-hidden relative bg-black"
              style={{ height: "300px" }}
            >
              <Image
                src="/replace_agrarian_republic_img.png"
                alt="The Agrarian Republic"
                fill
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* Card 2 — Enotrium AIP */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Control Your Supply Chain</p>
              <Link
                href="/aip"
                target="_self"
                className="text-xs font-semibold text-black hover:text-black transition-colors flex items-center gap-1"
              >
                Enotrium AIP <span>↗</span>
              </Link>
            </div>
            <Link
              href="/aip"
              target="_self"
              className="block rounded-sm overflow-hidden flex items-center justify-center p-8"
              style={{
                height: "300px",
                background: "linear-gradient(135deg, #111 0%, #1a1a2e 60%, #16213e 100%)",
              }}
            >
              <div className="text-center">
                <p className="text-white text-xl font-light tracking-wide mb-2">Enotrium AIP</p>
                <p className="text-gray-500 text-xs tracking-widest uppercase">Platform Dashboard</p>
              </div>
            </Link>
          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}
