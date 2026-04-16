"use client";

import { useState, useEffect, useRef } from "react";
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

      // Soft trail fade — white background with slight transparency so trails persist briefly
      ctx.fillStyle = "rgba(255,255,255,0.18)";
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
        const alpha = lifeAlpha * topFade * 0.8;
        if (alpha < 0.01) return;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${alpha.toFixed(3)})`;
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
            const alpha = (1 - dist / 7000) * 0.12 * topFade;
            ctx.strokeStyle = `rgba(0,0,0,${alpha.toFixed(3)})`;
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


const tabs = [
  {
    id: "upgrading",
    label: "Upgrading",
    image: "/upgrading-map.png",
    description:
      "Transform verified gaps into real growth. Build capabilities faster with personalized data featuring internal content, AI-powered insight.",
  },
  {
    id: "natural-resources",
    label: "Natural Resources",
    image: "/natural-resources.png",
    description:
      "Understand your operations in relation to ecological offsets. AI-driven analysis of land potential, regenerative practices, and resource mapping.",
  },
  {
    id: "command-center",
    label: "Command Center",
    image: "/command-center.png",
    description:
      "Unified observability and interoperability: Track every link, spot risks, and coordinate autonomously. Make decisions as soon as you see the pattern.",
  },
  {
    id: "vertical-integration",
    label: "Vertical Integration",
    image: "/vertical-integration.png",
    description:
      "Connecting farms → processors → manufacturers → end buyers for full supply chain control. Own your stack: From field to finished good with encrypted provenance and no intermediaries.",
  },
];

export default function PlatformPage() {
  const [activeTab, setActiveTab] = useState("upgrading");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="bg-white text-black min-h-screen font-[family-name:var(--font-inter)]">
      <Navbar invertLogo lightScrollBg darkText />

      {/* Hero */}
      <section className="pt-28 md:pt-32 px-6 lg:px-16 pb-16 max-w-[1400px] mx-auto">
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-black mb-6">
          Platform
        </p>
        <h1
          className="font-[family-name:var(--font-tektur)] tracking-tight text-black max-w-2xl"
          style={{ fontSize: "clamp(40px, 8vw, 110px)", lineHeight: 1.05, fontWeight: 400 }}
        >
          Measuring Agriculture&apos;s Potential in the AI Era
        </h1>
        <p className="mt-8 text-sm sm:text-base text-black/60 leading-relaxed max-w-sm">
          The only platform that verifies every farm and manufacturer across the world&apos;s supply chain.
        </p>
      </section>

      {/* Intelligence Feature Section */}
      <section className="px-6 lg:px-16 pb-24 max-w-[1400px] mx-auto">
        <h2
          className="font-[family-name:var(--font-tektur)] tracking-tight text-black mb-10"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.1, fontWeight: 400 }}
        >
          Intelligence that turns<br />instinct into action.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-0 border border-black/10">
          {/* Tab list */}
          <div className="border-b md:border-b-0 md:border-r border-black/10 py-6 px-6 flex flex-row md:flex-col gap-0 overflow-x-auto md:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left text-sm py-2 pr-6 md:pr-0 md:py-3 border-b border-black/10 last:border-b-0 whitespace-nowrap md:whitespace-normal transition-colors ${
                  activeTab === tab.id
                    ? "text-black font-medium"
                    : "text-black/40 hover:text-black/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="border-b md:border-b-0 md:border-r border-black/10 p-6 md:p-8 flex flex-col justify-start">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-black/40 mb-4">
              {active.label}
            </p>
            <p className="text-sm leading-relaxed text-black/70 max-w-xs">
              {active.description}
            </p>
          </div>

          {/* Screenshot */}
          <div className="relative min-h-[220px] md:min-h-0 overflow-hidden bg-black">
            <img
              key={active.id}
              src={active.image}
              alt={active.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
<section className="relative px-6 lg:px-16 py-32 max-w-[1400px] mx-auto bg-white text-black overflow-hidden">
  <div className="absolute inset-0">
    <AbstractField />
  </div>
  <div className="relative z-10">
    <h2
      className="font-[family-name:var(--font-tektur)] tracking-tight text-black"
      style={{ fontSize: "clamp(48px, 10vw, 140px)", lineHeight: 1.05, fontWeight: 400 }}
    >
      Request a<br />Demo
    </h2>
    <p className="mt-6 text-sm sm:text-base text-black/60 leading-relaxed max-w-sm">
      Reach out to us at{" "}
      <a
        href="mailto:enotriumtech@atomicmail.io"
        className="text-black underline hover:text-neutral-600 transition-colors"
      >
        enotriumtech@atomicmail.io
      </a>{" "}
      for a demo.
    </p>
  </div>
</section>

      <Footer />
    </div>
  );
}