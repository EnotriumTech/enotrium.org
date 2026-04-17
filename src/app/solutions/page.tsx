"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  ArrowDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Microscope,
  Globe,
  ShieldCheck,
  Leaf,
  Users,
  Network,
  ChevronDown,
} from "lucide-react";

// ============================================
// ABSTRACT FIELD PARTICLE ANIMATION (FROM AIP)
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
// SECTION 1: HERO SECTION
// ============================================
function HeroSection() {
  const scrollToPartnerships = () => {
    const element = document.getElementById("partnerships");
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
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Solutions
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight leading-[0.95] max-w-5xl text-white mb-10 font-[family-name:var(--font-inter)] text-balance text-glow">
            Our Solutions
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.15} duration={1}>
          <div className="max-w-2xl space-y-5 text-white/60 text-lg md:text-xl leading-[1.7] font-[family-name:var(--font-inter)] font-light">
            <p className="text-balance">
              We believe in progress – not as an end in itself, but to merge the old with the new, in an ever greater march towards prosperity.
              Our technologies put real industry first. Technologies change civilization, and civilization is perserved with technology.
            </p>
            <p className="text-balance">
              Enotrium&apos;s Technologies shift power, strengthen trust, and enable individuals
              to operate with sovereignty and security. Every system is designed to be open,
              verifiable, and built to lead the world to a greater evolution.
            </p>
            <p className="text-white/90 font-normal tracking-wide">
              This we call, <span className="text-white font-medium">A New Mesopotamia</span>.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
          <div className="flex flex-col sm:flex-row gap-4 mt-14">
            <Link
              href="https://www.enotriumai.org/research/"
              target="_blank"
              rel="noopener noreferrer"
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 hover:bg-neutral-200 font-[family-name:var(--font-inter)] focus-ring"
            >
              Explore Enotrium Labs
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <button
              onClick={scrollToPartnerships}
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
            >
              Explore Partnerships
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={scrollToPartnerships}
          className="text-white/30 hover:text-white/60 transition-all duration-500 focus-ring rounded-full p-2"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

// ============================================
// SECTION 2: INTRODUCTORY TEASER SECTION
// ============================================
function TeaserSection() {
  return (
    <section id="teaser" className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden grain-overlay">
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal animation="fade-up" duration={1}>
            <div className="space-y-10">
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-[family-name:var(--font-inter)] font-medium">
                The Future Is Here
              </p>

              <div className="space-y-8 text-white/70 text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-[family-name:var(--font-inter)] font-extralight">
                <p className="text-balance">
                  AI will have a vast impact on civilization, changing systems,
                  reordering transport, solving the unsolvable.
                </p>
                <p className="text-white font-light">
                  At Enotrium, we build systems to prepare civilization for stress-tested futures.
                </p>
              </div>

              <div className="w-32 h-px bg-gradient-to-r from-white/30 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
            <div className="relative aspect-[4/3] bg-[#050a0f] border border-cyan-500/30 overflow-hidden hover-lift group"
              style={{
                boxShadow: "inset 0 0 60px rgba(6, 182, 212, 0.1), 0 0 40px rgba(6, 182, 212, 0.15)"
              }}
            >
              {/* Animated self-drawing grid */}
              <div className="absolute inset-0 grid-lines-animated" />
              
              {/* Radial glow center - arc reactor style */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(8, 145, 178, 0.1) 40%, transparent 70%)",
                  filter: "blur(20px)"
                }}
              />
              
              {/* Tech scan lines */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.03) 2px, rgba(6, 182, 212, 0.03) 4px)"
                }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center relative z-10">
                  <Globe className="w-20 h-20 text-cyan-400/60 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" strokeWidth={0.5} />
                  <p className="text-sm text-cyan-200/70 font-[family-name:var(--font-inter)] tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                    Autonomous Systems × Regenerative Agriculture
                  </p>
                </div>
              </div>
              
              {/* Corner tech brackets */}
              <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-cyan-500/40" />
              <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-cyan-500/40" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-cyan-500/40" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-cyan-500/40" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 3: PARTNERSHIPS SECTION
