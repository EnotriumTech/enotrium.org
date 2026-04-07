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
      <div className="flex flex-col items-center justify-center pt-32 sm:pt-44 pb-10 px-4 text-center shrink-0">
       <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-[family-name:var(--font-iceland)] text-white leading-[1.05] tracking-wide">
          Enotrium
        </h1>
          <h2
            className="text-[1rem] sm:text-[1.3rem] md:text-[1.6rem] lg:text-[2rem] xl:text-[2.4rem] font-[family-name:var(--font-iceland)] text-white/80 tracking-[0.2em] uppercase mt-4"
              style={{ textShadow: "0 0 20px rgba(255,255,255,0.15)" }}
            >
            A New Mesopotamia
          </h2>
      </div>

      {/* Bordered panel */}
      <div className="flex-1 mx-0 mb-0 sm:mx-3 sm:mb-3  sm:border-b sm:border-x border-white/15 flex flex-col overflow-hidden min-h-0">
        {/* Subtitle + info row */}
        <div className="px-6 pt-12 pb-10 shrink-0 flex flex-col items-center">
         <p className="text-center text-[1.2rem] sm:text-[1.6rem] md:text-[2rem] lg:text-[2.6rem] text-white/80 leading-snug font-[family-name:var(--font-iceland)] mt-10 mb-12">
            Transforming Agriculture 
            <br />
            through Autonomous Systems
          </p>

          <div className="grid grid-cols-3 items-center w-full max-w-xs mx-auto">
            <span className="text-white/55 text-sm font-[family-name:var(--font-space-grotesk)] leading-snug">
              Defend the
              <br />
              Earth
            </span>
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="Enotrium"
                width={110}
                height={110}
                className="opacity-96"
              />
            </div>
            <div className="text-right font-[family-name:var(--font-space-grotesk)]">
              <div className="text-white/60 text-sm font-bold tracking-[0.2em]">
                EST. 2025
              </div>
              <div className="text-white/55 text-sm">Future of Farming</div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden" style={{ minHeight: "180px", maxHeight: "clamp(180px, 40vw, 500px)", flex: 1 }}>
          <img
            src="/hero-backdrop.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 60%",
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    </section>
  );
}
