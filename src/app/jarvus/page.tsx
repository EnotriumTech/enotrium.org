"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight, Terminal, Globe, Infinity, Zap, Brain, Activity, Database, Code, Search, Plug, Github, Copy, Check } from "lucide-react";

// ============================================
// SNN VISUALIZER COMPONENT
// ============================================
function SNNVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ spikes: 847, neurons: 2048, latency: 1.2, efficiency: 94 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    type Neuron = {
      x: number; y: number;
      phase: number;
      firing: boolean;
      connections: number[];
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Create neural network
    const W = canvas.width;
    const H = canvas.height;
    const layers = [8, 12, 16, 12, 8];
    const neurons: Neuron[] = [];
    const layerSpacing = W / (layers.length + 1);

    layers.forEach((count, layerIdx) => {
      const x = layerSpacing * (layerIdx + 1);
      const verticalSpacing = H / (count + 1);
      for (let i = 0; i < count; i++) {
        neurons.push({
          x,
          y: verticalSpacing * (i + 1),
          phase: Math.random() * Math.PI * 2,
          firing: false,
          connections: [],
        });
      }
    });

    // Create connections between adjacent layers
    let neuronIdx = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerStart = neuronIdx;
      const currentLayerEnd = neuronIdx + layers[l];
      const nextLayerStart = currentLayerEnd;
      const nextLayerEnd = nextLayerStart + layers[l + 1];

      for (let i = currentLayerStart; i < currentLayerEnd; i++) {
        for (let j = nextLayerStart; j < nextLayerEnd; j++) {
          if (Math.random() > 0.6) {
            neurons[i].connections.push(j);
          }
        }
      }
      neuronIdx = currentLayerEnd;
    }

    const draw = () => {
      ctx.fillStyle = "#0e1012";
      ctx.fillRect(0, 0, W, H);

      t += 0.02;

      // Update stats periodically
      if (Math.random() > 0.98) {
        setStats({
          spikes: Math.floor(800 + Math.random() * 100),
          neurons: 2048,
          latency: parseFloat((1.0 + Math.random() * 0.4).toFixed(1)),
          efficiency: Math.floor(92 + Math.random() * 4),
        });
      }

      // Draw connections
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach((targetIdx) => {
          const target = neurons[targetIdx];
          const alpha = (neuron.firing ? 0.6 : 0.1) * (target.firing ? 0.8 : 0.3);
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `rgba(124, 92, 252, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw neurons
      neurons.forEach((neuron) => {
        const wave = Math.sin(t + neuron.phase);
        neuron.firing = wave > 0.8;

        const baseRadius = 4;
        const radius = neuron.firing ? baseRadius * 1.8 : baseRadius;
        const alpha = neuron.firing ? 1 : 0.4;

        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = neuron.firing 
          ? `rgba(45, 212, 160, ${alpha})` 
          : `rgba(124, 92, 252, ${alpha})`;
        ctx.fill();

        if (neuron.firing) {
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(45, 212, 160, 0.2)`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative bg-[#0e1012] border border-white/7 rounded-2xl p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(124,92,252,0.05)_0%,transparent_70%)] pointer-events-none" />
      <p className="font-mono text-[11px] text-white/20 uppercase tracking-widest mb-6">
        // Live SNN firing pattern — temporal event processing
      </p>
      <canvas ref={canvasRef} className="w-full h-[120px]" />
      <div className="flex gap-8 mt-4 flex-wrap">
        <div>
          <span className="font-mono text-xl font-medium text-white block">{stats.spikes}</span>
          <span className="font-mono text-[11px] text-white/20 uppercase tracking-wider">spikes / sec</span>
        </div>
        <div>
          <span className="font-mono text-xl font-medium text-white block">{stats.neurons.toLocaleString()}</span>
          <span className="font-mono text-[11px] text-white/20 uppercase tracking-wider">active neurons</span>
        </div>
        <div>
          <span className="font-mono text-xl font-medium text-white block">{stats.latency}ms</span>
          <span className="font-mono text-[11px] text-white/20 uppercase tracking-wider">inference latency</span>
        </div>
        <div>
          <span className="font-mono text-xl font-medium text-white block">{stats.efficiency}%</span>
          <span className="font-mono text-[11px] text-white/20 uppercase tracking-wider">energy efficiency vs. transformer</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("pip install jarvus");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(124,92,252,0.18)_0%,transparent_70%),radial-gradient(ellipse_40%_30%_at_80%_60%,rgba(45,212,160,0.06)_0%,transparent_60%)]" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 py-32 w-full">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-widest uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
              SNN-Powered
            </span>
            <span className="text-white/20 text-xs">·</span>
            <span className="font-mono text-[11px] text-white/20 tracking-wider">
              Jarvus v0.1 · open source
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] max-w-5xl text-white mb-6 font-[family-name:var(--font-tektur)] text-balance">
            Jarvus — The<br />
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Self-Learning Agent
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 leading-[1.6] max-w-3xl mb-8 font-[family-name:var(--font-inter)] font-light">
            Powered by Spiking Neural Networks. Learns from every task. Grows smarter over time.
          </p>

          <div className="flex gap-3 flex-wrap items-center mb-8">
            <Link
              href="https://github.com/EnotriumSyndicate/Jarvus"
              className="bg-purple-500 text-white px-7 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/EnotriumSyndicate/Jarvus"
              className="border border-white/12 text-gray-300 px-7 py-3.5 rounded-lg font-medium hover:border-white/20 hover:text-white transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </Link>
          </div>

          <div className="flex items-center gap-2 font-mono text-sm text-gray-500">
            <span className="text-purple-400">$</span>
            <span className="text-gray-300">pip install jarvus</span>
            <button
              onClick={copyCommand}
              className="ml-2 text-gray-500 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </ScrollReveal>

        <div className="mt-12">
          <SNNVisualizer />
        </div>
      </div>
    </section>
  );
}

