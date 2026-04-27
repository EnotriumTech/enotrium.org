"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, Zap, Shield, Cpu, Layers, CheckCircle2, ChevronRight } from "lucide-react";

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Checkered pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #333 25%, transparent 25%),
            linear-gradient(-45deg, #333 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #333 75%),
            linear-gradient(-45deg, transparent 75%, #333 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 py-32 w-full">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Edge AI
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-normal leading-[0.95] max-w-5xl text-white mb-8 font-[family-name:var(--font-tektur)] text-balance">
            Nanosystems
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 leading-[1.6] max-w-3xl mb-12 font-[family-name:var(--font-inter)] font-light">
            Biomimetic nanotechnology for ultra-efficient, real-time distributed intelligence.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// NEUROMORPHIC MCU SECTION
// ============================================
function NeuromorphicMCUSection() {
  const components = [
    {
      name: "Spiking Compute Fabric",
      function: "Advanced event-driven acceleration for ultra-low power SNN workloads.",
    },
    {
      name: "CNN Accelerator",
      function: "High-efficiency processing for traditional AI and legacy deep learning models.",
    },
    {
      name: "RISC-V CPU",
      function: "A versatile sub-system for overall management, control, and system-level tasks.",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Checkered pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #333 25%, transparent 25%),
            linear-gradient(-45deg, #333 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #333 75%),
            linear-gradient(-45deg, transparent 75%, #333 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
                Hardware
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-6 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
                Enotrium Neuromorphic Microcontroller
              </h2>
              <p className="text-2xl text-gray-400 mb-4 font-[family-name:var(--font-inter)] font-light">
                Intelligence at the Edge, Efficiency by Design
              </p>
              <p className="text-gray-400 text-lg leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
                The Enotrium Neuromorphic Microcontroller is engineered for real-time intelligence at the sensor edge, delivering brain-like efficiency within a milliwatt power envelope. By mimicking the biological architecture of the human brain, it enables a new generation of always-on, ultra-responsive devices for wearables, IoT, and industrial ecosystems.
              </p>
            </div>
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-[500px]">
              <Image
                src="/Nanosystems.png"
                alt="Nanosystems"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="max-w-4xl mb-16">
            <h3 className="text-2xl font-light text-white mb-6 font-[family-name:var(--font-inter)] tracking-wide">
              The Architecture: Spiking Neural Networks (SNNs)
            </h3>
            <p className="text-gray-400 text-lg leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              Traditional AI often struggles with the power demands of continuous edge processing. Our MCU solves this by utilizing Spiking Neural Networks (SNNs)—an event-driven approach that mirrors how neurons in the brain communicate via discrete electrical pulses (spikes). This ensures energy is consumed only when relevant data is detected.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
          <div className="max-w-4xl">
            <h3 className="text-2xl font-light text-white mb-6 font-[family-name:var(--font-inter)] tracking-wide">
              Heterogeneous Single-Chip Platform
            </h3>
            <p className="text-gray-400 text-lg leading-[1.8] max-w-3xl mb-8 font-[family-name:var(--font-inter)] font-light">
              The Enotrium MCU integrates three specialized processing domains to handle end-to-end sensor data with maximum flexibility:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider font-[family-name:var(--font-inter)]">
                      Component
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white uppercase tracking-wider font-[family-name:var(--font-inter)]">
                      Function
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((comp, index) => (
                    <tr key={index} className="border-b border-gray-800/50">
                      <td className="py-4 px-6 text-sm text-white font-[family-name:var(--font-inter)]">
                        {comp.name}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400 font-[family-name:var(--font-inter)]">
                        {comp.function}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// BEYOND CONVENTIONAL SECTION
// ============================================
function BeyondConventionalSection() {
  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Checkered pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #333 25%, transparent 25%),
            linear-gradient(-45deg, #333 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #333 75%),
            linear-gradient(-45deg, transparent 75%, #333 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Technology
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Beyond Conventional Nanotechnology
            </h2>
            <p className="text-gray-400 text-xl leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              Conventional approaches to distributed sensing and computation hit fundamental limits in power density, signal latency, and system integration at the nanoscale. Rich environmental data goes underutilized because existing hardware cannot process it efficiently in situ. Enotrium's Nanosystems eliminate this bottleneck by delivering biology-inspired, event-driven computation directly at the point of sensing — where decisions must happen in microseconds, not milliseconds.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// NANOSYSTEMS ADVANTAGE SECTION
// ============================================
function AdvantageSection() {
  const advantages = [
    "Ultra-low power operation enabling processing in picowatt-to-nanowatt regimes",
    "Real-time responsiveness through asynchronous, event-driven signal propagation",
    "Privacy by design via fully distributed, on-node data processing",
    "Massively scalable architectures optimized for dense nanoscale integration",
    "Robust adaptive performance resilient to noise, signal sparsity, and hardware variation",
  ];

  return (
    <section className="relative py-32 md:py-40 bg-black overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Advantages
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              The Nanosystems Advantage
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="max-w-3xl space-y-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                <p className="text-gray-300 text-lg leading-[1.7] font-[family-name:var(--font-inter)] font-light">
                  {advantage}
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
// BENEFIT CARDS SECTION
// ============================================
function BenefitCardsSection() {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Ultra-low power",
      description: "Enotrium's nanosystem architecture achieves power consumption orders of magnitude below conventional MEMS and CMOS solutions, enabling perpetual sensing in energy-harvested and implantable systems.",
    },
    {
      icon: <ArrowRight className="w-8 h-8" />,
      title: "Instant response",
      description: "Asynchronous event propagation eliminates clock-driven overhead, reducing signal-to-decision latency to sub-microsecond timescales in distributed nanosensor networks.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No external dependency",
      description: "On-node intelligence eliminates the need for wireless transmission or cloud processing, dramatically extending operational lifetime and ensuring data sovereignty.",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Developer-ready integration",
      description: "Enotrium's toolchain allows researchers and engineers to model, simulate, and deploy nanosystem networks using familiar scientific Python workflows and open hardware interfaces.",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Checkered pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #333 25%, transparent 25%),
            linear-gradient(-45deg, #333 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #333 75%),
            linear-gradient(-45deg, transparent 75%, #333 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
            
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              The Edge of the Future
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-8 border border-gray-800 bg-black hover:border-gray-700 transition-colors">
                <div className="text-gray-500 mb-6">{benefit.icon}</div>
                <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)] tracking-wide">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-base leading-[1.7] font-[family-name:var(--font-inter)] font-light">
                  {benefit.description}
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
// COMPARISON TABLE SECTION
// ============================================
function ComparisonTableSection() {
  const comparisons = [
    { dimension: "Compute paradigm", enotrium: "Asynchronous, biomimetic, event-driven", conventional: "Clock-driven, frame-based sampling" },
    { dimension: "Power (operation)", enotrium: "Picowatt–nanowatt range", conventional: "Microwatt–milliwatt range" },
    { dimension: "Latency", enotrium: "Sub-microsecond response", conventional: "Milliseconds to seconds" },
    { dimension: "Comparative efficiency", enotrium: "Orders of magnitude more efficient per decision", conventional: "Baseline for comparison" },
    { dimension: "On-node vs external", enotrium: "Fully on-node intelligence", conventional: "Typically cloud or edge-offloaded" },
    { dimension: "Architecture", enotrium: "Nanosystem array + signal conditioning + neuromorphic logic", conventional: "ADC + microcontroller + radio stack" },
    { dimension: "Always-on fit", enotrium: "Optimized for perpetual, always-on operation", conventional: "Feasible but at high energy cost" },
    { dimension: "Privacy", enotrium: "No data leaves the node by design", conventional: "Transmission-dependent, exposure risk" },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-black overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Comparison
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Nanosystems vs Conventional Distributed Sensing Architectures
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    Dimension
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    Enotrium Nanosystems
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider font-[family-name:var(--font-inter)]">
                    Conventional MEMS/CMOS Nodes
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-gray-800/50">
                    <td className="py-4 px-6 text-sm text-gray-400 font-[family-name:var(--font-inter)]">
                      {row.dimension}
                    </td>
                    <td className="py-4 px-6 text-sm text-white font-[family-name:var(--font-inter)]">
                      {row.enotrium}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 font-[family-name:var(--font-inter)]">
                      {row.conventional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// PIPELINE SECTION
// ============================================
function PipelineSection() {
  const steps = [
    {
      number: "01",
      title: "Environmental Sensing",
      description: "Nanosensors continuously transduce physical, chemical, or biological signals from the surrounding environment with atomic-scale precision.",
    },
    {
      number: "02",
      title: "Event Encoding",
      description: "Analog signals are converted into sparse temporal event streams, preserving critical information while discarding redundant background noise.",
    },
    {
      number: "03",
      title: "Distributed Nanosystem Processing",
      description: "Biomimetic processing elements analyze event streams locally in real time, extracting patterns without centralized coordination.",
    },
    {
      number: "04",
      title: "Actionable Output",
      description: "Processed events translate directly into actuation signals, classification outputs, or communication triggers at the node level.",
    },
    {
      number: "05",
      title: "Adaptive Calibration",
      description: "Nanosystems register environmental drift and performance history over time, enabling self-calibration and increasingly precise operation.",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Checkered pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #333 25%, transparent 25%),
            linear-gradient(-45deg, #333 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #333 75%),
            linear-gradient(-45deg, transparent 75%, #333 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Pipeline
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              From Signal to Decision
            </h2>
            <p className="text-gray-400 text-xl leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              The Nanosystem Pipeline
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-8 p-8 border border-gray-800 bg-black hover:border-gray-700 transition-colors">
                <p className="text-sm text-gray-500 font-[family-name:var(--font-inter)] font-medium">
                  {step.number}
                </p>
                <div className="flex-1">
                  <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)] tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-[1.7] font-[family-name:var(--font-inter)] font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// DEPLOYMENT SECTION
// ============================================
function DeploymentSection() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant response without complex system overhead",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Extended operational lifetime under energy-harvesting conditions",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Maximum intelligence per unit volume in constrained nanosystems",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Greater autonomy with zero dependence on external infrastructure",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-black overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Deployment
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Designed for Real-World Deployment
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 border border-gray-800 bg-[#0a0a0a] hover:border-gray-700 transition-colors">
                <div className="text-gray-500 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-light text-white font-[family-name:var(--font-inter)] tracking-wide">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// USE CASES SECTION
// ============================================
function UseCasesSection() {
  const useCases = [
    {
      title: "In-body biosensing",
      description: "Continuous, low-power monitoring of biomarkers, neural signals, and cellular activity in implantable and ingestible nanosystems — with no wireless transmission required.",
    },
    {
      title: "Environmental distributed sensing",
      description: "Massively parallel nanosensor arrays that monitor air quality, chemical gradients, or structural integrity across wide areas with near-zero power budgets.",
    },
    {
      title: "Industrial anomaly detection",
      description: "Always-on nanosystems embedded in materials or machinery detect micro-scale structural changes, vibration anomalies, or chemical signatures before failures cascade.",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Checkered pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #333 25%, transparent 25%),
            linear-gradient(-45deg, #333 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #333 75%),
            linear-gradient(-45deg, transparent 75%, #333 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Applications
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Real-World Applications
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-8 border border-gray-800 bg-black hover:border-gray-700 transition-colors">
                <h3 className="text-xl font-light text-white mb-4 font-[family-name:var(--font-inter)] tracking-wide">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 text-base leading-[1.7] font-[family-name:var(--font-inter)] font-light">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3} duration={1}>
          <p className="text-gray-400 text-lg font-[family-name:var(--font-inter)] font-light">
            And much more. Contact us to explore the full range of Nanosystems applications.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// ECOSYSTEM SECTION
// ============================================
function EcosystemSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Sensor Integration", "Nanosystem Computation", "Application Deployment", "Developer Portal"];

  return (
    <section className="relative py-32 md:py-40 bg-black overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Ecosystem
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              From Nanosensor to Intelligence — A Complete Ecosystem
            </h2>
            <p className="text-gray-400 text-xl leading-[1.8] max-w-3xl font-[family-name:var(--font-inter)] font-light">
              Biomimetic sensing, distributed nanosystem computation, and deployment-ready integration tooling form a seamless path from raw physical signal to intelligent action at the nanoscale.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="border border-gray-800 bg-[#0a0a0a]">
            <div className="flex flex-wrap border-b border-gray-800">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-4 text-sm font-medium tracking-wider uppercase transition-colors font-[family-name:var(--font-inter)] ${
                    activeTab === index
                      ? "text-white border-b-2 border-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8">
              <p className="text-gray-400 text-lg font-[family-name:var(--font-inter)] font-light">
                {tabs[activeTab]} content coming soon.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// BLOG PREVIEWS SECTION
// ============================================
function BlogPreviewsSection() {
  const posts = [
    "The Case for Biomimetic Nanosystems in Next-Generation Sensing",
    "Why Distributed Intelligence Begins at the Nanoscale",
    "Designing for Zero Power: Lessons from Biology",
  ];

  return (
    <section className="relative py-32 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Checkered pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(45deg, #333 25%, transparent 25%),
            linear-gradient(-45deg, #333 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #333 75%),
            linear-gradient(-45deg, transparent 75%, #333 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="max-w-4xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-5 font-[family-name:var(--font-inter)] font-medium">
              Insights
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-10 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
              Latest from Enotrium
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={index} className="p-8 border border-gray-800 bg-black hover:border-gray-700 transition-colors">
                <h3 className="text-lg font-light text-white mb-4 font-[family-name:var(--font-inter)] tracking-wide leading-tight">
                  {post}
                </h3>
                <Link href="#" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors font-[family-name:var(--font-inter)]">
                  Read more
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// FOOTER CTA SECTION
// ============================================
function FooterCTASection() {
  return (
    <section className="relative py-32 md:py-40 bg-black overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
        <ScrollReveal animation="fade-up" duration={1}>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-8 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            Deploy your Nanosystem today
          </h2>
          <p className="text-gray-400 text-xl leading-[1.8] max-w-3xl mx-auto mb-12 font-[family-name:var(--font-inter)] font-light">
            Discover how Enotrium's nanosystem architecture can transform your next-generation devices with real-time, distributed intelligence and ultra-efficient performance at the atomic edge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:enotriumtech@atomicmail.io"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] hover:bg-gray-200"
            >
              Contact us
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 border border-gray-700 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] hover:border-gray-500"
            >
              Sales
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 border border-gray-700 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] hover:border-gray-500"
            >
              Marketing
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 border border-gray-700 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] hover:border-gray-500"
            >
              Research Partnerships
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
export default function NanosystemsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white font-[family-name:var(--font-inter)]">
      <Navbar />

      <HeroSection />
      <NeuromorphicMCUSection />
      <BeyondConventionalSection />
      <AdvantageSection />
      <BenefitCardsSection />
      <ComparisonTableSection />
      <PipelineSection />
      <DeploymentSection />
      <UseCasesSection />
      <EcosystemSection />
      <BlogPreviewsSection />
      <FooterCTASection />

      <Footer />
    </main>
  );
}
