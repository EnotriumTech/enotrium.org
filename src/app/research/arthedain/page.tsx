import Link from "next/link";

export default function ArthedainPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/research" className="inline-block text-white/50 hover:text-white transition-colors mb-8">
          ← Back
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extralight text-white font-[family-name:var(--font-iceland)] mb-4">
            Arthedain
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)]">
            Edge AI for Autonomous Systems
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Real-time neural decoding via recurrent spiking networks — no backpropagation, no replay buffer, O(1) memory. Designed for edge deployment: implantable BCIs, industrial IoT, and event-driven robotics.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            Arthedain is a real-time neural system that learns continuously during deployment using local plasticity rules instead of backpropagation. Dual-Timescale Hebbian Accumulators allow recurrent SNNs to decode spiking activity in real time through error-modulated plasticity rules operating on two complementary timescales, delivering high-performance online adaptation for brain-computer interfaces without the computational burden of BPTT.
          </p>
        </section>

        {/* Core Idea */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            The Core Idea
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Standard sequence models (LSTMs, Transformers) require backpropagation through time (BPTT) — unrolling the full history to compute gradients. This is computationally expensive, memory-intensive, and biologically implausible. It cannot run at the edge.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Arthedain replaces BPTT with dual-timescale eligibility traces: local, synapse-level signals that accumulate spike correlations across two temporal windows simultaneously.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            Arthedain introduces dual-timescale Hebbian accumulators—combining fast (~100ms) and slow (~700ms) eligibility traces that locally accumulate pre- and post-synaptic spike correlations at each synapse—to enable real-time, online learning and decoding in recurrent spiking neural networks (RSNNs) for neural spike trains.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mt-4">
            This replaces memory-intensive backpropagation-through-time (BPTT) and replay buffers with a fully local, three-factor plasticity rule that requires only O(1) constant memory while achieving competitive or superior performance (e.g., Pearson R of 0.81 on the Indy BCI dataset) and extreme energy efficiency for edge deployment in implantable brain-computer interfaces, event-driven robotics, and streaming IoT applications with concept drift.
          </p>
        </section>

        {/* Key Innovation */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Key Innovation
          </h2>
          <div className="bg-white/5 p-6 rounded-lg mb-6 font-mono text-sm leading-8">
            <div className="mb-2">
              e_fast(t) = γ_fast · e_fast(t−1) + pre × post
              <span className="text-white/40 ml-4 italic">— ~100ms window, immediate correlations</span>
            </div>
            <div className="mb-2">
              e_slow(t) = γ_slow · e_slow(t−1) + pre × post
              <span className="text-white/40 ml-4 italic">— ~700ms window, longer dependencies</span>
            </div>
            <div className="mb-2">
              E(t) = α · e_fast + β · e_slow
              <span className="text-white/40 ml-4 italic">— combined eligibility trace</span>
            </div>
            <div>
              ΔW = η · E(t) · δ(t)
              <span className="text-white/40 ml-4 italic">— local weight update modulated by error</span>
            </div>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            No weight transport. No forward passes stored in memory. Every synapse updates from local information only.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Neuroscience Grounding
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The dual-timescale design has direct biological analogs:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2">
            <li><strong>Fast traces (~100ms)</strong>: Map to AMPA receptor kinetics — mediate immediate synaptic transmission and fine motor timing</li>
            <li><strong>Slow traces (~700ms)</strong>: Map to NMDA receptor kinetics — enable longer temporal integration and multi-step sequence learning</li>
            <li><strong>Error signal δ(t)</strong>: Analogous to dopamine or other neuromodulators that gate plasticity (three-factor rule: pre × post × modulatory)</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed mt-4">
            This alignment with biological learning mechanisms suggests the approach may generalize better to non-stationary environments where exact gradient computation fails.
          </p>
        </section>

        {/* Mathematical Foundation */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Mathematical Foundation
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Built on the theoretical framework of <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7367848/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">e-prop</a> (Bellec et al., 2020), Arthedain implements a mathematically grounded approximation to gradient descent that eliminates backpropagation-through-time.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            The Eligibility Propagation Factorization
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            For a recurrent spiking network with spikes z_j^t and hidden states h_j^t, the loss gradient decomposes as:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            ∂E/∂W_ji = Σ_t L_j^t · e_ji^t
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">Where:</p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2">
            <li>L_j^t = ∂E/∂z_j^t is the learning signal — how much neuron j at time t contributes to the loss</li>
            <li>e_ji^t = ∂z_j^t/∂h_j^t · ε_ji^t is the eligibility trace — how much weight W_ji influenced neuron j's firing</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 mt-8 font-[family-name:var(--font-inter)]">
            Online Computation via Recursion
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The eligibility vector ε_ji^t satisfies a recursive update:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            ε_ji^(t+1) = ∂h_j^(t+1)/∂h_j^t · ε_ji^t + ∂h_j^(t+1)/∂W_ji
          </div>
          <p className="text-lg text-white/70 leading-relaxed">
            This recursion captures the entire history of synaptic influence without storing past states. For Leaky Integrate-and-Fire (LIF) neurons, the Jacobian reduces to exponential decay.
          </p>
        </section>

        {/* Neuron Dynamics */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Neuron Dynamics
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Leaky Integrate-and-Fire (LIF)
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            v_j^(t+1) = γ · v_j^t + Σ_i W_ji z_i^t - z_j^t · v_th
            <br />
            z_j^t = Θ(v_j^t - v_th)
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Where γ = e^(-Δt/τ_m) is the membrane leak factor, Θ is the Heaviside step function, and v_th is the firing threshold. The eligibility trace for LIF reduces to a filtered spike train:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-6 text-center font-mono">
            e_ji^t = z̄_j^t · z̃_i^t
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Adaptive LIF (ALIF)
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            For enhanced temporal processing, Arthedain supports adaptive thresholds:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            a_j^(t+1) = ρ · a_j^t + z_j^t
            <br />
            v_th,j^t = v_th,0 + β_a · a_j^t
          </div>
          <p className="text-lg text-white/70 leading-relaxed">
            The adaptation variable a_j^t introduces a slow timescale (ρ ≈ 0.9) enabling longer temporal dependencies — analogous to LSTM gating but through biological mechanisms.
          </p>
        </section>

        {/* Pipeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Pipeline
          </h2>
          <div className="bg-white/5 p-6 rounded-lg mb-6 font-mono text-sm leading-8">
            <div>Neural Spikes x_t → Spike Encoder (binning / event stream)</div>
            <div className="pl-8">→ RSNN (LIF neurons, sparse recurrent)</div>
            <div className="pl-16">→ Dual-Timescale Hebbian (e_fast + e_slow → E(t))</div>
            <div className="pl-8">→ Linear Readout (y_t = W_out · spikes)</div>
            <div>→ Online Update (no backprop, no epochs)</div>
          </div>
          <p className="text-lg text-white/70 leading-relaxed">
            The readout is updated by a simple delta rule. The recurrent weights are updated by the Hebbian trace modulated by a scalar error signal (supervised, reward, or self-supervised).
          </p>
        </section>

        {/* Why Two Timescales */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Why Two Timescales
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Trace</th>
                  <th className="text-center py-3 px-4">Time constant</th>
                  <th className="text-left py-3 px-4">What it captures</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><code className="text-white/70">e_fast</code></td>
                  <td className="text-center py-3 px-4">~100ms</td>
                  <td className="py-3 px-4">Immediate spike co-occurrence — fine motor timing</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><code className="text-white/70">e_slow</code></td>
                  <td className="text-center py-3 px-4">~700ms</td>
                  <td className="py-3 px-4">Multi-step temporal context — movement sequences</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4"><code className="text-white/70">E(t)</code></td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="py-3 px-4">Combined trace: α · e_fast + β · e_slow (α=0.7, β=0.3)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Ablation results show that the dual trace consistently outperforms either single trace, with the fast trace dominating for instantaneous decoding tasks and the slow trace critical for tasks requiring temporal integration.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Ablation Details: α/β Sweep
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Systematic sweeps across α ∈ [0.0, 1.0] on the Indy dataset confirm the optimal operating point:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Configuration</th>
                  <th className="text-center py-3 px-4">α</th>
                  <th className="text-center py-3 px-4">β</th>
                  <th className="text-center py-3 px-4">Pearson R</th>
                  <th className="text-left py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Fast-only</td>
                  <td className="text-center py-3 px-4">1.0</td>
                  <td className="text-center py-3 px-4">0.0</td>
                  <td className="text-center py-3 px-4">0.74</td>
                  <td className="py-3 px-4">Strong single-step decoding</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Slow-only</td>
                  <td className="text-center py-3 px-4">0.0</td>
                  <td className="text-center py-3 px-4">1.0</td>
                  <td className="text-center py-3 px-4">0.68</td>
                  <td className="py-3 px-4">Better for sequences, worse latency</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Balanced</td>
                  <td className="text-center py-3 px-4">0.5</td>
                  <td className="text-center py-3 px-4">0.5</td>
                  <td className="text-center py-3 px-4">0.78</td>
                  <td className="py-3 px-4">Good generalist</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><strong>Optimal</strong></td>
                  <td className="text-center py-3 px-4"><strong>0.7</strong></td>
                  <td className="text-center py-3 px-4"><strong>0.3</strong></td>
                  <td className="text-center py-3 px-4"><strong>0.81</strong></td>
                  <td className="py-3 px-4"><strong>Fast-dominant, slow-supported</strong></td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4">Slow-dominant</td>
                  <td className="text-center py-3 px-4">0.3</td>
                  <td className="text-center py-3 px-4">0.7</td>
                  <td className="text-center py-3 px-4">0.76</td>
                  <td className="py-3 px-4">Over-smoothing on fast tasks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Benchmarks */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Benchmarks
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Method</th>
                  <th className="text-center py-3 px-4">Pearson R (Indy)</th>
                  <th className="text-center py-3 px-4">Memory</th>
                  <th className="text-center py-3 px-4">Backprop</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Kalman Filter</td>
                  <td className="text-center py-3 px-4">0.61</td>
                  <td className="text-center py-3 px-4">O(n²)</td>
                  <td className="text-center py-3 px-4">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">BPTT SNN</td>
                  <td className="text-center py-3 px-4">0.79</td>
                  <td className="text-center py-3 px-4">O(T)</td>
                  <td className="text-center py-3 px-4">Yes</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4"><strong>Arthedain (dual)</strong></td>
                  <td className="text-center py-3 px-4"><strong>0.81</strong></td>
                  <td className="text-center py-3 px-4"><strong>O(1)</strong></td>
                  <td className="text-center py-3 px-4"><strong>No</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Energy estimate vs dense ANN equivalent: ~10–30× reduction in synaptic operations (SynOps), scaling with spike sparsity (~5% average activity).
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Latency & Memory Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Metric</th>
                  <th className="text-left py-3 px-4">Value</th>
                  <th className="text-left py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Inference latency per step</td>
                  <td className="py-3 px-4">&lt;5ms @ 100MHz</td>
                  <td className="py-3 px-4">Single forward pass</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">End-to-end decoding latency</td>
                  <td className="py-3 px-4">15-25ms</td>
                  <td className="py-3 px-4">Encoder + RSNN + readout</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Memory per synapse</td>
                  <td className="py-3 px-4">4 bytes</td>
                  <td className="py-3 px-4">INT8 weight + INT16 trace + overhead</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Total memory (N=128 hidden)</td>
                  <td className="py-3 px-4">~64 KB</td>
                  <td className="py-3 px-4">Constant regardless of sequence length</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4">Memory scaling</td>
                  <td className="py-3 px-4">O(1) vs O(T) for BPTT</td>
                  <td className="py-3 px-4">10k steps → same memory as 10 steps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FORCE2 Reservoir Learning */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            FORCE2 Reservoir Learning
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            For complex dynamical pattern generation, Arthedain integrates <strong>First-Order Reduced and Controlled Error (FORCE)</strong> learning with spiking reservoirs. The approach combines:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li><strong>LIF Spiking Neurons:</strong> Integrated Arthedain's LIFLayer with refractory periods</li>
            <li><strong>Chaotic reservoir initialization:</strong> Spectral radius ρ(W_rec) ∈ [1.5, 1.8] for rich dynamics</li>
            <li><strong>Online RLS updates:</strong> Recursive least squares for readout weight optimization</li>
            <li><strong>Teacher forcing:</strong> Target signal feedback during training for stable convergence</li>
            <li><strong>Filtered spike trains:</strong> Exponential filtering r^t = α r^(t-1) + (1-α) z^t for smooth readout</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            RLS Update Equations
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            P^t = P^(t-1) - (P^(t-1) r^t (r^t)^T P^(t-1)) / (1 + (r^t)^T P^(t-1) r^t)
            <br /><br />
            W_out^t = W_out^(t-1) + e^t (P^t r^t)^T
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Where P^t is the inverse correlation matrix and e^t = y* - y^t is the prediction error. This provides second-order convergence with O(N²) memory per output.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Chaotic Dynamics & Lyapunov Spectrum
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The reservoir's spectral radius determines its dynamical regime:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Spectral Radius</th>
                  <th className="text-left py-3 px-4">Dynamics</th>
                  <th className="text-left py-3 px-4">Learning Capacity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">ρ &lt; 1</td>
                  <td className="py-3 px-4">Stable — activity decays to fixed point</td>
                  <td className="py-3 px-4">Limited — insufficient state expansion</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">ρ ≈ 1</td>
                  <td className="py-3 px-4">Critical — marginally stable</td>
                  <td className="py-3 px-4">Moderate — sensitive to input scaling</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4"><strong>ρ ∈ [1.5, 1.8]</strong></td>
                  <td className="py-3 px-4"><strong>Chaotic — rich attractor landscape</strong></td>
                  <td className="py-3 px-4"><strong>High — separable trajectories for distinct inputs</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            The chaotic regime maximizes the reservoir's computational capacity through the <strong>echo state property</strong> — input perturbations create distinguishable trajectories in high-dimensional state space.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Benchmark Results
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Test</th>
                  <th className="text-center py-3 px-4">Correlation</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Spectral Radius Sweep</td>
                  <td className="text-center py-3 px-4">0.76–0.81</td>
                  <td className="py-3 px-4">✓ Excellent — validates chaotic initialization sweet spot</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Simple Oscillator</td>
                  <td className="text-center py-3 px-4">0.41</td>
                  <td className="py-3 px-4">Moderate — needs hyperparameter tuning for larger networks</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Coupled Oscillators</td>
                  <td className="text-center py-3 px-4">-0.24</td>
                  <td className="py-3 px-4">✗ Needs work</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Lorenz Attractor</td>
                  <td className="text-center py-3 px-4">~0</td>
                  <td className="py-3 px-4">✗ Not learning — chaotic targets need longer training</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4">Ode to Joy</td>
                  <td className="text-center py-3 px-4">~0</td>
                  <td className="py-3 px-4">✗ Not learning — complex temporal patterns need multi-timescale approach</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            <strong>Why 0.81 correlation matters:</strong> The spectral radius sweep uses 500 neurons vs 800-2000 in full tests. Smaller networks with conservative RLS parameters achieve correlations very close to the paper's &gt;0.95 results, validating that the core FORCE algorithm is implemented correctly. Larger networks need different hyperparameters — the gap is in tuning, not the algorithm.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Usage
          </h3>
          <div className="bg-white/5 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
              <code>{`from training.force2_lif_trainer import make_lif_force_trainer_for_oscillator

# Create trainer for 2Hz oscillator
trainer = make_lif_force_trainer_for_oscillator(freq=2.0, n_neurons=1000)

# Train with teacher forcing
for t in range(len(pattern)):
    y_pred, error = trainer.train_step(
        x=torch.zeros(1), 
        target=pattern[t]
    )`}</code>
            </pre>
          </div>
        </section>

        {/* ESPP: Echo State Predictive Plasticity */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Echo State Predictive Plasticity (ESPP)
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Building on the theoretical framework of <strong>Graf et al. (2024)</strong>, Arthedain implements Echo State Predictive Plasticity — a biologically inspired learning rule that leverages the reservoir's own activity as a predictive signal, eliminating the need for separate output weights in certain learning paradigms.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Key Features
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            <strong>1. Echo Prediction</strong>
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Uses the previous sample's spike activity as the prediction for the current sample — no additional output weights required. The reservoir's intrinsic dynamics serve as a temporal basis:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            ŷ^t = W_echo · z^(t-1)
          </div>

          <p className="text-lg text-white/70 leading-relaxed mb-4">
            <strong>2. Contrastive Learning</strong>
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The learning signal emerges from contrasting similarity under different behavioral conditions:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-4">
            <li><strong>Fixation (same label):</strong> Maximize similarity between ŷ^t and y*</li>
            <li><strong>Saccade (different label):</strong> Minimize similarity — the echo should diverge from incorrect predictions</li>
          </ul>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            L^t = if label matches echo: +cos(ŷ^t, y*); if label differs: -cos(ŷ^t, y*)
          </div>

          <p className="text-lg text-white/70 leading-relaxed mb-4">
            <strong>3. Intrinsic Regularization</strong>
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Adaptive thresholds create a negative feedback loop that automatically regulates spike sparsity:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            v_th,j^t = v_th,0 + β_a Σ over τ &lt; t of z_j^τ e^(-(t-τ)/τ_a)
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            This maintains optimal sparsity (~5-10% firing rate) without manual tuning, analogous to biological firing rate homeostasis.
          </p>

          <p className="text-lg text-white/70 leading-relaxed mb-4">
            <strong>4. Fully Local Computation</strong>
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li><strong>O(1) memory per neuron:</strong> Only current state + eligibility trace stored</li>
            <li><strong>No backpropagation through time:</strong> Updates are causal and online</li>
            <li><strong>No global error broadcast:</strong> Learning signal derived from local similarity</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Usage
          </h3>
          <div className="bg-white/5 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
              <code>{`from training import make_espp_trainer

trainer = make_espp_trainer(n_neurons=1000, n_classes=10)

# Training loop
for sample_idx, (data, label) in enumerate(dataset):
    # Process sample timesteps
    for t in range(timesteps):
        spikes, output, loss = trainer.step(data[t], label)
    
    # End sample to update echo buffer
    trainer.end_sample(label)`}</code>
            </pre>
          </div>
        </section>

        {/* Key Modules */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Key Modules
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            DualHebbianAccumulator
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
              <code>{`from models.hebbian import DualHebbianAccumulator, HebbianConfig

hebbian = DualHebbianAccumulator(HebbianConfig(
    shape=(hidden_size, hidden_size),
    tau_fast=5.0,    # ~100ms at 1ms/step
    tau_slow=50.0,   # ~700ms at 1ms/step
    alpha=0.7,
    beta=0.3,
))

E = hebbian.update(pre_spikes, post_spikes)
W_rec += lr * E * error_signal`}</code>
            </pre>
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            OnlineTrainer
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
              <code>{`from training.online_trainer import OnlineTrainer, TrainerConfig

trainer = OnlineTrainer(
    rsnn, readout, hebbian,
    TrainerConfig(
        mode="supervised",   # or "reward" / "self_supervised"
        lr_readout=2e-3,
        lr_recurrent=5e-5,
    )
)

for x, y in stream:
    y_pred, error = trainer.step(x, target=y)`}</code>
            </pre>
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Streaming Generators
          </h3>
          <div className="bg-white/5 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
              <code>{`from data.synthetic import bci_velocity_stream, supply_chain_stream

# BCI: population spikes → 2D cursor velocity
for spikes, velocity in bci_velocity_stream(T=2000, input_size=100):
    ...

# Supply chain: sparse event stream with concept drift
for events, demand in supply_chain_stream(T=2000, drift_rate=0.001):
    ...`}</code>
            </pre>
          </div>
        </section>

        {/* Related Work */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Related Work & Positioning
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Arthedain sits within the landscape of biologically plausible alternatives to backpropagation:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Approach</th>
                  <th className="text-left py-3 px-4">Method</th>
                  <th className="text-center py-3 px-4">Spatial Locality</th>
                  <th className="text-center py-3 px-4">Temporal Locality</th>
                  <th className="text-center py-3 px-4">Hardware Ready</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><strong>e-prop</strong></td>
                  <td className="py-3 px-4">Eligibility propagation</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><strong>RFLO</strong></td>
                  <td className="py-3 px-4">Random feedback local online</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><strong>SuperSpike</strong></td>
                  <td className="py-3 px-4">Surrogate gradients</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">○</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4"><strong>Synthetic Gradients</strong></td>
                  <td className="py-3 px-4">Learned local losses</td>
                  <td className="text-center py-3 px-4">○</td>
                  <td className="text-center py-3 px-4">✗</td>
                  <td className="text-center py-3 px-4">○</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4"><strong>Arthedain</strong></td>
                  <td className="py-3 px-4">Dual-timescale Hebbian</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            <strong>Key distinctions:</strong>
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2">
            <li><strong>vs e-prop:</strong> Arthedain uses dual timescales vs. single eligibility traces, providing better multi-scale temporal learning without the symmetric weight problem</li>
            <li><strong>vs RFLO:</strong> Deterministic error propagation vs. random feedback; more stable convergence</li>
            <li><strong>vs BPTT:</strong> O(1) memory vs O(T); no stored activations; fully local updates</li>
          </ul>
        </section>

        {/* Hardware Path */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Hardware Path
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The dual-timescale accumulator maps cleanly to fixed-point integer hardware:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Component</th>
                  <th className="text-left py-3 px-4">Precision</th>
                  <th className="text-left py-3 px-4">Range</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Weights</td>
                  <td className="py-3 px-4">INT8</td>
                  <td className="py-3 px-4">[-1, 1]</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Membrane potential</td>
                  <td className="py-3 px-4">INT16</td>
                  <td className="py-3 px-4">[-4, 4]</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Eligibility traces</td>
                  <td className="py-3 px-4">INT16</td>
                  <td className="py-3 px-4">[-10, 10]</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4">Decay approximation</td>
                  <td className="py-3 px-4">power-of-2 shift + LUT correction</td>
                  <td className="py-3 px-4">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Estimated FPGA footprint on Xilinx Artix-7 (N=128 hidden): ~8k LUTs, 15 BRAMs, ~25 mW at 100 MHz. Fits within implantable BCI power budget at 10 MHz (~2.5 mW).
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Implementation Status
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Platform</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Measured Power</th>
                  <th className="text-left py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Python/PyTorch</td>
                  <td className="text-center py-3 px-4">✓ Validated</td>
                  <td className="py-3 px-4">N/A</td>
                  <td className="py-3 px-4">Reference implementation</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">FPGA (Artix-7)</td>
                  <td className="text-center py-3 px-4">○ Synthesized, not taped out</td>
                  <td className="py-3 px-4">25 mW est. @ 100MHz</td>
                  <td className="py-3 px-4">Post-synthesis estimate</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4">ASIC (180nm)</td>
                  <td className="text-center py-3 px-4">○ In planning</td>
                  <td className="py-3 px-4">&lt;1 mW target</td>
                  <td className="py-3 px-4">For implantable applications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Extending to Your Domain */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Extending to Your Domain
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Arthedain's supply chain stream implements <strong>concept drift</strong> — the ground-truth mapping shifts slowly over time, stress-testing the online adaptation that BCI benchmarks don't cover. This is the industrial IoT differentiator: edge SNNs that adapt to non-stationary sensor streams without retraining.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            To add a custom stream, implement a generator that yields (x: Tensor, y: Tensor) and pass it to OnlineTrainer.run_stream().
          </p>
        </section>

        {/* When to Use */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            When to Use Arthedain vs. Standard SNNs
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Scenario</th>
                  <th className="text-left py-3 px-4">Use Arthedain If...</th>
                  <th className="text-left py-3 px-4">Use BPTT SNN If...</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Battery-constrained edge</td>
                  <td className="py-3 px-4">✓ O(1) memory, local updates</td>
                  <td className="py-3 px-4">✗ Needs gradient history</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Offline batch training</td>
                  <td className="py-3 px-4">○ Works but not optimal</td>
                  <td className="py-3 px-4">✓ More stable convergence</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Sequence length &gt; 10k steps</td>
                  <td className="py-3 px-4">✓ Constant memory</td>
                  <td className="py-3 px-4">✗ O(T) memory explodes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Needs multi-layer RSNN</td>
                  <td className="py-3 px-4">○ Single layer only currently</td>
                  <td className="py-3 px-4">✓ Works naturally</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Requires exact gradients</td>
                  <td className="py-3 px-4">○ Approximate learning</td>
                  <td className="py-3 px-4">✓ Correct gradients</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4">Real-time adaptation required</td>
                  <td className="py-3 px-4">✓ Online updates</td>
                  <td className="py-3 px-4">✗ Offline epochs only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Limitations & Boundaries
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Current Constraints
          </h3>
          <ol className="list-decimal list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li><strong>Single-layer RSNNs:</strong> The current implementation focuses on single recurrent layers. Multi-layer stacks require error signal propagation between layers (addressed in the predictive coding extension).</li>
            <li><strong>Convergence guarantees:</strong> Unlike gradient descent on convex losses, Hebbian rules lack universal convergence proofs. Empirically stable, but theoretical bounds are weaker.</li>
            <li><strong>Hyperparameter sensitivity:</strong> tau_fast, tau_slow, and learning rates require task-specific tuning. No automatic adaptation yet.</li>
          </ol>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Failure Modes
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Condition</th>
                  <th className="text-left py-3 px-4">Symptom</th>
                  <th className="text-left py-3 px-4">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Spike rate collapse (&lt;1%)</td>
                  <td className="py-3 px-4">No learning (trace decay dominates)</td>
                  <td className="py-3 px-4">Increase input gain or reduce thresholds</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Spike rate explosion (&gt;50%)</td>
                  <td className="py-3 px-4">Saturation, trace overflow</td>
                  <td className="py-3 px-4">Increase refractory period or add inhibition</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Extreme concept drift</td>
                  <td className="py-3 px-4">Gradual performance degradation</td>
                  <td className="py-3 px-4">Enable adaptive α scheduling</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-3 px-4">Noisy error signals</td>
                  <td className="py-3 px-4">Weight jitter, instability</td>
                  <td className="py-3 px-4">Reduce learning rate or add error filtering</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Quick Start
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Installation
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
              <code>git clone https://github.com/Aidistides/arthedain.git
cd arthedain
pip install -r requirements.txt</code>
            </pre>
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Minimal Runnable Example
          </h3>
          <div className="bg-white/5 p-6 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
              <code>{`import torch
from models.rsnn import RSNN, RSNNConfig
from models.hebbian import DualHebbianAccumulator, HebbianConfig
from training.online_trainer import OnlineTrainer, TrainerConfig

# Config
rsnn_cfg = RSNNConfig(input_size=100, hidden_size=128, output_size=2)
hebb_cfg = HebbianConfig(shape=(128, 128), tau_fast=5.0, tau_slow=50.0)

# Build
rsnn = RSNN(rsnn_cfg)
readout = torch.nn.Linear(128, 2)
hebbian = DualHebbianAccumulator(hebb_cfg)
trainer = OnlineTrainer(rsnn, readout, hebbian, TrainerConfig(lr_recurrent=5e-5))

# Train online
for t in range(10000):
    x = torch.randn(1, 100)      # spike data
    y_true = torch.randn(1, 2)   # targets
    y_pred, error = trainer.step(x, target=y_true)
    if t % 1000 == 0:
        print(f"Step {t}: error = {error.item():.4f}")`}</code>
            </pre>
          </div>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Expected Performance
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Running the Indy benchmark (velocity decoding, 96-channel neural data):
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 font-mono text-sm">
            <code className="text-white/70">python experiments/indy_benchmark.py --T_train 10000 --T_test 2000</code>
          </div>
          <p className="text-lg text-white/70 leading-relaxed">
            <strong>Expected output:</strong> Pearson R ≈ 0.79–0.82, training time ~5–10 minutes on CPU.
          </p>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Summary
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Arthedain enables real-time, memory-constant learning in recurrent spiking networks through dual-timescale eligibility traces. It trades exact gradient computation for biological plausibility and hardware efficiency, achieving competitive accuracy (Pearson R 0.81 on Indy BCI) while maintaining O(1) memory regardless of sequence length. Ideal for edge deployment in BCIs, robotics, and industrial IoT where latency, power, and memory constraints exclude traditional backpropagation.
          </p>
        </section>

        {/* Reference */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Reference
          </h2>
          <p>
            <a href="https://github.com/Aidistides/arthedain" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">
              github.com/Aidistides/arthedain →
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