// ============================================
function PartnershipsSection() {
  const partnerTypes = [
    { icon: Users, label: "Farmers", desc: "On the ground" },
    { icon: Network, label: "Enterprises", desc: "Scale & reach" },
    { icon: Globe, label: "Alliances", desc: "Global network" },
    { icon: Microscope, label: "Research", desc: "Innovation" },
  ];

  return (
    <section id="partnerships" className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden grain-overlay">
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Alliance
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Partnerships that serve people
            </h2>
            <p className="text-white/50 text-xl leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              A single organization cannot build a sustainable agricultural economy.
              Enotrium partners with farmers, enterprises, alliances, and research
              institutions to advance food standards, supply chain operability and
              responsible innovation. Together, we will create future-defining systems
              that cradle a new civilization.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-20">
            {partnerTypes.map((partner, index) => (
              <div
                key={partner.label}
                className="group relative p-8 md:p-10 border border-white/[0.06] hover:border-white/[0.15] bg-transparent hover:bg-white/[0.02] transition-all duration-700 ease-dramatic hover-lift"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <partner.icon className="w-10 h-10 text-white/30 mb-6 group-hover:text-white/50 transition-all duration-500" strokeWidth={1} />
                <p className="text-xl font-light text-white mb-2 font-[family-name:var(--font-inter)] tracking-wide">
                  {partner.label}
                </p>
                <p className="text-sm text-white/30 font-[family-name:var(--font-inter)]">
                  {partner.desc}
                </p>
                
                <div className="absolute bottom-0 left-0 w-0 h-px bg-white/20 group-hover:w-full transition-all duration-700 ease-dramatic" />
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
          <div className="relative p-12 md:p-16 border border-white/[0.06] bg-white/[0.01]">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white/60 font-extralight leading-[1.5] font-[family-name:var(--font-inter)] text-center text-balance">
              &ldquo;Together, we create the infrastructure for a civilization
              that values sovereignty, transparency, and abundance.&rdquo;
            </blockquote>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// SECTION 4: GOVERNANCE SECTION
// ============================================
function GovernanceSection() {
  const principles = [
    { title: "Transparency", desc: "Open systems, verifiable by all" },
    { title: "Decentralization", desc: "Power distributed, not concentrated" },
    { title: "Inclusive Access", desc: "Technology for every operator" },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden grain-overlay">
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="absolute top-0 left-0 w-40 h-40 border-l border-t border-white/[0.08]" />
      <div className="absolute bottom-0 right-0 w-40 h-40 border-r border-b border-white/[0.08]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-up" duration={1}>
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
                Foundation
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-8 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
                Governance
              </h2>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
              <div className="space-y-10">
                <p className="text-white/50 text-xl leading-[1.8] font-[family-name:var(--font-inter)] font-light text-balance">
                  As a pioneer in agri-industrial innovation, we act with foresight
                  and determination. Our technological development approach is rooted
                  in transparency, decentralization, and inclusive access, empowering
                  our global economy to help shape the future of agriculture and technology.
                  By aligning progress with real operational needs, we build economies
                  that serve people first.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/[0.08]">
                  {principles.map((principle, index) => (
                    <div key={principle.title} className="group space-y-3" style={{ transitionDelay: `${index * 100}ms` }}>
                      <p className="text-base font-light text-white font-[family-name:var(--font-inter)] tracking-wide">
                        {principle.title}
                      </p>
                      <p className="text-sm text-white/30 font-[family-name:var(--font-inter)] leading-relaxed">
                        {principle.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION DIVIDER: FUTURIST GRID SPACER
// ============================================
function SectionDivider() {
  // Generate random positions for glowing dots (avoiding top/bottom fade zones)
  const dots = [
    { left: 8, top: 35, delay: 0, size: 3 },
    { left: 15, top: 55, delay: 1.5, size: 2 },
    { left: 23, top: 42, delay: 0.8, size: 4 },
    { left: 31, top: 65, delay: 2.2, size: 2.5 },
    { left: 42, top: 30, delay: 1.2, size: 3 },
    { left: 48, top: 70, delay: 0.5, size: 2 },
    { left: 56, top: 45, delay: 1.8, size: 3.5 },
    { left: 64, top: 60, delay: 0.3, size: 2 },
    { left: 72, top: 38, delay: 2.5, size: 3 },
    { left: 79, top: 68, delay: 1.0, size: 2.5 },
    { left: 87, top: 50, delay: 1.6, size: 3 },
    { left: 93, top: 32, delay: 0.7, size: 2 },
  ];

  return (
    <section className="relative h-[100px] md:h-[180px] w-full overflow-hidden bg-[#0a0a0a]">
      {/* Top fade gradient */}
      <div 
        className="absolute inset-x-0 top-0 h-16 md:h-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent)" }}
      />
      
      {/* Bottom fade gradient */}
      <div 
        className="absolute inset-x-0 bottom-0 h-16 md:h-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
      />

      {/* Perspective grid background */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(239, 68, 68, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Horizontal accent lines */}
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-400/30 to-transparent mt-8 md:mt-12" />
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent mt-8 md:mt-12" />
      </div>

      {/* Glowing dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: "rgba(239, 68, 68, 1)",
            boxShadow: "0 0 16px 4px rgba(239, 68, 68, 0.8), 0 0 32px 8px rgba(239, 68, 68, 0.5)",
            animation: `pulse 4s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}

      {/* Subtle ambient glow orbs */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-32 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(239, 68, 68, 0.45), transparent)" }}
      />
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-24 h-24 rounded-full opacity-45 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(248, 113, 113, 0.4), transparent)" }}
      />
    </section>
  );
}

// ============================================
// SECTION 5: OUR STORY SECTION
// ============================================
function OurStorySection() {
  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden grain-overlay">
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <ScrollReveal animation="fade-up" duration={1}>
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
                Heritage
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-8xl font-extralight text-white font-[family-name:var(--font-inter)] text-balance leading-[1.05]">
                Our Story
              </h2>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-16 h-px bg-gradient-to-r from-white/30 to-transparent" />
                <p className="text-sm text-white/30 font-[family-name:var(--font-inter)] tracking-widest uppercase">Est. 2025</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
            <div className="space-y-8 text-white/50 text-lg md:text-xl leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              <p className="text-2xl md:text-3xl text-white/80 font-extralight leading-[1.4] text-balance">
                From the beginning, we set out to be more than an agriculture
                technology company. We chose to design with purpose, building
                decisively and with humanity&apos;s ends in mind.
              </p>

              <p className="text-balance">
                Founded in 2025, Enotrium is a world-leading agriculture-industrial
                infrastructure and engineering firm dedicated to building a sustainable
                agricultural ecosystem. We are committed to restoring degraded farmland,
                advancing operators through the next era of technological innovation,
                focusing on sustainability, security and real-world adoption through
                cutting-edge engineering.
              </p>

              <p className="text-balance">
                From Enotrium, the first Soil testing drone scan rooted in peer-reviewed
                science, has enabled a new form of sight to lead every day operations,
                a programmable interface for sourcing transparency and ecological renewal.
                Our work reflects one guiding compass: technology should serve people,
                farmers, and doers, not the other way around.
              </p>

              <div className="mt-10 p-8 border border-red-500/30 bg-[#0f0505] relative overflow-hidden group"
                style={{ boxShadow: "inset 0 0 40px rgba(239, 68, 68, 0.08), 0 0 30px rgba(239, 68, 68, 0.1)" }}
              >
                {/* Red glow orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-30 blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 70%)" }}
                />
                
                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l border-t border-red-500/40" />
                <div className="absolute top-2 right-2 w-6 h-6 border-r border-t border-red-500/40" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l border-b border-red-500/40" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r border-b border-red-500/40" />
                
                <p className="text-red-400/60 text-xs font-medium tracking-[0.25em] uppercase mb-4 font-[family-name:var(--font-inter)] relative z-10">
                  Our Compass
                </p>
                <p className="text-red-200/80 text-xl font-light font-[family-name:var(--font-inter)] leading-relaxed relative z-10"
                  style={{ textShadow: "0 0 20px rgba(239, 68, 68, 0.3)" }}
                >
                  &ldquo;Technology should serve people, farmers, and doers,
                  not the other way around.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 6: WHY ENOTRIUM CAROUSEL SECTION
// ============================================
const benefits = [
  {
    icon: Microscope,
    title: "Open Sourcing Agriculture Science",
    description: "Every technology we deploy is benchmarked against scientific research and validated through extensive field testing.",
  },
  {
    icon: Globe,
    title: "World Changing Delivery",
    description: "We don't just promise innovation—we deliver systems that transform how civilization produces and distributes food.",
  },
  {
    icon: ShieldCheck,
    title: "Global Food Security",
    description: "Our infrastructure is designed to ensure resilient, sovereign food systems that can withstand global disruptions.",
  },
  {
    icon: Leaf,
    title: "Sustainable Ecosystems",
    description: "Regeneration is at our core. Every solution we build restores soil health and enhances ecological balance.",
  },
];

function WhyEnotriumSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, benefits.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-scroll carousel continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden grain-overlay">
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
                Decentralizion
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
                Why ENOTRIUM
              </h2>
            </div>

            <p className="text-white/30 text-base font-[family-name:var(--font-inter)] font-light">
              Navigate to explore
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-dramatic gap-5"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleCount + 2)}%)` }}
              >
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] group" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="relative h-full p-10 border border-white/[0.06] hover:border-white/[0.12] bg-transparent hover:bg-white/[0.02] transition-all duration-700 ease-dramatic hover-lift">
                      <div className="w-14 h-14 rounded-sm flex items-center justify-center mb-8 bg-white/[0.03] group-hover:bg-white/[0.06] transition-all duration-500">
                        <benefit.icon className="w-7 h-7 text-white/30 group-hover:text-white/50 transition-all duration-500" strokeWidth={1} />
                      </div>

                      <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)] tracking-wide">
                        {benefit.title}
                      </h3>
                      <p className="text-white/40 text-base leading-[1.7] font-[family-name:var(--font-inter)] font-light">
                        {benefit.description}
                      </p>

                      <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-white/30 to-transparent group-hover:w-full transition-all duration-700 ease-dramatic" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-12">
              <div className="flex gap-3">
                {benefits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(Math.min(index, maxIndex))}
                    className={`h-[2px] rounded-full transition-all duration-500 ease-dramatic ${
                      index >= currentIndex && index < currentIndex + visibleCount
                        ? "bg-white w-10"
                        : "bg-white/20 w-4 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={prevSlide}
                  className="w-14 h-14 border border-white/[0.1] hover:border-white/[0.25] hover:bg-white/[0.03] flex items-center justify-center text-white/30 hover:text-white transition-all duration-500 ease-dramatic focus-ring"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-14 h-14 border border-white/[0.1] hover:border-white/[0.25] hover:bg-white/[0.03] flex items-center justify-center text-white/30 hover:text-white transition-all duration-500 ease-dramatic focus-ring"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// SECTION 7: NEWSLETTER SECTION
// ============================================
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden grain-overlay">
      <div className="section-divider absolute top-0 left-0 right-0" />
      
      {/* Subtle radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal animation="fade-up" duration={1}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Updates
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-8 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Stay in the know
            </h2>
            <p className="text-white/40 text-xl mb-12 font-[family-name:var(--font-inter)] font-light leading-relaxed">
              Subscribe to our Substack for the latest on agricultural innovation,
              infrastructure development, and the future of food systems.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-8 py-5 bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-500 font-[family-name:var(--font-inter)] font-light tracking-wide"
              />
              <button
                type="submit"
                className="px-10 py-5 bg-white text-[#0a0a0a] text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 hover:bg-neutral-200 font-[family-name:var(--font-inter)] magnetic-btn focus-ring"
              >
                {submitted ? "Subscribed!" : "Subscribe"}
              </button>
            </form>

            <p className="mt-8 text-sm text-white/25 font-[family-name:var(--font-inter)] font-light">
              Or visit our{" "}
              <Link
                href="https://substack.com/@enotrium"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 underline underline-offset-4 transition-colors duration-300"
              >
                Substack directly
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white font-[family-name:var(--font-inter)]">
      <Navbar />

      <HeroSection />
      <TeaserSection />
      <PartnershipsSection />
      <GovernanceSection />
      <SectionDivider />
      <OurStorySection />
      <WhyEnotriumSection />
      <NewsletterSection />

      <Footer />
    </main>
  );
}
