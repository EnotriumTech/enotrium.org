"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  ArrowDown,
  ChevronDown,
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

    const flowX = (x: number, y: number, t: number) => {
      const targetX = x / canvas.width;
      const convergenceForce = (1 - targetX) * 0.8;
      return Math.cos(x * 0.003 + t * 0.3) * Math.sin(y * 0.0025 + t * 0.35) * 0.3 +
             Math.cos(x * 0.005 + y * 0.003 - t * 0.5) * 0.3 +
             convergenceForce * 0.5;
    };

    const flowY = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0025 - t * 0.4) * Math.cos(y * 0.003 + t * 0.3) * 0.3 +
      Math.sin(x * 0.004 - y * 0.006 + t * 0.55) * 0.3;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.fillStyle = "rgba(255,255,255,0.18)";
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
        ctx.fillStyle = `rgba(100, 150, 200,${alpha.toFixed(3)})`;
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
            ctx.strokeStyle = `rgba(100, 150, 200,${alpha.toFixed(3)})`;
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
  const scrollToContent = () => {
    const element = document.getElementById("content");
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
        style={{ background: "linear-gradient(to bottom, #ffffff 20%, transparent)" }}
      />

      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
        style={{ height: 280, background: "linear-gradient(to bottom, transparent, #ffffff)" }}
      />

      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 lg:px-16 max-w-[1400px] mx-auto w-full py-32">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Enotrium
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight leading-[0.95] max-w-5xl text-black mb-10 font-[family-name:var(--font-inter)] text-balance">
            Data Acquisition
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.15} duration={1}>
          <div className="max-w-2xl space-y-5 text-gray-600 text-lg md:text-xl leading-[1.7] font-[family-name:var(--font-inter)] font-light">
            <p className="text-balance">
              Accelerate Global Ecological Intelligence
            </p>
            <p className="text-balance">
              A new paradigm for field‑to‑decision data pipelines. Ingest sensor streams, satellite feeds, and ground‑truth records across 20+ markets — harmonized and operational in months, not years.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
          <div className="flex flex-col sm:flex-row gap-4 mt-14">
            <button
              onClick={scrollToContent}
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-black text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
            >
              Learn More
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={scrollToContent}
          className="text-gray-400 hover:text-gray-600 transition-all duration-500 focus-ring rounded-full p-2"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

