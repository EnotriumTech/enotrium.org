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
    useSVG: true,
    svgSrc: "/carousel1.svg",
    label: "DEFENSE",
    link: "/arthedain",
    hasTextBox: true
  },
  {
    title: "Edge Deployed Intelligence",
    description: "Deploy on drones, in manufacturing facilities, across real industrial systems. No cloud dependency.",
    label: "COMMERCIAL",
    useImage: true,
    imageSrc: "/carousel2.png",
    link: "/edge-ai",
    hasTextBox: true
  },
  {
    title: "Supply Chain Intelligence",
    description: "Real-time tracking and optimization of agricultural supply chains from farm to market.",
    label: "COMMERCIAL",
    useImage: true,
    imageSrc: "/CarouselSupplyChainMap.png",
    link: "https://www.enotrium.org/aip",
    hasTextBox: true
  },
  {
    title: "Locally Hosted LLMs",
    description: "Run offline with minimal power. Industrial sovereignty;Independence from centralized infrastructure.",
    label: "INDUSTRIAL",
    useSVG: true,
    svgSrc: "/carousel3.svg",
    textPosition: "bottom-left"
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
    link: "https://www.enotrium.org/farmers"
  },
  {
    title: "Autonomous Drone Fleet Coordination",
    description: "Vegard enables real-time coordination of drone fleets for precision agriculture and surveillance.",
    label: "",
    useImage: true,
    imageSrc: "/vegard-carousel.png",
    link: "/research/vegard",
    hasTextBox: true
  },
  {
    title: "",
    description: "",
    label: "",
    useImage: true,
    imageSrc: "/carousel8-restore-american-agriculture.png",
    link: "https://www.enotrium.org/forum/one-farm-one-nation"
  },
  {
    title: "",
    description: "",
    label: "",
    useImage: true,
    imageSrc: "/carousel9-eco.png",
    link: "/aquisition"
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
    }, 45000); // Auto-scroll every 45 seconds

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
          {features[currentIndex].useSVG ? (
            <img 
              src={features[currentIndex].svgSrc} 
              alt="Carousel" 
              className="w-full h-full object-contain"
            />
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
          ) : features[currentIndex].useImage ? (
            <img
              src={features[currentIndex].imageSrc}
              alt="Carousel"
              className={`w-full h-full ${currentIndex === 8 ? "object-contain scale-92" : currentIndex === 7 ? "object-cover scale-93" : "object-cover"}`}
            />
          ) : null}
        </div>
      </div>

      {/* Text content in top corner */}
      <div className={`relative z-20 w-full ${features[currentIndex].textPosition === 'bottom-left' ? 'absolute bottom-24 left-0' : features[currentIndex].textPosition === 'center-left' ? 'absolute top-1/2 -translate-y-1/2 left-0' : ''}`}>
        <ScrollReveal animation="fade-up" duration={1}>
          <div className={`${features[currentIndex].hasTextBox ? 'px-4' : 'px-6 lg:px-16'} ${features[currentIndex].textPosition === 'bottom-left' ? '' : features[currentIndex].textPosition === 'center-left' ? '' : 'py-12'}`}>
            <div className={`${features[currentIndex].hasTextBox ? 'max-w-fit' : 'max-w-xl'} ${features[currentIndex].textPosition === 'center-left' ? 'ml-16' : ''}`}>
              {features[currentIndex].hasTextBox ? (
                <div className="bg-neutral-800 border border-neutral-600 p-3 rounded-lg inline-block">
                  {features[currentIndex].link ? (
                    <div className="group">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2 font-[family-name:var(--font-inter)] font-medium group-hover:text-neutral-400 transition-colors">
                        {features[currentIndex].label}
                      </p>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-extralight text-white mb-2 font-[family-name:var(--font-inter)] text-balance leading-[1.1] group-hover:text-white/90 transition-colors">
                        {features[currentIndex].title}
                      </h2>
                      <p className="text-xs md:text-sm text-white/50 leading-relaxed font-[family-name:var(--font-inter)] font-light mb-2 group-hover:text-white/60 transition-colors">
                        {features[currentIndex].description}
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2 font-[family-name:var(--font-inter)] font-medium">
                        {features[currentIndex].label}
                      </p>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-extralight text-white mb-2 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
                        {features[currentIndex].title}
                    </h2>
                      <p className="text-xs md:text-sm text-white/50 leading-relaxed font-[family-name:var(--font-inter)] font-light mb-2">
                        {features[currentIndex].description}
                      </p>
                    </>
                  )}
                </div>
              ) : features[currentIndex].link ? (
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
