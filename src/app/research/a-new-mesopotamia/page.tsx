import Link from "next/link";

export default function ANewMesopotamiaPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/research" className="inline-block text-white/50 hover:text-white transition-colors mb-8">
          ← Back
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extralight text-white font-[family-name:var(--font-iceland)] mb-4">
            A New Mesopotamia
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)]">
            The Future of Farming is Autonomous
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            EnotriumAI develops advanced AI systems that integrate neural networks with multimodal processing to enable energy-efficient, real-time intelligence across manufacturing, agriculture, and defense supply chains. Our platform pioneers AI-augmented vertical manufacturing in bio-convergent agriculture, where multimodal models—handling diverse data streams from edge sensors, event-based vision, sparse IoT feeds, and graph-enriched supply chain orchestration—facilitate low-power, on-device decision-making for precision farming, biomanufacturing, and critical materials production.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            This foundation powers automated pipelines that crawl, validate, and semantically match thousands of entities in a graph database, bridging fragmented agricultural data to unlock industrial hemp and bio-based alternatives for aerospace, nuclear, and autonomous systems.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Vision
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Ultimately, EnotriumAI drives toward world agricultural abundance by transforming subsidy-dependent monocultures into regenerative, high-viability bioeconomies—identifying optimal land shifts, connecting farmers to processors and defense needs, and fostering closed-loop systems that restore soil health, secure critical materials, and create sustainable prosperity for rural America and global food security.
          </p>
        </section>
      </div>
    </main>
  );
}
