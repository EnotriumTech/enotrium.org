"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
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

    // Smooth noise-like flow field using layered sines
    const flowX = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0025 + t * 0.4) * Math.cos(y * 0.003 + t * 0.25) +
      Math.sin(x * 0.006 - y * 0.004 + t * 0.6) * 0.5;

    const flowY = (x: number, y: number, t: number) =>
      Math.cos(x * 0.003 + t * 0.35) * Math.sin(y * 0.0025 - t * 0.4) +
      Math.cos(x * 0.005 + y * 0.007 + t * 0.5) * 0.5;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Soft trail fade — dark with slight transparency so trails persist briefly
      ctx.fillStyle = "rgba(10,10,10,0.18)";
      ctx.fillRect(0, 0, W, H);

      particles.forEach((p) => {
        // Steer by flow field
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
        // Fade out toward top of canvas so no hard edge
        const topFade = Math.min(1, p.y / (H * 0.35));
        const alpha = lifeAlpha * topFade * 0.65;
        if (alpha < 0.01) return;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      });

      // Connecting lines between nearby particles
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


const features = [
  {
    name: "Procurement Automation",
    desc: "Source verified, field-confirmed commodities without manual due diligence"
  },
  {
    name: "Free Trade Account",
    desc: "Access AIP's baseline intelligence layer at no cost"
  },
  {
    name: "Zero Knowledge Contracts",
    desc: "Execute sourcing agreements with cryptographic verification and no data exposure"
  },
  {
    name: "ERP Intelligence",
    desc: "Push AIP supply chain signals directly into your existing operations stack"
  },
  {
    name: "Supply Chain Tracking",
    desc: "Follow every shipment from field origin to delivery, verified against satellite ground truth"
  },
  {
    name: "Compliance Filing",
    desc: "Auto-generate audit-ready documentation for food safety, customs, and regulatory requirements"
  },
];

