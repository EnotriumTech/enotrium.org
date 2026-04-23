"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

export default function EdgeAIPage() {
  return (
    <div className="min-h-screen bg-white text-black font-[family-name:var(--font-inter)]">
      <Navbar lightScrollBg invertLogo darkText lightMegaMenu />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-16 pb-24">

        {/* Page Header - Tektur hero */}
        <div className="mb-10 md:mb-16">
          <h1 className="font-[family-name:var(--font-tektur)] text-[80px] sm:text-[120px] md:text-[150px] lg:text-[180px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-[234px] tracking-tight text-black">
            <span className="block">Enotrium</span>
            <span className="block">
              Edge{" "}
              <span className="text-[0.5em] align-middle inline-block">↓</span>
            </span>
            <span className="block">AI</span>
          </h1>
        </div>

        {/* Description row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16 mb-16">
          {/* Left - Inter Regular 24 */}
          <p className="font-[family-name:var(--font-inter)] text-base md:text-lg lg:text-[24px] font-normal leading-tight tracking-tight text-black/80 max-w-[240px] shrink-0">
            Real-time,
            <br />
            Live Neural
            <br />
            Networks
          </p>

          {/* Right - Inter Medium 48 (Line Height 58) */}
          <p className="font-[family-name:var(--font-inter)] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-normal lg:leading-[48px] leading-tight tracking-tight text-black max-w-2xl">
            A living nervous system that thinks, learns, and acts on-device while flying.
          </p>
        </div>

        <div className="h-px w-full bg-black/20 mb-16" />

        {/* Opening */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-8">
            Spiking intelligence for autonomous drones
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium text-black mb-4">
            Real-time, on-device learning that thinks while it flies.
          </p>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black">
            Enotrium Edge AI is a spiking-neural-network (SNN)–powered intelligence layer for UAVs and edge systems. It replaces static, cloud-dependent models with live-thinking AI that adapts continuously during deployment — without backpropagation, without re-training, and without sacrificing latency or power.
          </p>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mt-4">
            Deployed on drones and industrial sensors, Enotrium Edge AI turns raw hyperspectral, RGB, and IoT data into autonomous decisions in austere, low-bandwidth environments.
          </p>
        </div>

        {/* Live-thinking UAVs section */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-8">
            Autonomous Machines
          </h2>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mb-6">
            Enotrium Edge AI gives UAVs a real-time nervous system:
          </p>
          <ul className="space-y-4 pl-6 list-disc">
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">
              On-device learning via local plasticity rules, not backpropagation.
            </li>
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">
              Event-driven, low-power SNNs tailored to hyperspectral payloads and UAV-class hardware.
            </li>
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">
              Dual-timescale adaptation that stabilizes long-term memory while reacting instantly to new soil conditions, atmospheric interference, or sensor drift.
            </li>
          </ul>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mt-6">
            Rather than relying on pre-trained models, Enotrium UAVs continuously adapt to changing fields and environments, enabling autonomous resampling, anomaly detection, and material-routing decisions that close the loop between percepts and production.
          </p>
        </div>

        {/* Architecture section */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-8">
            Architecture: Perception, Adaptation, Action
          </h2>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mb-8">
            Enotrium Edge AI is a three-layer system that runs directly on the edge:
          </p>

          <div className="space-y-8 pl-6">
            <div>
              <h3 className="text-xl font-bold text-black mb-3">Perception</h3>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80">
                Hyperspectral (400–2500 nm, SWIR-focused), RGB, and auxiliary sensors feed spectral-spatial cubes into a custom 3D SNN.
              </p>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80 mt-2">
                The SNN processes full wavelength stacks in real time, detecting subtle chemical signatures, contaminants, and phytoremediation patterns that conventional models miss.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">Online learning & adaptation</h3>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80">
                SNNs use local error-modulated plasticity (e.g., dual-timescale Hebbian accumulators) to update internal weights as distributions shift.
              </p>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80 mt-2">
                Models recover performance 3–10× faster than standard online baselines while maintaining deterministic, real-time latency.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">Decision & actuation</h3>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80">
                Edge-AI agents onboard the UAV generate low-latency decisions:
              </p>
              <ul className="space-y-2 pl-6 list-disc mt-2">
                <li className="text-base sm:text-lg leading-relaxed font-medium text-black/80">which sub-fields to rescan at higher resolution,</li>
                <li className="text-base sm:text-lg leading-relaxed font-medium text-black/80">when to trigger soil-remediation or bio-security alerts,</li>
                <li className="text-base sm:text-lg leading-relaxed font-medium text-black/80">how to route raw material directly to processing based on real-time spectral quality.</li>
              </ul>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80 mt-2">
                Metadata-only streams (coordinates, anomaly type, confidence) can be sent to command centers, preserving bandwidth while enabling closed-loop operations.
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mt-8">
            This architecture keeps data localized, minimizes bandwidth, and ensures deterministic latency — critical for autonomous, safety-critical UAV missions.
          </p>
        </div>

        {/* Why SNNs section */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-8">
            Architecting Enotrium
          </h2>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mb-8">
            Where traditional transformers and CNNs are static, batch-heavy, and GPU-dependent, Enotrium Edge AI SNNs are built for the edge:
          </p>

          <div className="border border-black overflow-hidden">
            <table className="w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="text-left p-4 text-sm font-bold">Aspect</th>
                  <th className="text-left p-4 text-sm font-bold">Transformers / CNNs</th>
                  <th className="text-left p-4 text-sm font-bold">Enotrium Edge AI SNNs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-black">
                  <td className="p-4 text-sm text-black font-medium">Compute paradigm</td>
                  <td className="p-4 text-sm text-black/70">Dense, batched, static inference</td>
                  <td className="p-4 text-sm text-black/70">Event-driven, streaming, on-device adaptation</td>
                </tr>
                <tr className="border-t border-black">
                  <td className="p-4 text-sm text-black font-medium">Power consumption</td>
                  <td className="p-4 text-sm text-black/70">High (often GPU-class)</td>
                  <td className="p-4 text-sm text-black/70">Orders of magnitude lower; fits UAV budgets</td>
                </tr>
                <tr className="border-t border-black">
                  <td className="p-4 text-sm text-black font-medium">Memory footprint</td>
                  <td className="p-4 text-sm text-black/70">Growing with model size</td>
                  <td className="p-4 text-sm text-black/70">Constant-memory, fixed-point SNNs</td>
                </tr>
                <tr className="border-t border-black">
                  <td className="p-4 text-sm text-black font-medium">Learning at deployment</td>
                  <td className="p-4 text-sm text-black/70">Static after deployment</td>
                  <td className="p-4 text-sm text-black/70">Continuous online learning without backprop</td>
                </tr>
                <tr className="border-t border-black">
                  <td className="p-4 text-sm text-black font-medium">Handling sensor drift</td>
                  <td className="p-4 text-sm text-black/70">Degrades with distribution shift</td>
                  <td className="p-4 text-sm text-black/70">Fast recovery via dual-timescale plasticity</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mt-8">
            Enotrium's SNNs are circuit-level, fixed-point designs that map cleanly to FPGA- and neuromorphic-class accelerators, enabling implantable, drone-mounted, and industrial-IoT deployments from the same core architecture.
          </p>
          <div className="mt-8">
            <Image
              src="/edge-ai-architecture-diagram.png"
              alt="Edge AI Architecture Diagram"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Use cases section */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-8">
            Intelligence on the Edge
          </h2>

          <div className="space-y-8">
            <div className="border-l-2 border-black pl-6">
              <h3 className="text-xl font-bold text-black mb-2">Autonomous hyperspectral UAVs</h3>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80">
                Drones fly austere routes, continuously updating soil-chemistry and contaminant maps in real time.
              </p>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80 mt-2">
                When a field's spectral signature suddenly shifts (e.g., new pesticide runoff or PFAS spill), the SNN triggers targeted resampling and routes the data to the Enotrium AIP's contracting layer, which can renegotiate offtake terms or reroute biomass to bio-remediation processing.
              </p>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80 mt-2">
                Deployed alongside partner agencies, this capability supports early warning for food and agricultural infrastructure — a sector identified by the Department of Homeland Security as critical to national security.
              </p>
            </div>

            <div className="border-l-2 border-black pl-6">
              <h3 className="text-xl font-bold text-black mb-2">Real-time anomaly detection & find-fix-track</h3>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80">
                Edge-AI SNNs detect spectral anomalies indicative of agroterrorism, microbial contamination, or engineered biological threats.
              </p>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80 mt-2">
                Metadata-only streams are sent to command centers, preserving bandwidth while enabling rapid, closed-loop decision-making.
              </p>
            </div>

            <div className="border-l-2 border-black pl-6">
              <h3 className="text-xl font-bold text-black mb-2">Predictive maintenance & system health</h3>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80">
                SNNs on UAV motors, batteries, and payload systems learn normal operating signatures and detect incipient failures.
              </p>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80 mt-2">
                Alerts queue preventive maintenance without waiting for offline model retraining, extending fleet life and reducing downtime.
              </p>
            </div>
          </div>
        </div>

        {/* From soil to sovereignty section */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-8">
            From soil to sovereignty: AI at the edge
          </h2>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mb-6">
            Enotrium Edge AI is not just a UAV-side accelerator. It is the live-thinking nervous system that connects:
          </p>
          <ul className="space-y-2 pl-6 list-disc mb-6">
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">Raw hyperspectral percepts,</li>
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">Economic incentives in the Enotrium AIP,</li>
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">And physical material flows in downstream manufacturing.</li>
          </ul>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black mb-6">
            By pushing SNN-based intelligence to the edge, Enotrium ensures:
          </p>
          <ul className="space-y-2 pl-6 list-disc mb-6">
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">Resilience against sensor drift and distribution shift,</li>
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">Autonomy in low-bandwidth or disconnected environments,</li>
            <li className="text-base sm:text-lg leading-relaxed font-medium text-black">Sovereign control over the agri-industrial supply chain — from soil to fiber, from drones to decarbonization.</li>
          </ul>
        </div>

        {/* CTA section */}
        <div className="max-w-3xl mx-auto text-center mt-24 mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-6">
            Build the next generation of live-thinking UAVs
          </h2>
          <p className="text-base sm:text-lg leading-relaxed font-medium text-black/80 mb-8 max-w-2xl mx-auto">
            Integrate Enotrium Edge AI into your drone stack and deploy spiking neural networks that adapt in real time, without cloud dependency.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-black text-white text-base sm:text-lg font-medium rounded-lg hover:bg-black/90 transition-colors"
          >
            Schedule a UAV-AI demo
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
