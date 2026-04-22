"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Zap, Shield, Target, Radio } from "lucide-react";

export default function UAVPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white font-[family-name:var(--font-inter)]">
      <Navbar darkText />

      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.08),transparent_50%)]" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="fade-up" duration={1}>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 bg-cyan-500/5">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-xs tracking-[0.2em] uppercase text-cyan-400 font-medium">
                    Defense Applications
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-extralight text-white leading-[1.05]">
                  Arthedain
                </h1>
                
                <p className="text-2xl md:text-3xl text-white/70 font-light leading-[1.4]">
                  AI-Powered UAVs for Contested Environments
                </p>
                
                <p className="text-lg text-white/50 leading-[1.8] max-w-xl">
                  UAV runs a spiking neural network for onboard processing. Lower power, faster edge inference, no cloud dependency. That matters in contested environments where GPS and comms get jammed.
                </p>

                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 bg-white/5">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-white/70">10-100x Lower Power</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 bg-white/5">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-white/70">Fully Autonomous</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 border border-cyan-500/20 rounded-lg" />
                <div className="absolute inset-4 border border-cyan-500/10 rounded-lg" />
                <div className="absolute inset-8 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🛸</div>
                    <p className="text-sm tracking-[0.2em] uppercase text-cyan-400/60">
                      SNN-Powered
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Key Technologies - Split Layout */}
      <section className="relative py-32 bg-[#080c10] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal animation="fade-up" duration={1}>
            <div className="mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/60 mb-4 font-medium">
                Technology
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[1.1]">
                Key Technologies
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal animation="fade-up" delay={0.1} duration={1}>
              <div className="group relative p-8 border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Zap className="w-8 h-8 text-cyan-400 mb-6" />
                <h3 className="text-xl font-light text-white mb-4">
                  Spiking Neural Networks
                </h3>
                <p className="text-white/40 text-base leading-[1.7] font-light">
                  Mimic brain-like event-driven processing, slashing power needs compared to traditional CNNs. SNNs enable 10-100x lower power consumption for edge AI tasks like real-time object detection and navigation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
              <div className="group relative p-8 border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Radio className="w-8 h-8 text-cyan-400 mb-6" />
                <h3 className="text-xl font-light text-white mb-4">
                  Event-Driven Processing
                </h3>
                <p className="text-white/40 text-base leading-[1.7] font-light">
                  Only activates on relevant inputs, eliminating constant computation. This event-driven architecture is ideal for battery-limited UAV operations.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
              <div className="group relative p-8 border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Shield className="w-8 h-8 text-cyan-400 mb-6" />
                <h3 className="text-xl font-light text-white mb-4">
                  Neuromorphic Efficiency
                </h3>
                <p className="text-white/40 text-base leading-[1.7] font-light">
                  Native support for temporal data from cameras and sensors. Processes streaming data in real-time without the overhead of traditional neural networks.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.4} duration={1}>
              <div className="group relative p-8 border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Target className="w-8 h-8 text-cyan-400 mb-6" />
                <h3 className="text-xl font-light text-white mb-4">
                  Fully Onboard Inference
                </h3>
                <p className="text-white/40 text-base leading-[1.7] font-light">
                  No cloud, no latency, no single points of failure. Complete autonomy enables operation in denied environments where comms are jammed.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Strategic Advantages - Comparison Table */}
      <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal animation="fade-up" duration={1}>
            <div className="mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/60 mb-4 font-medium">
                Strategic Advantage
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[1.1] mb-6">
                Why Arthedain Wins
              </h2>
              <p className="text-white/50 text-lg leading-[1.8] max-w-3xl font-light">
                This UAV solves dual defense vulnerabilities: foreign electronics supply chains and power-hungry processors that fail in contested zones. Fully domestic production ensures resilience; autonomous SNN operation thrives without comms or cloud.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
            <div className="overflow-hidden border border-white/[0.1] bg-white/[0.01]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.1] bg-white/[0.02]">
                    <th className="text-left p-6 text-white/60 font-light text-sm tracking-[0.1em] uppercase">Vulnerability</th>
                    <th className="text-left p-6 text-white/40 font-light text-sm tracking-[0.1em] uppercase">Traditional UAV</th>
                    <th className="text-left p-6 text-cyan-400 font-light text-sm tracking-[0.1em] uppercase">Arthedain SNN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-white/50 font-light">Supply Chain</td>
                    <td className="p-6 text-white/30 font-light">Foreign chip dependency</td>
                    <td className="p-6 text-cyan-300 font-light">Domestic SNN hardware</td>
                  </tr>
                  <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-white/50 font-light">Power</td>
                    <td className="p-6 text-white/30 font-light">CNNs drain batteries fast</td>
                    <td className="p-6 text-cyan-300 font-light">10-100x lower power</td>
                  </tr>
                  <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-white/50 font-light">Contested Ops</td>
                    <td className="p-6 text-white/30 font-light">GPS/comms jamming kills ops</td>
                    <td className="p-6 text-cyan-300 font-light">Edge inference, fully autonomous</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-white/50 font-light">Inference</td>
                    <td className="p-6 text-white/30 font-light">Cloud latency = death</td>
                    <td className="p-6 text-cyan-300 font-light">Real-time onboard processing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Applications - Three Column */}
      <section className="relative py-32 bg-[#080c10] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.05),transparent_50%)]" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal animation="fade-up" duration={1}>
            <div className="mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/60 mb-4 font-medium">
                Mission Capabilities
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[1.1] mb-6">
                Applications
              </h2>
              <p className="text-white/50 text-lg leading-[1.8] max-w-3xl font-light">
                Built for jammed battlefields, excels in surveillance, targeting, and swarming missions. SNNs handle real-time visual tracking on standard RGB cameras with minimal power draw.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-up" delay={0.1} duration={1}>
              <div className="group relative p-8 border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500">
                <div className="w-16 h-16 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-light text-white mb-4">
                  Surveillance
                </h3>
                <p className="text-white/40 text-base leading-[1.7] font-light">
                  Jam-proof autonomous patrol and loiter. Continuous monitoring without reliance on external communications.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
              <div className="group relative p-8 border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500">
                <div className="w-16 h-16 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-light text-white mb-4">
                  Targeting
                </h3>
                <p className="text-white/40 text-base leading-[1.7] font-light">
                  Onboard object detection and classification. Real-time threat identification without cloud dependency.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
              <div className="group relative p-8 border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500">
                <div className="w-16 h-16 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                  <Radio className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-light text-white mb-4">
                  Swarming
                </h3>
                <p className="text-white/40 text-base leading-[1.7] font-light">
                  Low-power coordination in denied environments. Distributed intelligence for multi-UAV operations.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
