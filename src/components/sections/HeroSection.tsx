"use client";

import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col bg-background overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: "55%", height: "60%", top: "5%", left: "5%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "blob-drift-1 14s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: "45%", height: "55%", top: "15%", right: "5%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "blob-drift-2 18s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: "40%", height: "45%", bottom: "10%", left: "25%",
          background: "radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blob-drift-3 22s ease-in-out infinite",
        }} />
      </div>

      {/* Title block */}
      <div className="flex flex-col items-center justify-center pt-32 sm:pt-44 pb-10 px-4 text-center shrink-0 w-full max-w-[1400px] mx-auto">

        {/* 1. Enotrium */}
        <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-[family-name:var(--font-iceland)] text-white leading-[1.05] tracking-wide">
          Enotrium
        </h1>

        {/* 2. A New Mesopotamia */}
        <h2
          className="text-[1rem] sm:text-[1.3rem] md:text-[1.6rem] lg:text-[2rem] xl:text-[2.4rem] font-[family-name:var(--font-inter)] text-white/80 tracking-[0.15em] uppercase mt-2"
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.15)" }}
        >
          A New Mesopotamia
        </h2>

        {/* 3. Logo block */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <span className="text-neutral-400 text-sm font-[family-name:var(--font-inter)] font-semibold text-right leading-tight">
            Defend the<br />Earth
          </span>
          <Image
            src="/logo.jpg"
            alt="Enotrium"
            width={110}
            height={110}
            className="opacity-95 shrink-0"
          />
          <div className="text-left font-[family-name:var(--font-space-grotesk)] leading-tight">
            <div className="text-white/70 text-sm font-bold tracking-[0.2em]">EST. 2025</div>
            <div className="text-white/50 text-sm">Edge Deployed AI</div>
          </div>
        </div>

      </div>
    </section>
  );
}
