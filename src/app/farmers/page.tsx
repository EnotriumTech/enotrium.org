import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Farmers",
};

export default function WorkWithUsPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Use shared Navbar with light theme props */}
      <Navbar lightScrollBg invertLogo darkText lightMegaMenu />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black mb-8 font-[family-name:var(--font-inter)]">
          Farmers
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-tight max-w-4xl font-[family-name:var(--font-inter)]">
          Join Us in Transforming Agricultural Economies
        </h1>
      </section>

      {/* Leadership */}
      <section className="px-6 lg:px-16 py-24 max-w-[1400px] mx-auto font-[family-name:var(--font-inter)]">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-12 items-start">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black pt-1">
            Leadership
          </p>
          <div>
            <p className="text-base md:text-lg font-medium leading-relaxed text-black max-w-xl">
              <Link href="/leadership" target="_self" className="underline hover:no-underline">
                Meet our team
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="px-6 lg:px-16 py-24 max-w-[1400px] mx-auto font-[family-name:var(--font-inter)]">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-12 items-start">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black pt-1">
            Research
          </p>
          <div>
            <p className="text-base md:text-lg font-medium leading-relaxed text-black max-w-xl">
              <Link href="https://www.enotriumai.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                Enotrium Research
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Farmers */}
      <section className="px-6 lg:px-16 py-24 max-w-[1400px] mx-auto font-[family-name:var(--font-inter)]">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-12 items-start">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black pt-1">
            Farmers
          </p>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-black">
              Enotrium for the Farm
            </h3>
            <p className="text-base md:text-lg font-medium leading-relaxed text-black max-w-3xl">
              Farmers make hundreds of decisions every season with incomplete information. What&apos;s actually in the soil. Whether a supplier&apos;s grain is clean. Whether a disease outbreak three counties over will reach their fields. Whether the price they&apos;re being offered reflects what the market actually bears.
            </p>
            <p className="text-base md:text-lg font-medium leading-relaxed text-black max-w-3xl">
              Enotrium connects the ground to the decision. Hyperspectral drone scans reveal soil composition, contamination, and crop health at the field level. AIP aggregates that data alongside satellite feeds, commodity flows, and supply chain activity — giving farmers and operators a live picture of their operation and the market around it.
            </p>
            <p className="text-base md:text-lg font-medium leading-relaxed text-black max-w-3xl">
              The result is simple: farmers stop guessing and start knowing.
            </p>
            <div className="space-y-4 mt-8">
              <h4 className="text-lg font-bold text-black">
                What Enotrium delivers:
              </h4>
              <ul className="space-y-2 text-base md:text-lg font-medium text-black max-w-3xl">
                <li>• Live field-level soil and crop health monitoring</li>
                <li>• Contamination detection before it enters the supply chain</li>
                <li>• Supply chain visibility from field origin to delivery</li>
                <li>• Scenario modeling against commodity volatility and geopolitical disruption</li>
                <li>• Automated compliance and food safety documentation</li>
              </ul>
            </div>
            <div className="space-y-4 mt-8">
              <p className="text-base md:text-lg font-medium text-black max-w-3xl">
                <strong>For enterprises:</strong> enhanced food safety assurance, optimized cost of goods, precise financial forecasting, and procurement verified against ground truth.
              </p>
              <p className="text-base md:text-lg font-medium text-black max-w-3xl">
                <strong>For farmers:</strong> the same intelligence tools that commodity traders and food manufacturers have always had — now available at the field level.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
