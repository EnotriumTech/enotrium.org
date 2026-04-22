"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HUDReticle } from "@/components/ui/HUDReticle";
import { IndustrialAgricultureScene } from "@/components/ui/IndustrialAgricultureScene";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Edge Compute Infrastructure",
    description: "AI onboard drones in the physical world.",
    useHUD: true,
    label: "DEFENSE",
    link: "/arthedain"
  },
  {
    title: "Edge Deployed Intelligence",
    description: "Deploy on drones, in manufacturing facilities, across real industrial systems. No cloud dependency.",
    label: "COMMERCIAL"
  },
  {
    title: "Locally Hosted LLMs",
    description: "Run offline with minimal power. Industrial sovereignty. Independence from centralized infrastructure.",
    label: "INDUSTRIAL"
  },
  {
    title: "",
    description: "",
    useIndustrial: true,
    label: "INDUSTRIAL",
    link: "/industrial-agriculture"
  },
  {
    title: "",
    description: "",
    useVineyard: true,
    label: "AGRICULTURE",
    link: "/aip"
  }
];

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 30000); // Auto-scroll every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {features[currentIndex].link ? (
        <Link href={features[currentIndex].link} className="absolute inset-0 z-10" />
      ) : null}
      
      {/* Full-screen visual background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          {features[currentIndex].useHUD ? (
            <div className="w-full h-full">
              <HUDReticle />
            </div>
          ) : features[currentIndex].useIndustrial ? (
            <div className="w-full h-full">
              <IndustrialAgricultureScene />
            </div>
          ) : features[currentIndex].useVineyard ? (
            <img 
              src="/vineyard.png" 
              alt="Agriculture" 
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>
      </div>

      {/* Text content in top corner */}
      <div className="relative z-20 w-full">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="px-6 lg:px-16 py-12">
            <div className="max-w-xl">
              {features[currentIndex].link ? (
                <div className="group">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-4 font-[family-name:var(--font-inter)] font-medium group-hover:text-neutral-400 transition-colors">
                    {features[currentIndex].label}
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 font-[family-name:var(--font-inter)] text-balance leading-[1.1] group-hover:text-white/90 transition-colors">
                    {features[currentIndex].title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/50 leading-relaxed font-[family-name:var(--font-inter)] font-light mb-8 group-hover:text-white/60 transition-colors">
                    {features[currentIndex].description}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-4 font-[family-name:var(--font-inter)] font-medium">
                    {features[currentIndex].label}
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
                    {features[currentIndex].title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/50 leading-relaxed font-[family-name:var(--font-inter)] font-light mb-8">
                    {features[currentIndex].description}
                  </p>
                </>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Navigation controls - bottom right */}
      <div className="absolute bottom-8 right-8 z-30 flex flex-col items-end gap-4">
        {/* Carousel indicators */}
        <div className="flex gap-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(index);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/30 w-4 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              goToPrevious();
            }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white/70" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/50 pointer-events-none" />
    </section>
  );
}
