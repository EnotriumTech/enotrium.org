"use client";

import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function FoodAndAgriculturePage() {
  return (
    <div className="min-h-screen bg-white text-black font-[family-name:var(--font-inter)]">
      <Navbar lightScrollBg invertLogo darkText />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-32 pb-24">

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="/whitelogo.png"
            alt="Enotrium"
            width={48}
            height={48}
            className="h-10 w-auto"
          />
          <span className="text-sm tracking-[0.2em] uppercase text-black font-medium">
            Enotrium
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-[120px] xl:text-[150px] font-bold leading-[0.95] tracking-tight mb-6 font-[family-name:var(--font-inter)]">
          Food and
          <br />
          Agriculture
        </h1>
        <div className="h-px w-full bg-black/20 mb-16" />

        {/* Body Content */}
        <div className="space-y-10 max-w-3xl mb-24">
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium text-black">
            Enotrium&apos;s AI designed Systems are accelerating the agriculture supply chain. 
            From end-to-end control and dynamic inventory management to maximizing production yield, 
            proving sustainable land use and minimizing waste, Enotrium streamlines and scales 
            critical systems across rural economies. Our autonomous coordination platforms 
            deliver end-to-end visibility, so farmers and management have live data on one chain. 
            We help scale operations efficiently across the world&apos;s farmland.

          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
            Enterprises gain enhanced food safety and quality assurance, 
            optimized cost of goods sold, precise financial forecasting, 
            and automated ordering and delivery—empowering farms and food 
            service organizations to capture greater value.

          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
            By integrating disparate data sources and building intelligent, 
            privacy-preserving workflows, the Enotrium Artificial 
            Intelligence Platform augments core processes and transforms 
            food and agriculture businesses for a more resilient supply chain. 

          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
          Enotrium is transforming food and 
          agriculture businesses for the AI era, 
          helping farmers and operators prepare the 
          world for agricultural abundance.  
          Our work in farming ensures that food 
          providers are acting as efficiently as possible, 
          in terms of time, resources, and costs, to nourish individuals around the world.

          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
          With a live view of operations, inventory, logistics, and supply chains, 
          businesses can streamline operations, understand their decision making, 
          and drive sustainable enterprise success. With vast unknowns in the 
          future of the industry, ranging from rising commodity costs, volatility, 
          labor shortages, and increasingly complex geopolitical supply chain risks, 
          Enotrium&apos;s abilities to help farmers leverage their data to run multiple 
          scenarios and allow businesses to develop the agility to combat issues at their
           necessary velocity in a cost-efficient manner.
          </p>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
          Our focus on farmers ensures providers operate with maximum efficiency in 
          time, resources, and costs—nourishing individuals while rebuilding 
          sustainable economic strength.
          </p>

          <p className="text-base sm:text-lg leading-relaxed font-bold text-black">
          With AI powered automation, businesses gain 
          clarity for better decisions and sustainable long-term success. 
          In an industry facing complex macroeconomic risks, 
          Enotrium empowers farmers and their partners to leverage data 
          for scenario modeling, rapid adaptation, and cost-effective 
          agility—bypassing traditional low-margin paths and securing 
          prosperity for the world&apos;s agriculture supply chain. 

          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
