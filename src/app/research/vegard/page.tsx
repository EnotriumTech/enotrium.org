import Link from "next/link";

export default function VegardPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/research" className="inline-block text-white/50 hover:text-white transition-colors mb-8">
          ← Back
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extralight text-white font-[family-name:var(--font-iceland)] mb-4">
            Vegard
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)]">
            Autonomous Drone Fleet Coordination
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Vegard is the autonomous systems coordination platform for the Enotrium stack — a software-defined mesh fabric that coordinates autonomous assets (UAV hyperspectral drones), fuses their sensor data into a shared operational picture, tasks platforms in real time, and routes intelligence downstream into the AIP supply chain system.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            Vegard is the control layer between physical drones in the field and the economic decisions that flow from their soil data.
          </p>
        </section>

        {/* Three-Layer Architecture */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Three-Layer Architecture
          </h2>

          <div className="space-y-6">
            {/* Layer 1 */}
            <div className="border-l-2 border-white/30 pl-6 relative">
              <div className="text-xs tracking-[0.15em] uppercase text-white/50 mb-2">Layer 1</div>
              <h3 className="text-xl font-semibold text-white mb-3">Command</h3>
              <p className="text-sm text-white/60 mb-4">Fused operational picture and tasking</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Fused Field Picture</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Mission Planner</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">AIP Bridge</span>
              </div>
              <div className="absolute left-[-5px] top-8 w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Layer 2 */}
            <div className="border-l-2 border-white/30 pl-6 relative">
              <div className="text-xs tracking-[0.15em] uppercase text-white/50 mb-2">Layer 2</div>
              <h3 className="text-xl font-semibold text-white mb-3">Fabric</h3>
              <p className="text-sm text-white/60 mb-4">State mesh and coordination services</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm px-3 py-1 bg-white/10 rounded">State Mesh</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Task Allocator</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Drift Monitor</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Attestation</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Transport Bus</span>
              </div>
              <div className="absolute left-[-5px] top-8 w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Layer 3 */}
            <div className="border-l-2 border-white/30 pl-6 relative">
              <div className="text-xs tracking-[0.15em] uppercase text-white/50 mb-2">Layer 3</div>
              <h3 className="text-xl font-semibold text-white mb-3">Node</h3>
              <p className="text-sm text-white/60 mb-4">Arthedain + Icarus Model onboard</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Node Agent</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Arthedain SNN</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">Hyperspectral CNN</span>
                <span className="text-sm px-3 py-1 bg-white/10 rounded">FPGA Runtime</span>
              </div>
              <div className="absolute left-[-5px] top-8 w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Layer 1: Command */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Layer 1: Command
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Fused Field Picture
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Materialized projection of the state mesh. The operational picture AIP and human operators consume:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li>Time-series store of all entity states (drone positions, soil prediction coverage, contamination flags)</li>
            <li>GeoJSON export: drone flight paths + soil prediction maps → compatible with AIP's Mapbox/Deck.gl frontend</li>
            <li>Streaming API: WebSocket feed for real-time map updates in AIP dashboard</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Mission Planner
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Converts AIP's farm contracting goals into concrete scan tasks:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li>Receives target field list from AIP (farms under evaluation for contracting)</li>
            <li>Generates scan priorities based on: contract value, soil uncertainty, contamination risk</li>
            <li>Publishes TaskRequest objects to task allocator</li>
            <li>Tracks mission completion: reports back to AIP when a field's scan coverage meets threshold</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            AIP Bridge
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The clean interface between Vegard and AIP. AIP should never need to know Vegard's internal architecture:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li>POSTs structured SoilPrediction payloads to AIP's <code className="text-white/50">/api/vegard/ingest</code> endpoint</li>
            <li>Translates Vegard entity model to AIP's farm pipeline schema</li>
            <li>Attaches drone attestation signature and provenance metadata</li>
            <li>Handles retry logic and delivery guarantees</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed">
            <strong>Clean boundary:</strong> AIP never imports Vegard. Vegard POSTs structured payloads to AIP's ingest endpoint. No circular coupling.
          </p>
        </section>

        {/* Layer 2: Fabric */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Layer 2: Fabric
          </h2>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            State Mesh (Gossip Protocol)
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Each node broadcasts its entity state to peers without a central broker:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li><strong>Entity model:</strong> <code className="text-white/50">entity_id, type, position, soil_prediction, drift_flag, battery, timestamp</code></li>
            <li><strong>Gossip fanout:</strong> each node relays to N peers, eventual consistency</li>
            <li><strong>Topic-based pub/sub</strong> for selective subscriptions</li>
            <li><strong>Transport:</strong> gRPC + Protobuf for drone↔node; MQTT for cloud↔AIP bridge</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Task Allocator (Auction-Based)
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Distributes scan tasks across the drone fleet without central coordination:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li>Mission planner publishes a scan request (field polygon, priority, deadline)</li>
            <li>Available drones bid based on: distance to field, battery level, current task load</li>
            <li>Lowest-cost bidder wins the task</li>
            <li>Supports preemption: higher-priority tasks can re-task a drone mid-flight</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Drift Monitor (Key Differentiator)
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The genuinely novel piece. Arthedain handles per-node drift. Vegard correlates drift <strong>spatially across nodes</strong>:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li>Each node reports its Arthedain E(t) trace and drift flag</li>
            <li>Drift monitor computes spatial correlation: if drones over the same region all show drift, the soil model needs recalibration</li>
            <li>Triggers model update request to Hyperspectral-Restruct pipeline</li>
            <li>Flags contamination anomalies: sudden correlated drift = possible new contamination event</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            This is the agricultural intelligence that neither a single Arthedain node nor generic mesh systems can produce alone.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Attestation
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Every soil prediction published to AIP is cryptographically signed by the drone node that produced it:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li>Each drone node has a deterministic identity: <code className="text-white/50">drone:region:serial</code></li>
            <li>Outputs signed with node private key (openpgp-compatible, consistent with AIP)</li>
            <li>AIP verifies signature before ingesting soil prediction</li>
            <li>Feeds into AIP's ZK proof chain for supply chain traceability</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Transport Bus
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Wraps both gRPC (drone-to-node, performance-critical) and MQTT/REST (node-to-AIP, async):
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2">
            <li><strong>gRPC + Protobuf:</strong> hardware integrations — binary, streaming, low-latency</li>
            <li><strong>REST/MQTT:</strong> async data push to AIP — familiar HTTP/JSON, compatible with AIP's FastAPI</li>
          </ul>
        </section>

        {/* Layer 3: Node */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Layer 3: Node
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            The bridge between a single drone's onboard intelligence and the Vegard fabric. This is the only module Vegard adds to the Arthedain execution environment.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Node Agent
          </h3>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-6">
            <li>Receive scan task from fabric (field coordinates, spectral resolution, altitude)</li>
            <li>Execute hyperspectral capture sequence (interface to drone flight controller)</li>
            <li>Pass spectral cube to Arthedain's spike encoder for online processing</li>
            <li>Call Hyperspectral-Restruct API with the cube → get soil prediction map</li>
            <li>Publish entity to state mesh: <code className="text-white/50">drone_id, position, soil_prediction, drift_flag, health</code></li>
            <li>Sign output with node private key (for attestation layer)</li>
            <li>Report drift signal to fabric drift monitor when E(t) deviates beyond threshold</li>
          </ul>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Spectral Bridge
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Adapter between Arthedain's SNN streaming output and the Hyperspectral-Restruct CNN API:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2">
            <li>Buffers spike stream into spectral cube frames</li>
            <li>Handles cube normalization before API call</li>
            <li>Returns structured SoilPrediction protobuf object</li>
          </ul>
        </section>

        {/* Data Model */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Data Model
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Three core message types flow through the system:
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-2">
            <strong>EntityState</strong> — Drone position, battery, soil prediction, drift score, and cryptographic signature.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-2">
            <strong>TaskRequest</strong> — Target field polygon, priority, deadline, and spectral capture config.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-2">
            <strong>SoilPrediction</strong> — Nutrient map, contamination flags, land value score, and spectral hash for provenance.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mt-4">
            All messages use gRPC/Protobuf for drone-to-node transport and JSON for AIP bridge integration.
          </p>
        </section>

        {/* Where Arthedain Fits */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Where Arthedain Fits
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            If you were building an autonomous sensor node that needed to run onboard inference — say, a UAV that must adapt its signal processing in the field without cloud connectivity or a full GPU — Arthedain is the learning substrate that runs on the edge hardware (FPGA, implantable chip). The repo includes FPGA footprint estimates for an Artix-7 at ~2.5 mW.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Vegard sits above that entirely. Vegard doesn't care how a node's internal inference works — it cares about the network topology, data links, and tasking protocol between nodes.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            <strong>So:</strong> Arthedain is a component inside an edge node; Vegard is the fabric connecting the nodes.
          </p>
        </section>

        {/* Dependency Map */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Dependency Map
          </h2>
          <div className="bg-white/5 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="text-white/70">
              {`Icarus (future hardware)
       ↓ runs on
Vegard                     ← THIS REPO
       ↓ imports
arthedain                  (pip install -e ../arthedain)
       ↓ calls API
Hyperspectral-Restruct     (running as sidecar service)
       ↓ pushes data to
AIP                        (POST /api/vegard/ingest)`}
            </pre>
          </div>
          <p className="text-lg text-white/70 leading-relaxed mt-4">
            Vegard is the only repo that imports from both arthedain and Hyperspectral-Restruct. AIP imports from neither — it only receives structured payloads from Vegard via HTTP.
          </p>
        </section>

        {/* Reference */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Reference
          </h2>
          <p>
            <a href="https://github.com/EnotriumSyndicate/Vegard" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">
              github.com/EnotriumSyndicate/Vegard →
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