// ============================================
// METRICS SECTION
// ============================================
function MetricsSection() {
  const metrics = [
    { value: "99.8%", label: "Data validation accuracy within two weeks of ingestion." },
    { value: "60s", label: "Time to generate a market‑level acquisition plan." },
    { value: "60%+", label: "Reduction in data payload after rationalization." },
    { value: "20+", label: "Markets harmonized under a single global template." },
  ];

  return (
    <section id="content" className="relative py-32 md:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Metrics
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-black font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              ECOLOGICAL DATA ACQUISITION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="p-8 border border-gray-200 bg-gray-50">
                <div className="text-5xl md:text-6xl font-light text-gray-400 mb-3 font-[family-name:var(--font-inter)]">
                  {metric.value}
                </div>
                <p className="text-gray-600 text-base font-[family-name:var(--font-inter)] font-light leading-relaxed">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// PROBLEM SECTION
// ============================================
function ProblemSection() {
  const problems = [
    {
      title: "SILOED STANDARDS",
      subtitle: "No common language",
      description: "Each market maintains its own crop codes, soil classification schemas, irrigation protocols, and compliance requirements. Traditional integrators segment these across different teams with limited cross‑visibility — errors take weeks to trace.",
    },
    {
      title: "TEMPORAL BOTTLENECK",
      subtitle: "Sequential deployments kill scale",
      description: "The traditional playbook demands rigid, linear country‑by‑country rollouts. For a mandate spanning 20+ markets in 24 months, that structure is architecturally impossible. Markets wait in a queue while early deployments stall.",
    },
    {
      title: "KNOWLEDGE DEBT",
      subtitle: "Institutional memory loss",
      description: "Employee turnover erases embedded understanding of legacy data structures, custom transformation rules, and regional edge cases. Requirements‑gathering workshops attempt to reconstruct this context — and take months.",
    },
    {
      title: "VALIDATION LOOPS",
      subtitle: "Errors compound across silos",
      description: "When downstream validation fails, the source is buried across disconnected systems. Teams spend weeks tracing anomalies through manual handoffs, burning budget while the pipeline remains blocked.",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-gray-50 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              The problem
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-black mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              The challenge with fragmented field data
            </h2>
            <p className="text-gray-600 text-xl leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              Decades of decentralized agricultural operations leave each country with its own data standards, sensor protocols, and business rules — and no global template. Institutional knowledge walks out the door with every turnover.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="p-8 border border-gray-200 bg-white">
                <h3 className="text-lg font-medium text-black mb-2 font-[family-name:var(--font-inter)] tracking-wide">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                  {problem.subtitle}
                </p>
                <p className="text-gray-600 text-base leading-[1.7] font-[family-name:var(--font-inter)] font-light">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// ARCHITECTURE SECTION
// ============================================
function ArchitectureSection() {
  const steps = [
    {
      number: "01",
      title: "Field sensor ingestion",
      description: "UAV telemetry, soil probes, weather stations, and satellite indices ingested in real time with automatic schema normalization.",
    },
    {
      number: "02",
      title: "Rule inference engine",
      description: "Business rules and regional compliance standards inferred directly from historical transaction data — no workshops required.",
    },
    {
      number: "03",
      title: "Global harmonization",
      description: "Market‑level schemas mapped to a single canonical template. Exceptions flagged and routed to human SMEs for resolution.",
    },
    {
      number: "04",
      title: "Continuous validation",
      description: "Cross‑referencing of thousands of data records against global catalogs, with automated audit trails and escalation workflows.",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Architecture
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-black mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Contextual intelligence across the entire pipeline
            </h2>
            <p className="text-gray-600 text-xl leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              Enotrium AIP maintains unified awareness of field structures, compliance frameworks, and market‑specific rules — coordinating specialized AI at every acquisition stage while eliminating validation loops.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="p-8 border border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-400 mb-4 font-[family-name:var(--font-inter)] font-medium">
                  {step.number}
                </p>
                <h3 className="text-xl font-light text-black mb-4 font-[family-name:var(--font-inter)] tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-[1.7] font-[family-name:var(--font-inter)] font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// PROCESS SECTION
// ============================================
function ProcessSection() {
  const stages = [
    {
      number: "01",
      title: "Ingest & Infer",
      description: "AIP ingests raw ecological data, legacy documentation, sensor schemas, and compliance frameworks simultaneously. Business rules are inferred directly from historical records — bypassing requirements‑gathering entirely.",
      highlight: "HOURS, NOT MONTHS",
    },
    {
      number: "02",
      title: "Map & Harmonize",
      description: "AI‑powered processes map legacy values to global standards, construct transformation logic, and build a single canonical template across all markets. Parallel workstreams replace sequential country deployments.",
      highlight: "PARALLEL EXECUTION",
    },
    {
      number: "03",
      title: "Validate & Escalate",
      description: "A validation engine cross‑references records against the global catalog. An SME workflow app surfaces only exceptions — prioritizing task assignment, approvals, and escalations. Humans focus on what matters.",
      highlight: "",
    },
  ];

  const pipelineStages = [
    { name: "Raw acquisition", description: "Sensor feeds, satellite indices, ground‑truth records", status: "Live" },
    { name: "Schema normalization", description: "Auto‑mapped to canonical data model", status: "Processing" },
    { name: "Rule inference", description: "Business logic extracted from transaction history", status: "Active" },
    { name: "Global harmonization", description: "Multi‑market merge under one template", status: "Running" },
    { name: "SME validation", description: "Exceptions surfaced, approved, audited", status: "Ready" },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-gray-50 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Process
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-black mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              How it works
            </h2>
            <p className="text-gray-600 text-xl leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              Three stages. Seconds to hours, not months. The AI FDE agent handles ingestion and inference — humans own exceptions and high‑risk decisions.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="space-y-8 mb-20">
            {stages.map((stage, index) => (
              <div key={index} className="p-8 border border-gray-200 bg-white">
                <div className="flex items-start gap-6">
                  <p className="text-sm text-gray-400 font-[family-name:var(--font-inter)] font-medium">
                    {stage.number}
                  </p>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-black mb-4 font-[family-name:var(--font-inter)] tracking-wide">
                      {stage.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-[1.7] font-[family-name:var(--font-inter)] font-light mb-4">
                      {stage.description}
                    </p>
                    {stage.highlight && (
                      <p className="text-sm text-gray-400 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                        {stage.highlight}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
          <div className="max-w-4xl">
            <h3 className="text-2xl font-light text-black mb-8 font-[family-name:var(--font-inter)] tracking-wide">
              Pipeline stages
            </h3>
            <div className="space-y-4">
              {pipelineStages.map((stage, index) => (
                <div key={index} className="flex items-center gap-6 p-6 border border-gray-200 bg-white">
                  <p className="text-sm text-gray-400 font-[family-name:var(--font-inter)] font-medium">
                    STAGE {index + 1}
                  </p>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-black mb-1 font-[family-name:var(--font-inter)]">
                      {stage.name}
                    </h4>
                    <p className="text-sm text-gray-500 font-[family-name:var(--font-inter)]">
                      {stage.description}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400 font-[family-name:var(--font-inter)]">
                    {stage.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// CASE STUDY SECTION
// ============================================
function CaseStudySection() {
  const metrics = [
    { value: "24h", label: "Working session to first results" },
    { value: "60%+", label: "Data volume reduction" },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              The 24‑month mandate
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-black mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              A global food manufacturer faced an executive mandate: migrate 20+ markets to a harmonized ecological data platform within 24 months. The traditional playbook made it structurally impossible.
            </h2>
            <p className="text-gray-500 text-lg font-[family-name:var(--font-inter)] font-light uppercase tracking-wider">
              Food manufacturing & distribution
            </p>
            <p className="text-gray-600 text-base font-[family-name:var(--font-inter)] font-light">
              Global market harmonization: Ecological data platform across 20+ countries
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {metrics.map((metric, index) => (
              <div key={index} className="p-8 border border-gray-200 bg-gray-50">
                <div className="text-5xl md:text-6xl font-light text-gray-400 mb-3 font-[family-name:var(--font-inter)]">
                  {metric.value}
                </div>
                <p className="text-gray-600 text-base font-[family-name:var(--font-inter)] font-light">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
          <div className="max-w-4xl space-y-8">
            <div>
              <h3 className="text-2xl font-medium text-black mb-4 font-[family-name:var(--font-inter)]">
                A hard executive mandate
              </h3>
              <p className="text-gray-600 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
                A global food manufacturer faced a hard executive mandate: migrate 20+ markets across their global operations to a unified ecological data platform within 24 months. The traditional migration playbook — a rigid, months‑long linear process per market — made that timeline structurally impossible.
              </p>
              <p className="text-gray-600 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light mt-4">
                Decades of decentralized operations had left each country with its own data standards, sensor protocols, and business rules. There was no global template, and institutional knowledge had eroded with every wave of employee turnover.
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
                Enotrium convened with their tech and business team for an intensive 24‑hour working session. Within hours, the AI FDE agent ingested raw field data, automatically generated harmonized‑ready datasets, and inferred existing business rules directly from historical transaction records — bypassing weeks of requirements‑gathering workshops.
              </p>
              <p className="text-gray-600 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light mt-4">
                A validation engine cross‑referenced thousands of records against a global catalog, creating an SME workflow application that prioritized task assignment, approvals, escalations, and audit trails. Human attention shifted entirely to exceptions.
              </p>
              <p className="text-gray-600 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light mt-4">
                The result reframed the model entirely: data is no longer the bottleneck. Parallel workstreams across markets replaced sequential country deployments. A single globally harmonized template replaced bespoke per‑country builds. Projected time to completion, total budget, and personnel requirements were all drastically reduced.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              <div>
                <p className="text-4xl font-light text-gray-400 mb-2 font-[family-name:var(--font-inter)]">24h</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] font-light">
                  From kickoff to first validated dataset — bypassing weeks of workshops.
                </p>
              </div>
              <div>
                <p className="text-4xl font-light text-gray-400 mb-2 font-[family-name:var(--font-inter)]">60%+</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] font-light">
                  Reduction in total data payload after rationalization.
                </p>
              </div>
              <div>
                <p className="text-4xl font-light text-gray-400 mb-2 font-[family-name:var(--font-inter)]">1</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] font-light">
                  Global harmonized template replacing bespoke per‑country builds.
                </p>
              </div>
              <div>
                <p className="text-4xl font-light text-gray-400 mb-2 font-[family-name:var(--font-inter)]">∥</p>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] font-light">
                  Parallel workstreams across all 20+ markets simultaneously.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// OPERATIONAL IMPACT SECTION
// ============================================
function OperationalImpactSection() {
  const impacts = [
    {
      icon: "◈",
      title: "Hybrid field operations",
      description: "Build applications that leverage legacy sensor networks and new edge deployments simultaneously during transition — no operational gap, no dark period.",
    },
    {
      icon: "⟳",
      title: "Continuous business continuity",
      description: "Maintain real‑time agricultural operations across old and new data environments throughout the harmonization process. Markets don't pause while others migrate.",
    },
    {
      icon: "◎",
      title: "Immediate value capture",
      description: "Capture insights and drive decisions before legacy decommissioning completes. The harmonized pipeline produces actionable intelligence from day one.",
    },
    {
      icon: "◉",
      title: "Operational intelligence",
      description: "Real‑time ecological metrics, AI‑driven agronomic recommendations, and full impact modeling before execution — at market scale, across every region simultaneously.",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-gray-50 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Operational impact
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-black mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Beyond data acquisition
            </h2>
            <p className="text-gray-600 text-xl leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              The impact extends across the full agricultural intelligence stack — from field to decision to decommission.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="p-8 border border-gray-200 bg-white">
                <p className="text-3xl text-gray-400 mb-4">{impact.icon}</p>
                <h3 className="text-xl font-light text-black mb-4 font-[family-name:var(--font-inter)] tracking-wide">
                  {impact.title}
                </h3>
                <p className="text-gray-600 text-base leading-[1.7] font-[family-name:var(--font-inter)] font-light">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// NEWSLETTER SECTION
// ============================================
function NewsletterSection() {
  return (
    <section className="relative py-32 md:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal animation="fade-up" duration={1}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-black mb-8 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Get in Touch
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
            <a
              href="mailto:enotriumtech@atomicmail.io"
              target="_self"
              className="inline-block px-10 py-5 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-black text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] magnetic-btn focus-ring"
            >
              Contact Us
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function AcquisitionPage() {
  return (
    <main className="relative min-h-screen bg-white text-black font-[family-name:var(--font-inter)]">
      <Navbar darkText logoSrc="/whitelogo.png" />

      <HeroSection />
      <MetricsSection />
      <ProblemSection />
      <ArchitectureSection />
      <ProcessSection />
      <CaseStudySection />
      <OperationalImpactSection />
      <NewsletterSection />

      <Footer />
    </main>
  );
}
