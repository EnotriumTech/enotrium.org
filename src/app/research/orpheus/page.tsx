import Link from "next/link";

export default function OrpheusPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/research" className="inline-block text-white/50 hover:text-white transition-colors mb-8">
          ← Back
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extralight text-white font-[family-name:var(--font-iceland)] mb-4">
            Enotrium
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)]">
            Untraceable Control Systems
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-white/70 leading-relaxed">
            Farmers deserve privacy and end-to-end control over supply chains and digital marketplaces while still being subject to the truth. To maintain data privacy and autonomy, Enotrium employs zero-knowledge proofs (ZKPs), which allow landowners to verify affirmative statements on land quality without outsourcing sensitive data.
          </p>
        </section>

        {/* zk-STARKs */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            zk-STARKs
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Enotrium uses a post-quantum secure cryptographic proof method called zk-STARKs (Zero-Knowledge Scalable Transparent Arguments of Knowledge). This method encodes transaction information into polynomial equations used to verify the authenticity of transactions.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            How It Works
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Proofs of authenticity take place between a prover and a verifier. The prover presents a polynomial P(x) of degree &lt; d, with a corresponding constraint equation C(x). For the polynomial to be valid, its constraint equation must evaluate to zero at all points in the trace domain H.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            For field F, H ⊆ F, let:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            Z_H(x) = product over a in H of (x - a)
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Thus, C(x) is valid if and only if it is a multiple of Z_H(x) which vanishes on H:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            for all a in H : C(a) = 0 iff exists Q(x) : C(x) = Q(x) * Z_H(x), deg(Q) = deg(C) - |H|
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The prover commits masked versions of C(x) and Q(x), and the verifier samples random points over the extended trace domain. If the polynomials satisfy the constraints at these points, the statement evaluates as true with very high confidence.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            If the polynomial is invalid, it is overwhelmingly unlikely that constraints will be satisfied on even one random point — that likelihood decreases exponentially with every random sample.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Let f, g be polynomials over the finite field F, with deg(f), deg(g) &lt; d and f ≠ g. Let h = f − g. Then the roots of h are the points where f = g. Note that h has at most d − 1 roots. So, for any finite set S ⊂ F, the number of values a ∈ S for which f(a) = g(a) is at most d − 1.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Therefore, for a random a ∈ S:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            Probability[f(a) = g(a)] ≤ (d - 1) / |S|
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            After k random samples:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-4 text-center font-mono">
            Probability[f(a) = g(a)] ≤ ((d - 1) / |S|)^k
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            As long as the domain is large and the degree is kept small, the chance of successfully cheating becomes vanishingly small after only a few random samples. The security parameter c defines how large the evaluation domain will be:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-2 text-center font-mono">
            |S| = cd, where d = deg(f)
          </div>
          <div className="bg-white/5 p-6 rounded-lg mb-2 text-center font-mono">
            Probability[f(a) = g(a)] = (d - 1) / |S| = (d - 1) / (cd) = 1/c - (d-1)/|S| ≤ 1/c
          </div>
          <div className="bg-white/5 p-6 rounded-lg mb-6 text-center font-mono">
            E.g. Let c = 100. Then Probability[f(a) = g(a)] ≤ (1/100)^k for k attempts.
          </div>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Using a high security parameter (≥100) guarantees soundness and efficiency; only a few samples from the verifier make it overwhelmingly likely that a cheater will fail the test.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Masking
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            C(x) and Q(x) are masked before commitment because committing original polynomials would allow the verifier to reconstruct transaction details. A random polynomial R(x) is added to C(x) and Q(x) at each step such that the constraints are still satisfied:
          </p>
          <div className="bg-white/5 p-6 rounded-lg mb-2 text-center font-mono">
            Let C'(x) = C(x) + R_C(x), Q'(x) = Q(x) + R_Q(x)
          </div>
          <div className="bg-white/5 p-6 rounded-lg mb-6 text-center font-mono">
            with C'(x) = Z_H(x) * Q'(x)
          </div>
          <p className="text-lg text-white/70 leading-relaxed">
            Transaction details remain obscure while constraints are still satisfied — the claim is verified without revealing private information.
          </p>
        </section>

        {/* Privacy-Preserving Blueprints */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Privacy-Preserving Blueprints
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            To address the potential limitations of pure intractability — such as hindering legitimate tracing of bad actors in supply chains — we extend this framework with privacy-preserving blueprints, a modular cryptographic tool originally proposed by Input Output Global.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Food systems often rely on outdated institutions that either lack credentialing or use anonymous website credentials. New protocols enable untraceability to protect farmers but complicate legitimate oversight: detecting unauthorized seed imports, preventing agroterrorism.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The same intractability is true for contaminators — toxifying supply chains, weed cartels, or bad farmers does not warrant privacy protections. Therefore, we implement an f-blueprint system.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            The f-Blueprint System
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Enotrium creates a new framework through functional encoding of the platform. A secure f-blueprint system allows an auditor (e.g., a DAO governance node or decentralized EPA equivalent) to publish an encoding of a function f(x, ·) for a secret input x — such as a watchlist of banned pesticides.
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-4">
            <li>A modular extension to anonymous credential systems</li>
            <li>Constructed for all functions f from fully homomorphic encryption and NIZK proof systems</li>
            <li>Compatible with VKey/Ed25519 system</li>
            <li>Flexibility for complex agricultural audits</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            This enhances the balance between user anonymity, verifiable transparency, and regulatory oversight — particularly for supply chain integrity, land ownership proofs, or detecting illicit activities.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            Integration with zk-STARKs
          </h3>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The f-blueprint system directly enhances ZKPs by allowing a third-party verifier, DAO governance node, or regulatory body to publish encoded functions for secret inputs. Users generate escrow Z from their credential attributes, verifiable by anyone, while only the auditor recovers specific outputs if needed.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The function f(x, ·) with secret input x can be encoded as part of the constraint equation C(x). The auditor publishes a public function f(x, ·) and an encrypted version of a private watchlist x called pk_A. The user produces an escrow Z using f, pk_A, and the user's private information y.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            If the user is on the private watchlist x, this will be revealed in the escrow. The computational steps producing Z from f(pk_A,y) are encoded in a zk-STARK using low-degree polynomials. Any third-party verifier can demonstrate that Z was produced honestly. The auditor can decrypt Z to attain the public function f and private list x, but not the user's private information y.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            This maintains compatibility with FHE/NIZK constructions while adding quantum resistance via STARK's hash-based transparency.
          </p>
        </section>

        {/* VKey Credentials */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            VKey Credentials
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Two types of logins are used on Enotrium:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-2 mb-4">
            <li><strong>Tracing login:</strong> For legislators, consumers — those monitoring supply chains</li>
            <li><strong>Active login:</strong> For farmers and industrialists actively engaged in supply chains</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            For farmers and industrialists, Enotrium employs VKey credentials. A digital signature scheme verifies a digital signature on a public key, ensuring truth, ownership, and non-repudiation.
          </p>
          <div className="bg-white/5 p-6 rounded-lg font-mono text-sm">
            isSigned : VKey → Ser → Sig → Type
          </div>
        </section>

        {/* Cryptographic Primitives */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Cryptographic Primitives
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Enotrium uses Ed25519 for AI model access and user interactions to ensure decentralization while creating public supply chain transparency. Fast signature verification is optimal for large data sets and performance-critical systems.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Ed25519 is the cryptographic primitive used by Cardano and Ripple. We encode privacy-preserving blueprints, a modular extension inspired by Input Output Global's work (2024), to enhance VKey/Ed25519 and zk-STARK frameworks for selective auditor oversight without compromising user privacy.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            This specification creates a secure system for interfacing with rural supply chains securely and anonymously, while still ensuring identity verification to prevent use from bad actors.
          </p>
        </section>
      </div>
    </main>
  );
}
