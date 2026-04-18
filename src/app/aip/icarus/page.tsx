"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  ArrowDown,
  ExternalLink,
  Eye,
  Zap,
  Cpu,
  Scan,
  Activity,
  Globe,
  Brain,
} from "lucide-react";

// ============================================
// ABSTRACT FIELD PARTICLE ANIMATION
// ============================================
function AbstractField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    };

    let particles: Particle[] = [];
    const COUNT = 140;

    const spawn = (W: number, H: number): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      life: Math.random() * 160,
      maxLife: 140 + Math.random() * 120,
      size: 0.6 + Math.random() * 1.2,
    });

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const W = canvas.width;
      const H = canvas.height;
      particles = Array.from({ length: COUNT }, () => spawn(W, H));
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const flowX = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0025 + t * 0.4) * Math.cos(y * 0.003 + t * 0.25) +
      Math.sin(x * 0.006 - y * 0.004 + t * 0.6) * 0.5;

    const flowY = (x: number, y: number, t: number) =>
      Math.cos(x * 0.003 + t * 0.35) * Math.sin(y * 0.0025 - t * 0.4) +
      Math.cos(x * 0.005 + y * 0.007 + t * 0.5) * 0.5;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.fillStyle = "rgba(10,10,10,0.18)";
      ctx.fillRect(0, 0, W, H);

      particles.forEach((p) => {
        p.vx = p.vx * 0.94 + flowX(p.x, p.y, t) * 0.06;
        p.vy = p.vy * 0.94 + flowY(p.x, p.y, t) * 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10 || p.life > p.maxLife) {
          Object.assign(p, spawn(W, H));
          return;
        }

        const lifeAlpha = Math.min(1, p.life / 30) * Math.min(1, (p.maxLife - p.life) / 30);
        const topFade = Math.min(1, p.y / (H * 0.35));
        const alpha = lifeAlpha * topFade * 0.65;
        if (alpha < 0.01) return;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < 7000) {
            const topFade = Math.min(1, Math.min(particles[i].y, particles[j].y) / (H * 0.35));
            const alpha = (1 - dist / 7000) * 0.08 * topFade;
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      t += 0.004;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const scrollToWhat = () => {
    const element = document.getElementById("what-is-icarus");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <AbstractField />
      </div>

      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0a0a0a 20%, transparent)" }}
      />

      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
        style={{ height: 280, background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
      />

      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 lg:px-16 max-w-[1400px] mx-auto w-full py-32">
        <ScrollReveal animation="fade-up" duration={1}>
          <h1 className="text-5xl sm:text-6xl lg:text-9xl font-extralight leading-[0.95] max-w-5xl text-white mb-8 font-[family-name:var(--font-inter)] text-balance">
            Icarus
          </h1>

          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-2xl mb-12 font-[family-name:var(--font-inter)]">
            Hyperdimensional Hyperspectral Spiking Neural Net
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="max-w-2xl space-y-6 text-white/60 text-lg md:text-xl leading-[1.8] font-[family-name:var(--font-inter)] font-light">
            <p className="text-balance">
              Icarus is a living, hyperdimensional spiking neural network that <span className="text-white font-medium">perceives the Earth</span> through drone-mounted hyperspectral eyes.
            </p>
            <p className="text-balance">
              It collects and interprets ecological data, soil contaminants, nutrient markers, microbial signatures, and spectral biomarkers in real time — turning invisible soil intelligence into actionable planetary insight.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.4} duration={1}>
          <div className="flex flex-col sm:flex-row gap-4 mt-16">
            <button
              onClick={scrollToWhat}
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 hover:bg-neutral-200 font-[family-name:var(--font-inter)] focus-ring"
            >
              Understand the Earth
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>

            <Link
              href="#live-perception"
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
            >
              Watch the Scan Live
              <Eye className="w-4 h-4 transition-transform duration-300" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={scrollToWhat}
          className="text-white/30 hover:text-white/60 transition-all duration-500 focus-ring rounded-full p-2"
          aria-label="Scroll to content"
        >
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

// ============================================
// WHAT IS ICARUS SECTION
// ============================================
function WhatIsIcarusSection() {
  return (
    <section id="what-is-icarus" className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            The Neural Earth
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-16 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            What is Icarus
          </h2>

          <div className="space-y-8 text-white/50 text-xl md:text-2xl leading-[1.9] font-[family-name:var(--font-inter)] font-light">
            <p className="text-balance">
              Icarus is the <span className="text-white font-medium">nervous system of the Earth</span> — a hyperdimensional spiking neural network that breathes with the soil.
            </p>
            <p className="text-balance">
              Through drone-mounted hyperspectral sensors, it <span className="text-white font-medium">perceives</span> what human eyes cannot: the invisible chemical dance of nutrients, contaminants, and microbial life beneath our feet.
            </p>
            <p className="text-balance">
              It <span className="text-white font-medium">decodes</span> spectral biomarkers into actionable intelligence. It <span className="text-white font-medium">orchestrates</span> regeneration. It reveals the hidden language of the land.
            </p>
          </div>

          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// CAPABILITIES SECTION
// ============================================
function CapabilitiesSection() {
  const capabilities = [
    {
      icon: Scan,
      title: "Real-time Hyperspectral Soil Mapping",
      description: "Perceives soil composition at the molecular level through drone-mounted spectral sensors.",
    },
    {
      icon: Activity,
      title: "Contaminant Detection",
      description: "Identifies heavy metals, pesticides, and chemical pollutants with sub-ppm accuracy.",
    },
    {
      icon: Zap,
      title: "Nutrient & Microbial Profiling",
      description: "Maps micronutrient distribution and sees microbial signatures to decode soil composition.",
    },
    {
      icon: Brain,
      title: "Predictive Ecological Modeling",
      description: "Computes regeneration potential through microbial signature analysis and soil vitality metricsusing hyperdimensional neural processing.",
    },
    {
      icon: Globe,
      title: "Planetary Scale Perception",
      description: "Aggregates hyperspectral intelligence across regions to reveal global soil patterns.",
    },
  ];

  return (
    <section className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Capabilities
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-20 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            What Icarus Perceives
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} animation="fade-up" delay={index * 0.1} duration={1}>
              <div className="group py-12 border-t border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-white/[0.03] group-hover:bg-white/[0.06] transition-all duration-500">
                      <capability.icon className="w-6 h-6 text-white/30 group-hover:text-white/50 transition-all duration-500" strokeWidth={1} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-light text-white mb-3 font-[family-name:var(--font-inter)] tracking-wide">
                      {capability.title}
                    </h3>
                    <p className="text-white/40 text-base leading-relaxed font-[family-name:var(--font-inter)] font-light">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}

// ============================================
// THE NEURAL EARTH SECTION
// ============================================
function TechnologySection() {
  const tech = [
    {
      title: "Spiking Neural Net",
      description: "Bio-inspired neural architecture that processes information like the human brain — event-driven, energy-efficient, and capable of temporal pattern recognition.",
    },
    {
      title: "Hyperdimensional Processing",
      description: "Computes in high-dimensional vector spaces, enabling Icarus to perceive complex relationships in spectral data that traditional neural networks cannot detect.",
    },
    {
      title: "Drone-Integrated Hyperspectral Sensors",
      description: "Custom sensor arrays capture light across hundreds of narrow wavelength bands, revealing chemical fingerprints invisible to conventional imaging.",
    },
    {
      title: "Live Data Fusion",
      description: "Real-time integration of multispectral data streams with environmental sensors, creating a unified perception of soil health and ecological dynamics.",
    },
  ];

  return (
    <section className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Technology
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-20 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            The Architecture
          </h2>
        </ScrollReveal>

        <div className="space-y-16">
          {tech.map((item, index) => (
            <ScrollReveal key={item.title} animation="fade-up" delay={index * 0.1} duration={1}>
              <div className="group">
                <h3 className="text-2xl md:text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)] tracking-wide">
                  <span className="text-white/40 mr-4">0{index + 1}</span>
                  {item.title}
                </h3>
                <p className="text-white/50 text-lg md:text-xl leading-[1.8] font-[family-name:var(--font-inter)] font-light pl-12 md:pl-16">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}

// ============================================
// WHY IT MATTERS SECTION
// ============================================
function WhyItMattersSection() {
  return (
    <section className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Vision
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-16 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            A New Sight for the Soil
          </h2>

          <div className="space-y-8 text-white/50 text-xl md:text-2xl leading-[1.9] font-[family-name:var(--font-inter)] font-light">
            <p className="text-balance">
              For millennia, humanity has farmed blind. We treated soil as dirt — a medium to be worked, not a living system to be understood.
            </p>
            <p className="text-balance">
              Icarus gives us <span className="text-white font-medium">hyperdimensional sight</span> into the underground world, revealing the complex chemistry that sustains all life.
            </p>
            <p className="text-balance">
              Precise, hyperspectral perception for phytoremediation and agricultural security.
            </p>
            <p className="text-white/80 font-medium">
              This is spectral consciousness. This is the neural Earth.
            </p>
          </div>

          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// LIVE PERCEPTION SECTION
// ============================================
function LivePerceptionSection() {
  return (
    <section id="live-perception" className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Live Perception
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-12 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            See Through the Soil
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="relative aspect-video bg-[#050a0f] border border-cyan-500/20 overflow-hidden"
            style={{
              boxShadow: "inset 0 0 100px rgba(6, 182, 212, 0.08), 0 0 60px rgba(6, 182, 212, 0.12)"
            }}
          >
            {/* Radial glow center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.05) 40%, transparent 70%)",
                filter: "blur(40px)"
              }}
            />

            {/* Scan lines */}
            <div className="absolute inset-0 opacity-20"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.03) 2px, rgba(6, 182, 212, 0.03) 4px)"
              }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center relative z-10">
                <Eye className="w-16 h-16 text-cyan-400/50 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]" strokeWidth={0.5} />
                <p className="text-cyan-200/60 text-sm font-[family-name:var(--font-inter)] tracking-[0.3em] uppercase">
                  Hyperspectral Perception Active
                </p>
                <p className="text-cyan-400/40 text-xs mt-2 font-[family-name:var(--font-inter)] tracking-widest">
                  [ DEMONSTRATION MODE ]
                </p>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-500/30" />
            <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-500/30" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-500/30" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-500/30" />
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.4} duration={1}>
          <p className="text-white/40 text-base leading-relaxed max-w-2xl mt-8 font-[family-name:var(--font-inter)] font-light text-center">
            Live hyperspectral visualization coming soon. Icarus continuously processes spectral data streams to reveal soil composition in real time.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// JOIN THE NEURAL FRONTIER SECTION
// ============================================
function TheFrontierSection() {
  return (
    <section className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            The Frontier
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-12 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            Join the Neural Frontier
          </h2>

          <div className="space-y-8 text-white/50 text-xl md:text-2xl leading-[1.9] font-[family-name:var(--font-inter)] font-light mb-16">
            <p className="text-balance">
              Icarus is not just technology — it's a movement to give the Earth a nervous system.
            </p>
            <p className="text-balance">
              We partner with farmers, research institutions, and regenerative agriculture pioneers to deploy hyperspectral perception across the planet.
            </p>
            <p className="text-balance">
              Together, we're building <span className="text-white font-medium">spectral consciousness</span> — a new way of seeing and caring for the soil that sustains us all.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:contact@enotrium.org"
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 hover:bg-neutral-200 font-[family-name:var(--font-inter)] focus-ring"
            >
              Request Early Access
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="https://www.enotriumai.org/research/"
              target="_blank"
              rel="noopener noreferrer"
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
            >
              Research Collaboration
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function IcarusPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar invertLogo darkText />

      <HeroSection />
      <WhatIsIcarusSection />
      <CapabilitiesSection />
      <TheNeuralEarthSection />
      <LivePerceptionSection />
      <TheFrontierSection />

      <Footer />
    </div>
  );
}