// ============================================
// SURFACES SECTION
// ============================================
function SurfacesSection() {
  const surfaces = [
    {
      icon: Terminal,
      color: "purple",
      title: "CLI",
      description: "Run Jarvus in any terminal, shell script, or editor. Full task orchestration from the command line.",
      cta: "Install → pip install jarvus",
    },
    {
      icon: Code,
      color: "emerald",
      title: "API",
      description: "Embed Jarvus into your own systems. REST interface with streaming support and webhook callbacks.",
      cta: "Read docs →",
    },
    {
      icon: Globe,
      color: "orange",
      title: "Web",
      description: "Browser-based agent dashboard. Watch Jarvus plan, execute, and learn in real time.",
      cta: "Open →",
    },
    {
      icon: Infinity,
      color: "amber",
      title: "Autonomous",
      description: "Long-running background agents. Set a goal, walk away. Jarvus handles the rest, learns as it goes.",
      cta: "Learn more →",
    },
  ];

  const colorClasses = {
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-400/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-400/20" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-400/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-400/20" },
  };

  return (
    <section className="py-32 border-t border-white/7">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full mb-6">
            Availability
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            One agent, every surface.
          </h2>
          <p className="text-gray-400 text-lg max-w-[480px] mb-12 font-[family-name:var(--font-inter)] font-light">
            Jarvus runs wherever you work — terminal, API, browser, or fully autonomous in the background.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/7 rounded-2xl overflow-hidden border border-white/7">
            {surfaces.map((surface, idx) => {
              const colors = colorClasses[surface.color as keyof typeof colorClasses];
              const Icon = surface.icon;
              return (
                <div key={idx} className="bg-[#0e1012] p-8 hover:bg-[#141618] transition-colors">
                  <div className={`w-9 h-9 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2 font-[family-name:var(--font-inter)]">
                    {surface.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 font-[family-name:var(--font-inter)]">
                    {surface.description}
                  </p>
                  <Link
                    href="https://github.com/EnotriumSyndicate/Jarvus"
                    className="font-mono text-xs text-purple-400 hover:text-purple-300 transition-colors tracking-wide"
                  >
                    {surface.cta}
                  </Link>
                </div>
              );
            })}
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
  const features = [
    {
      color: "purple",
      title: "Temporal reasoning",
      description: "SNNs process event sequences over time. Jarvus understands when things happen, not just what — enabling causal inference across task steps.",
    },
    {
      color: "emerald",
      title: "On-device self-learning",
      description: "Jarvus updates its own synaptic weights from experience using spike-timing-dependent plasticity. Each task makes it sharper.",
    },
    {
      color: "orange",
      title: "Efficient inference",
      description: "SNN-based compute fires only when needed. Inference uses a fraction of the power of equivalent transformer-based agents.",
    },
  ];

  const colorClasses = {
    purple: { bg: "bg-purple-500", shadow: "shadow-purple-500/50" },
    emerald: { bg: "bg-emerald-500", shadow: "shadow-emerald-500/50" },
    orange: { bg: "bg-orange-500", shadow: "shadow-orange-500/50" },
  };

  return (
    <section className="py-32 bg-[#0e1012]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full mb-6">
                Architecture
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
                Doesn't just run tasks.<br />
                <span className="text-gray-400">Learns from them.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-[family-name:var(--font-inter)] font-light">
                Jarvus is built on Spiking Neural Networks — a biologically-inspired architecture that processes information as temporal event streams, not static snapshots. The same architecture the brain uses.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-[family-name:var(--font-inter)] font-light">
                Every task completed updates Jarvus's internal model. No retraining pipelines. No dataset curation. Just experience.
              </p>

              <div className="flex flex-col gap-4">
                {features.map((feature, idx) => {
                  const colors = colorClasses[feature.color as keyof typeof colorClasses];
                  return (
                    <div key={idx} className="flex gap-4 p-5 bg-[#1a1d20] border border-white/7 rounded-xl">
                      <div className={`w-2 h-2 rounded-full ${colors.bg} ${colors.shadow} shadow-lg mt-2 flex-shrink-0`} />
                      <div>
                        <h4 className="text-white font-medium mb-1 font-[family-name:var(--font-inter)]">
                          {feature.title}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative bg-[#1a1d20] border border-white/7 rounded-2xl p-8 h-[360px] flex items-center justify-center">
              <div className="text-center">
                <Brain className="w-24 h-24 text-purple-400 mx-auto mb-4 opacity-50" />
                <p className="font-mono text-sm text-gray-500">SNN Architecture Diagram</p>
                <p className="text-xs text-gray-600 mt-2">Interactive visualization</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// LIVE AGENT FEED SECTION
// ============================================
function LiveAgentFeedSection() {
  const feedItems = [
    {
      status: "running",
      badge: "Running",
      title: "Analyzing repository structure and dependency graph",
      meta: "subagent-1 · active · 2.1s elapsed",
    },
    {
      status: "corrected",
      badge: "Self-corrected",
      title: "Conflicting schema in step 3 — rewrote execution plan without user input",
      meta: "self-correction · autonomous",
    },
    {
      status: "learned",
      badge: "Learned",
      title: "Memory written: user prefers structured JSON with confidence scores",
      meta: "episodic memory · persistent across sessions",
    },
    {
      status: "done",
      badge: "Parallel",
      title: "Spawned 3 parallel subagents to accelerate ingestion",
      meta: "orchestrator · parallel execution",
    },
    {
      status: "pending",
      badge: "Pending",
      title: "Generate final report with anomaly flags and delta from baseline",
      meta: "queued · awaiting upstream completion",
    },
  ];

  const statusColors = {
    running: { bg: "bg-emerald-400", shadow: "shadow-emerald-400/50" },
    corrected: { bg: "bg-orange-400", shadow: "shadow-orange-400/50" },
    learned: { bg: "bg-amber-400", shadow: "shadow-amber-400/50" },
    done: { bg: "bg-purple-400", shadow: "shadow-purple-400/50" },
    pending: { bg: "bg-gray-500", shadow: "shadow-gray-500/50" },
  };

  const badgeColors = {
    running: { bg: "bg-emerald-400/10", text: "text-emerald-400", border: "border-emerald-400/20" },
    corrected: { bg: "bg-orange-400/10", text: "text-orange-400", border: "border-orange-400/20" },
    learned: { bg: "bg-amber-400/10", text: "text-amber-400", border: "border-amber-400/20" },
    done: { bg: "bg-purple-400/10", text: "text-purple-400", border: "border-purple-400/20" },
    pending: { bg: "bg-gray-500/10", text: "text-gray-500", border: "border-gray-500/20" },
  };

  return (
    <section className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full mb-6">
            Live agent
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
                Watch it think.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-4 font-[family-name:var(--font-inter)] font-light">
                A running Jarvus session shows you its reasoning process, self-corrections, and what it learned — in full. No black box.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 font-[family-name:var(--font-inter)]">
                Jarvus emits structured events for every decision: why it spawned a subagent, why it rejected a plan, what it stored in episodic memory.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1a1d20] border border-white/7 rounded-xl p-4">
                  <span className="font-mono text-2xl font-medium text-white block">~3×</span>
                  <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider">faster than GPT-4 agents</span>
                </div>
                <div className="bg-[#1a1d20] border border-white/7 rounded-xl p-4">
                  <span className="font-mono text-2xl font-medium text-white block">94%</span>
                  <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider">lower inference power</span>
                </div>
                <div className="bg-[#1a1d20] border border-white/7 rounded-xl p-4">
                  <span className="font-mono text-2xl font-medium text-white block">0</span>
                  <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider">retraining runs required</span>
                </div>
                <div className="bg-[#1a1d20] border border-white/7 rounded-xl p-4">
                  <span className="font-mono text-2xl font-medium text-white block">∞</span>
                  <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider">task duration</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0e1012] border border-white/7 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/7 flex items-center gap-2 font-mono text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                jarvus · session-a4f2 · running
              </div>
              {feedItems.map((item, idx) => {
                const statusColor = statusColors[item.status as keyof typeof statusColors];
                const badgeColor = badgeColors[item.status as keyof typeof badgeColors];
                return (
                  <div
                    key={idx}
                    className="px-5 py-4 border-b border-white/7 flex gap-3 items-start last:border-b-0"
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className={`w-2 h-2 rounded-full ${statusColor.bg} ${statusColor.shadow} shadow-lg mt-1.5 flex-shrink-0`} />
                    <div className="flex-1">
                      <p className="text-white text-sm leading-relaxed mb-1 font-mono font-light">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-xs mb-2">{item.meta}</p>
                      <span
                        className={`inline-block font-mono text-[10px] px-2 py-0.5 rounded-full ${badgeColor.bg} ${badgeColor.text} ${badgeColor.border} border tracking-wide`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// LIFECYCLE SECTION
// ============================================
function LifecycleSection() {
  const phases = [
    {
      num: "01",
      color: "purple",
      title: "Plan",
      description: "Jarvus asks clarifying questions, builds a task dependency graph, then executes. Complex tasks get decomposed into parallel subagent workstreams automatically.",
    },
    {
      num: "02",
      color: "emerald",
      title: "Execute",
      description: "Subagents run in parallel. Jarvus monitors intermediate outputs and self-corrects when it detects anomalies — no human prompting required mid-task.",
    },
    {
      num: "03",
      color: "amber",
      title: "Learn",
      description: "Post-task, Jarvus writes episodic memories and updates synaptic weights based on what worked. Future runs start smarter.",
    },
    {
      num: "04",
      color: "orange",
      title: "Report",
      description: "Structured output with confidence scores, anomaly flags, learned insights, and a diff of its internal model state before and after the task.",
    },
  ];

  const colorClasses = {
    purple: "bg-purple-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    orange: "bg-orange-400",
  };

  return (
    <section className="py-32 bg-[#0e1012]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full mb-6">
            Lifecycle
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            Spans the full development cycle.
          </h2>
          <p className="text-gray-400 text-lg max-w-[520px] mb-12 font-[family-name:var(--font-inter)] font-light">
            From planning to execution to learning — Jarvus handles every phase autonomously, with full transparency into its reasoning at each step.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className="bg-black border border-white/7 rounded-2xl p-7 relative overflow-hidden hover:border-white/12 transition-colors"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${colorClasses[phase.color as keyof typeof colorClasses]}`} />
                <p className="font-mono text-[11px] text-gray-500 tracking-wider mb-4">{phase.num}</p>
                <h3 className="text-white text-lg font-medium mb-3 font-[family-name:var(--font-inter)]">
                  {phase.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                  {phase.description}
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
// MEMORY SECTION
// ============================================
function MemorySection() {
  return (
    <section className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative bg-[#1a1d20] border border-white/7 rounded-2xl p-8 h-[300px] flex items-center justify-center">
              <div className="text-center">
                <Database className="w-20 h-20 text-purple-400 mx-auto mb-4 opacity-50" />
                <p className="font-mono text-sm text-gray-500">Episodic Memory Graph</p>
                <p className="text-xs text-gray-600 mt-2">Interactive visualization</p>
              </div>
            </div>

            <div>
              <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full mb-6">
                Memory
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
                An agent that remembers — and evolves.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-4 font-[family-name:var(--font-inter)] font-light">
                Jarvus maintains persistent episodic memory across sessions. Past tasks, user preferences, domain knowledge, and learned heuristics all persist and compound.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-[family-name:var(--font-inter)] font-light">
                This isn't retrieval-augmented generation. Jarvus doesn't look things up — it internalizes them into its network weights via spike-timing-dependent plasticity.
              </p>
              <div className="bg-purple-400/10 border border-purple-400/20 rounded-xl p-5 font-mono text-sm text-purple-400 italic">
                "Jarvus doesn't retrieve — it internalizes."
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// TOOLS SECTION
// ============================================
function ToolsSection() {
  const tools = [
    { icon: Terminal, color: "emerald", title: "Terminal", description: "Run shell commands, builds, and scripts directly. Sandboxed by default." },
    { icon: Search, color: "purple", title: "Web search", description: "Search the web, fetch documentation, and gather context autonomously." },
    { icon: Database, color: "blue", title: "File I/O", description: "Read, write, and manipulate files across your filesystem securely." },
    { icon: Globe, color: "orange", title: "External APIs", description: "Connect to any REST or GraphQL API via configuration." },
    { icon: Code, color: "emerald", title: "Custom plugins", description: "Extend Jarvus with custom tools using our open plugin format." },
    { icon: Plug, color: "purple", title: "Your stack", description: "Connect to databases, monitoring systems, IoT endpoints, and more." },
  ];

  const colorClasses = {
    emerald: "text-emerald-400",
    purple: "text-purple-400",
    blue: "text-blue-400",
    orange: "text-orange-400",
  };

  return (
    <section className="py-32 bg-[#0e1012]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full mb-6">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            Equipped to do real work.
          </h2>
          <p className="text-gray-400 text-lg max-w-[480px] mb-12 font-[family-name:var(--font-inter)] font-light">
            Jarvus comes with a full toolkit out of the box. Extend it with custom plugins or connect your existing stack via configuration.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              const colorClass = colorClasses[tool.color as keyof typeof colorClasses];
              return (
                <div
                  key={idx}
                  className="bg-black border border-white/7 rounded-xl p-5 hover:border-white/12 hover:bg-[#1a1d20] transition-all cursor-default"
                >
                  <Icon className={`w-5 h-5 ${colorClass} mb-3`} />
                  <h4 className="text-white font-medium mb-1 font-[family-name:var(--font-inter)]">
                    {tool.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                    {tool.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// RESEARCH SECTION
// ============================================
function ResearchSection() {
  const papers = [
    {
      tag: "Architecture",
      title: "Why SNNs for agents — the architectural argument",
      description: "Exploring the advantages of spiking neural networks for autonomous agent systems compared to traditional transformer architectures.",
      date: "Dec 2024",
    },
    {
      tag: "Learning",
      title: "Self-modification without catastrophic forgetting",
      description: "How Jarvus learns new patterns without losing previously acquired knowledge through synaptic weight management.",
      date: "Nov 2024",
    },
    {
      tag: "Benchmarks",
      title: "Benchmarks vs. transformer-based agents",
      description: "Comprehensive performance analysis comparing SNN-based agents to transformer alternatives on speed, power, and task accuracy.",
      date: "Oct 2024",
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full mb-6">
            Research
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            Research highlights.
          </h2>
          <p className="text-gray-400 text-lg max-w-[520px] mb-12 font-[family-name:var(--font-inter)] font-light">
            Latest findings from the Jarvus research team on SNN architectures, self-learning systems, and agent benchmarks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {papers.map((paper, idx) => (
              <Link
                key={idx}
                href="https://github.com/EnotriumSyndicate/Jarvus"
                className="bg-[#0e1012] border border-white/7 rounded-2xl p-8 hover:border-white/12 transition-colors block"
              >
                <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider mb-4 block">
                  {paper.tag}
                </span>
                <h3 className="text-white text-lg mb-3 leading-snug font-[family-name:var(--font-inter)]">
                  {paper.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 font-[family-name:var(--font-inter)]">
                  {paper.description}
                </p>
                <span className="font-mono text-[11px] text-gray-500">{paper.date}</span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// CHANGELOG SECTION
// ============================================
function ChangelogSection() {
  const changes = [
    { version: "v0.1.2", date: "Dec 15, 2024", description: "Added episodic memory persistence and improved SNN training stability." },
    { version: "v0.1.1", date: "Dec 1, 2024", description: "Fixed subagent orchestration race conditions and added parallel execution limits." },
    { version: "v0.1.0", date: "Nov 15, 2024", description: "Initial public release with core SNN architecture and CLI interface." },
  ];

  return (
    <section className="py-32 bg-[#0e1012]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <span className="inline-block font-mono text-[11px] tracking-widest uppercase text-purple-400 bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full mb-6">
            Changelog
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-8 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            Latest releases.
          </h2>

          <div className="space-y-0">
            {changes.map((change, idx) => (
              <div
                key={idx}
                className="flex gap-8 items-start py-5 border-b border-white/7 last:border-b-0"
              >
                <span className="font-mono text-sm font-medium text-purple-400 min-w-[60px]">
                  {change.version}
                </span>
                <span className="font-mono text-xs text-gray-500 min-w-[90px] mt-1">
                  {change.date}
                </span>
                <p className="text-gray-400 text-sm">
                  <span className="text-white font-medium">{change.description.split(" — ")[0]}</span>
                  {change.description.includes(" — ") && ` — ${change.description.split(" — ")[1]}`}
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
// FINAL CTA SECTION
// ============================================
function FinalCTASection() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("pip install jarvus");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(124,92,252,0.12)_0%,transparent_70%)]" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            Try Jarvus now.
          </h2>
          <p className="text-gray-400 text-lg max-w-[500px] mx-auto mb-8 font-[family-name:var(--font-inter)] font-light">
            Get started with the self-learning agent powered by Spiking Neural Networks.
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <Link
              href="https://github.com/EnotriumSyndicate/Jarvus"
              className="bg-purple-500 text-white px-7 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </Link>
          </div>

          <div className="inline-flex items-center gap-3 bg-[#1a1d20] border border-white/12 rounded-xl px-5 py-3 font-mono text-sm text-gray-400">
            <span className="text-purple-400">$</span>
            <span className="text-gray-300">pip install jarvus</span>
            <button
              onClick={copyCommand}
              className="ml-2 text-gray-500 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function JarvusPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SurfacesSection />
        <ArchitectureSection />
        <LiveAgentFeedSection />
        <LifecycleSection />
        <MemorySection />
        <ToolsSection />
        <ResearchSection />
        <ChangelogSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