export default function AIPPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-[family-name:var(--font-space-grotesk)]">
      <Navbar />

      {/* Hero + stars section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Abstract field fills the hero */}
        <div className="absolute inset-0">
          <AbstractField />
        </div>
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, #0a0a0a 20%, transparent)" }}
        />
        {/* Bottom fade — gradual bleed into next section */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
          style={{ height: 280, background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
        />

        {/* Header text */}
        <div className="relative z-20 pt-28 px-6 lg:px-16 max-w-[1400px] mx-auto w-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-5">
                Enotrium AIP
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-3xl">
                Secure Your Supply Chain with Enotrium's Agri-Intelligence Platform
              </h1>
              <p className="text-lg text-white/70 mt-6 max-w-2xl font-light leading-relaxed">
                AIP maps the world's farmland down to the acre — ownership, crops, yield history, supply chain relationships. Source smarter. Prove quality, while preserving privacy.
              </p>
            </div>
            <Link
              href="/"
              target="_self"
              className="flex items-center gap-2 text-sm tracking-wide text-white hover:text-neutral-400 transition-colors mt-1 shrink-0"
            >
              Access Here <span className="text-lg">↗</span>
            </Link>
          </div>
        </div>

        {/* Feature list */}
        <div className="relative z-20 mt-auto px-6 lg:px-16 max-w-[1400px] mx-auto w-full pb-20 pt-10">
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f.name} className="text-xl sm:text-2xl font-light text-white/85">
                {f.name} — <span className="text-white/60 text-lg">{f.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Middle text section — bg matches fade so transition is seamless */}
      <section className="bg-[#0a0a0a] px-6 lg:px-16 py-28">
        <div className="max-w-[1400px] mx-auto space-y-20">
          <h2 className="text-4xl sm:text-2xl lg:text-5xl font-light leading-tight font-[family-name:var(--font-inter)]">
            Stay ahead of Commodities Futures Markets by understanding the Volume that shapes them.
          </h2>

          <div className="space-y-8">
            <h3 className="text-3xl font-light text-white font-[family-name:var(--font-inter)]">
              Enotrium Agri-Intelligence
            </h3>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              Agriculture represents the all too often dismissed foundational of the global economy and is critical to domestic industrial production. As the world faces increasing geopolitical pressures and rapid change, the optimized use of natural resources has never been more pressing.
            </p>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              Monitoring the world's supply chain at scale is an immense opportunity to shaping how it evolves. The rapid acquisition of real time data collection — including high-resolution satellites, IoT sensors, drones, and ground-based systems — is creating unprecedented opportunities to advance agrarian economies. The purpose of intelligence is to change outcomes.
            </p>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              Enotrium AIP's cuts through the overwhelming complexity of this ever-expanding data landscape by finding pressure points, high leverage trade posts and critical supply chain gaps. By transforming neglected, disparate datasets into coherent analytical frameworks, Enotrium AIP brings simplicity and confidence to the agri-industrial frontier.
            </p>
          </div>

          <div className="space-y-8 mt-12">
            <h3 className="text-3xl font-light text-white font-[family-name:var(--font-inter)]">
              Identifying Agroterrorism
            </h3>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              In an era of heightened global threats, protecting agriculture from deliberate sabotage has become an overlooked priority. Agroterrorism — the intentional introduction of biological or chemical agents to disrupt the food supply — poses a serious risk to crop production, economic stability, and national security.
            </p>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              Toxic fungi, in particular, must be identified and stopped before outbreaks spread. These pathogens can devastate entire regions by contaminating soil, destroying harvests, and producing harmful mycotoxins that threaten plants and human health. Recent incidents, including attempts to smuggle dangerous fungal strains with potential to damage major crops, along with long-standing challenges to Florida's orange industry (such as widespread citrus greening and other invasive threats), highlight the vulnerabilities of domestic agricultural supply chains in a world of biological weapons.
            </p>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              Enotrium AIP plays a vital role in connecting on the ground data to supply chain oversight systems. This layer of intelligence is a defense against crop loss, disease and biochemical warfare. By continuously monitoring vast datasets from satellites, sensors, and ground reports, the platform enables early detection of anomalous disease patterns, rapid identification of suspicious outbreaks, and predictive modeling of potential spread. This precision intelligence-driven approach helps authorities and growers isolate threats preemptively, contain damage, and prevent cascading impacts on food security.
            </p>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              Early detection requires knowing what normal looks like. AIP's continuous planetary baseline — built from hyperspectral drone data, satellite feeds, and ground IoT sensors — means anomalous patterns are flagged against years of field-level history. A fungal outbreak in a county that has never grown that crop. A yield collapse with no weather explanation. A supplier whose fields don't match their shipping manifests. AIP surfaces these signals before they become crises.
            </p>
          </div>

          <div className="space-y-8 mt-12">
            <h3 className="text-3xl font-light text-white font-[family-name:var(--font-inter)]">
              Planetary Farm Intelligence
            </h3>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              The world has 1.4 billion hectares of arable land spread across 570 million farms. Most of it is invisible to the institutions that depend on it. AIP maps all of it — ownership structures, operator history, crop rotation, yield patterns, and financial relationships including bailouts, subsidies, and debt exposure. When a counterparty tells you they source clean grain from the Midwest, AIP tells you if that's true, from which fields, and what those fields looked like last season.
            </p>
          </div>

          <div className="space-y-8 mt-12">
            <h3 className="text-3xl font-light text-white font-[family-name:var(--font-inter)]">
              Counterparty Intelligence
            </h3>
            <p className="text-white/50 text-lg leading-[1.8] font-[family-name:var(--font-inter)] font-light">
              Supply chain fraud doesn't announce itself. AIP cross-references declared sourcing against satellite-verified field activity, flagging discrepancies between what suppliers claim and what the ground shows. For procurement teams at food manufacturers and commodity traders, this is the difference between trusting a contract and verifying it.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
