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
      Math.cos(x * 0.003 + t * 0.3) * Math.sin(y * 0.0025 + t * 0.35) +
      Math.cos(x * 0.005 + y * 0.003 - t * 0.5) * 0.6;

    const flowY = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0025 - t * 0.4) * Math.cos(y * 0.003 + t * 0.3) +
      Math.sin(x * 0.004 - y * 0.006 + t * 0.55) * 0.5;

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
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
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
              Icarus is the <span className="text-white font-medium">nervous system of the Earth</span> — a hyperdimensional spiking neural network that understands the earth.
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
function SeeThroughTheSoil() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [liveStatus, setLiveStatus] = useState<string>("LIVE");
  const [spectralLock, setSpectralLock] = useState<string>("");
  const [neuralNet, setNeuralNet] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    // Particle types
    type DataParticle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
      type: 'background' | 'stream' | 'detection';
    };

    type DetectionPulse = {
      x: number;
      y: number;
      label: string;
      life: number;
      maxLife: number;
      color: string;
    };

    let particles: DataParticle[] = [];
    let detectionPulses: DetectionPulse[] = [];

    const detectionLabels = [
      "Nitrogen (N)", "Phosphorus (P)", "Potassium (K)", "Moisture", "pH Level", "Organic Matter"
    ];

    const colors = [
      "rgba(6, 182, 212, 0.8)",   // cyan
      "rgba(236, 72, 153, 0.8)",  // magenta
      "rgba(20, 184, 166, 0.8)",  // teal
      "rgba(220, 38, 38, 0.8)",    // deep red
    ];

    const spawnParticle = (W: number, H: number, type: 'background' | 'stream' | 'detection'): DataParticle => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      if (type === 'background') {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: 0.5 + Math.random() * 1.5,
          color: color.replace('0.8', '0.3'),
          life: Math.random() * 200,
          maxLife: 150 + Math.random() * 100,
          type: 'background',
        };
      } else if (type === 'stream') {
        return {
          x: Math.random() * W,
          y: H + 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.5 - Math.random() * 1,
          size: 1 + Math.random() * 2,
          color: color,
          life: 0,
          maxLife: 200 + Math.random() * 150,
          type: 'stream',
        };
      } else {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 2 + Math.random() * 3,
          color: color,
          life: 0,
          maxLife: 100 + Math.random() * 50,
          type: 'detection',
        };
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const W = canvas.width;
      const H = canvas.height;
      particles = [];
      detectionPulses = [];
      
      // Spawn background particles
      for (let i = 0; i < 300; i++) {
        particles.push(spawnParticle(W, H, 'background'));
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Text overlay cycle
    const textCycle = () => {
      const texts = ["LIVE", "SPECTRAL SCAN", "SOIL ANALYSIS", "HSI PROCESSING"];
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      
      if (Math.random() < 0.01) {
        setLiveStatus(randomText);
        setTimeout(() => setLiveStatus("LIVE"), 2000);
      }
      
      if (Math.random() < 0.005) {
        setSpectralLock("SPECTRAL LOCK");
        setTimeout(() => setSpectralLock(""), 1500);
      }
      
      if (Math.random() < 0.003) {
        setNeuralNet("SOIL ANALYSIS ACTIVE");
        setTimeout(() => setNeuralNet(""), 2000);
      }
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Clear with dark background
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
      ctx.fillRect(0, 0, W, H);

      // Draw soil layers (gradient bands)
      const gradient = ctx.createLinearGradient(0, 0, 0, H);
      gradient.addColorStop(0, "rgba(10, 10, 10, 0.8)");
      gradient.addColorStop(0.3, "rgba(20, 30, 40, 0.6)");
      gradient.addColorStop(0.6, "rgba(15, 25, 35, 0.6)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0.8)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // Draw horizontal scanning lines
      const scanY = (t * 0.5) % H;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(W, scanY);
      ctx.stroke();

      // Draw vertical scanning lines
      const scanX = (t * 0.3) % W;
      ctx.strokeStyle = "rgba(236, 72, 153, 0.08)";
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, H);
      ctx.stroke();

      // Update and draw particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.type === 'stream') {
          if (p.y < -10 || p.life > p.maxLife) {
            particles[index] = spawnParticle(W, H, 'stream');
          }
        } else if (p.type === 'detection') {
          if (p.life > p.maxLife) {
            particles[index] = spawnParticle(W, H, 'detection');
          }
        } else {
          if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10 || p.life > p.maxLife) {
            particles[index] = spawnParticle(W, H, 'background');
          }
        }

        const lifeAlpha = Math.min(1, p.life / 30) * Math.min(1, (p.maxLife - p.life) / 30);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${lifeAlpha.toFixed(2)})`);
        ctx.fill();

        // Glow effect for detection particles
        if (p.type === 'detection') {
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Spawn stream particles
      if (particles.filter(p => p.type === 'stream').length < 50 && Math.random() < 0.3) {
        particles.push(spawnParticle(W, H, 'stream'));
      }

      // Spawn detection pulses
      if (Math.random() < 0.005) {
        detectionPulses.push({
          x: Math.random() * W,
          y: Math.random() * H,
          label: detectionLabels[Math.floor(Math.random() * detectionLabels.length)],
          life: 0,
          maxLife: 120,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Draw detection pulses
      detectionPulses = detectionPulses.filter(pulse => {
        pulse.life++;
        const progress = pulse.life / pulse.maxLife;
        const alpha = Math.sin(progress * Math.PI);

        // Draw pulse ring
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 20 + progress * 30, 0, Math.PI * 2);
        ctx.strokeStyle = pulse.color.replace(/[\d.]+\)$/, `${(alpha * 0.5).toFixed(2)})`);
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        if (progress < 0.5) {
          ctx.font = "10px Inter";
          ctx.fillStyle = pulse.color.replace(/[\d.]+\)$/, `${alpha.toFixed(2)})`);
          ctx.textAlign = "center";
          ctx.fillText(pulse.label, pulse.x, pulse.y - 40);
        }

        return pulse.life < pulse.maxLife;
      });

      // Draw central soil cross-section (3D-like cube)
      const centerX = W / 2;
      const centerY = H / 2;
      const cubeSize = Math.min(W, H) * 0.25;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(t * 0.001);

      // Draw cube faces with gradient
      const faces = [
        { x: 0, y: -cubeSize/2, w: cubeSize, h: cubeSize/2, color: "rgba(6, 182, 212, 0.15)" },
        { x: -cubeSize/2, y: 0, w: cubeSize/2, h: cubeSize/2, color: "rgba(236, 72, 153, 0.15)" },
        { x: 0, y: 0, w: cubeSize, h: cubeSize/2, color: "rgba(20, 184, 166, 0.15)" },
      ];

      faces.forEach(face => {
        ctx.fillStyle = face.color;
        ctx.fillRect(face.x, face.y, face.w, face.h);
        ctx.strokeStyle = face.color.replace('0.15', '0.3');
        ctx.lineWidth = 1;
        ctx.strokeRect(face.x, face.y, face.w, face.h);
      });

      ctx.restore();

      // Draw spectral wavelength bands with HSI data visualization
      for (let i = 0; i < 8; i++) {
        const bandY = (H / 8) * i + (Math.sin(t * 0.02 + i) * 5);
        const gradient = ctx.createLinearGradient(0, bandY, W, bandY);
        gradient.addColorStop(0, "rgba(6, 182, 212, 0)");
        gradient.addColorStop(0.5, colors[i % colors.length].replace('0.8', '0.15'));
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, bandY - 3, W, 6);
        
        // Add wavelength labels
        const wavelengths = ["400nm", "500nm", "600nm", "700nm", "800nm", "900nm", "1000nm", "1100nm"];
        ctx.font = "9px Inter";
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.textAlign = "left";
        ctx.fillText(wavelengths[i], 10, bandY + 3);
      }

      // Draw soil composition metrics panel
      const metricsX = W - 180;
      const metricsY = 20;
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(metricsX, metricsY, 170, 120);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(metricsX, metricsY, 170, 120);
      
      ctx.font = "10px Inter";
      ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
      ctx.textAlign = "left";
      ctx.fillText("SOIL COMPOSITION", metricsX + 10, metricsY + 20);
      
      const metrics = [
        { label: "Nitrogen (N)", value: (45 + Math.sin(t * 0.01) * 5).toFixed(1) + "%" },
        { label: "Phosphorus (P)", value: (32 + Math.cos(t * 0.015) * 3).toFixed(1) + "%" },
        { label: "Potassium (K)", value: (28 + Math.sin(t * 0.012) * 4).toFixed(1) + "%" },
        { label: "Moisture", value: (65 + Math.cos(t * 0.008) * 8).toFixed(1) + "%" },
        { label: "pH Level", value: (6.5 + Math.sin(t * 0.005) * 0.5).toFixed(1) },
        { label: "Organic Matter", value: (3.2 + Math.cos(t * 0.009) * 0.3).toFixed(1) + "%" },
      ];
      
      metrics.forEach((metric, i) => {
        const y = metricsY + 40 + i * 15;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(metric.label, metricsX + 10, y);
        ctx.fillStyle = colors[i % colors.length];
        ctx.textAlign = "right";
        ctx.fillText(metric.value, metricsX + 160, y);
        ctx.textAlign = "left";
      });

      // Draw spectral curve visualization (simulated HSI spectral signature)
      const curveX = 20;
      const curveY = H - 100;
      const curveW = 200;
      const curveH = 80;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(curveX, curveY, curveW, curveH);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
      ctx.strokeRect(curveX, curveY, curveW, curveH);
      
      ctx.font = "9px Inter";
      ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
      ctx.textAlign = "left";
      ctx.fillText("SPECTRAL SIGNATURE", curveX + 10, curveY + 15);
      
      // Draw spectral curve
      ctx.beginPath();
      ctx.moveTo(curveX, curveY + curveH - 10);
      
      for (let i = 0; i <= curveW; i += 2) {
        const normalizedX = i / curveW;
        const spectralValue = 0.3 + 
          0.4 * Math.sin(normalizedX * Math.PI * 2 + t * 0.02) +
          0.2 * Math.cos(normalizedX * Math.PI * 4 - t * 0.015) +
          0.1 * Math.sin(normalizedX * Math.PI * 6 + t * 0.01);
        
        const y = curveY + curveH - 10 - (spectralValue * (curveH - 30));
        ctx.lineTo(curveX + i, y);
      }
      
      const spectralGradient = ctx.createLinearGradient(curveX, curveY, curveX + curveW, curveY);
      spectralGradient.addColorStop(0, "rgba(6, 182, 212, 0.8)");
      spectralGradient.addColorStop(0.5, "rgba(236, 72, 153, 0.8)");
      spectralGradient.addColorStop(1, "rgba(20, 184, 166, 0.8)");
      
      ctx.strokeStyle = spectralGradient;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw wavelength axis labels
      ctx.font = "8px Inter";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.textAlign = "center";
      ctx.fillText("400nm", curveX, curveY + curveH + 8);
      ctx.fillText("700nm", curveX + curveW / 2, curveY + curveH + 8);
      ctx.fillText("1100nm", curveX + curveW, curveY + curveH + 8);

      textCycle();
      t += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="live-perception" className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="flex items-start justify-between mb-6">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-[family-name:var(--font-inter)] font-medium">
              Live Perception
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-red-400 font-[family-name:var(--font-inter)] font-medium">
                {liveStatus}
              </span>
            </div>
          </div>

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
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "100%", display: "block" }}
            />

            {/* Overlay text elements */}
            {spectralLock && (
              <div className="absolute top-4 right-4 text-cyan-400/60 text-xs font-[family-name:var(--font-inter)] tracking-[0.2em] uppercase animate-pulse">
                {spectralLock}
              </div>
            )}

            {neuralNet && (
              <div className="absolute bottom-4 left-4 text-teal-400/60 text-xs font-[family-name:var(--font-inter)] tracking-[0.2em] uppercase animate-pulse">
                {neuralNet}
              </div>
            )}

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center relative z-10">
                <p className="text-cyan-200/60 text-sm font-[family-name:var(--font-inter)] tracking-[0.3em] uppercase mb-2">
                  Hyperspectral Perception Active
                </p>
                <p className="text-cyan-400/40 text-xs font-[family-name:var(--font-inter)] tracking-widest">
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

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-12 font-[family-name:var(--font-inter)] leading-[1.1] whitespace-nowrap">
            Join the New Frontier
          </h2>

          <div className="space-y-8 text-white/50 text-xl md:text-2xl leading-[1.9] font-[family-name:var(--font-inter)] font-light mb-16">
            <p className="text-balance">
              Icarus is autonomous oversight for the earth, a nervous system for agriculture.
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
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
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
      <Navbar darkText />

      <HeroSection />
      <WhatIsIcarusSection />
      <CapabilitiesSection />
      <TechnologySection />
      <WhyItMattersSection />
      <SeeThroughTheSoil />
      <TheFrontierSection />

      <Footer />
    </div>
  );
}
