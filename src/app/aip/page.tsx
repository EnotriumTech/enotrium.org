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
  "Procurement Automation",
  "Free Trade Account",
  "Zero Knowledge Contracts",
  "ERP Intelligence",
  "Supply Chain Tracking",
  "Compliance Filing",
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
          <ul className="space-y-1">
            {features.map((f) => (
              <li key={f} className="text-xl sm:text-2xl font-light text-white/85">
                {f}
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
