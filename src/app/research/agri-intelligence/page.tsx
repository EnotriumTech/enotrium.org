import Link from "next/link";

export default function AgriIntelligencePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/research" className="inline-block text-white/50 hover:text-white transition-colors mb-8">
          ← Back
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extralight text-white font-[family-name:var(--font-iceland)] mb-4">
            Agri Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)]">
            Enotrium AIP: A Decentralized Intelligence Platform for Agricultural and Industrial Supply Chains
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The Enotrium AIP (Agricultural Intelligence Platform) is a secure, blockchain-based intelligence application and network designed for operators in the agriculture and industrial sectors. Its primary objective is to enable farmers to contract and supply high-value industrial-use fiber crops directly to American manufacturers, including defense contractors, drone manufacturers, textile producers, and construction companies.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            By integrating agricultural production with strategic U.S. industrial sectors, Enotrium AIP seeks to shift farm-level economics from low-margin commodity markets toward higher-value industrial supply chains, thereby increasing operational margins and strengthening rural economic resilience.
          </p>
        </section>

        {/* Core Functionality */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Core Functionality
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Farmers establish multi-year supply contracts with industrial manufacturers for specific fiber crops at a fixed price per acre. Contract pricing is derived from the wholesale industrial value of the end product rather than traditional spot commodity markets.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            The Enotrium AIP platform provides a real-time market data feed displaying both conventional agricultural commodity prices (such as corn and soy) and the valuation of advanced bio-composite materials used in high-tech industrial applications.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            With thousands of farms and all major industrial grain and fiber manufacturers already participating on the Enotrium chain, the platform creates a liquid, permissioned marketplace that facilitates discovery, valuation transparency, and optimized supply chain coordination between producers and industrial buyers.
          </p>
        </section>

        {/* Design Principles */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Design Principles
          </h2>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-3">
            <li><strong>Privacy-Preserving Verification:</strong> Zero-knowledge cryptographic proofs enable verifiable transparency without exposing private property rights or sensitive operational data.</li>
            <li><strong>Decentralized Autonomy:</strong> The architecture empowers farmers, consumers, and industrial operators to maintain sovereign control over their supply chains, independent of centralized governmental or monopolistic intermediaries.</li>
            <li><strong>Open-Source Science:</strong> The system prioritizes the transparent dissemination of verifiable data regarding crop valuation, farmland quality, water resource metrics, and supply chain provenance.</li>
          </ul>
        </section>

        {/* Standardized Encryption Framework */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Standardized Encryption Framework
          </h2>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-3">
            <li><strong>End-to-End Encryption:</strong> All user data and transactions are protected with end-to-end encryption.</li>
            <li><strong>Open Cryptographic Standards:</strong> Adoption of open, auditable cryptographic protocols prevents undue influence or manipulation by dominant industry players (e.g., Bayer, USDA).</li>
            <li><strong>No Single Point of Failure:</strong> Fully decentralized storage and verification mechanisms eliminate centralized vulnerabilities.</li>
          </ul>
        </section>

        {/* Operational Resilience */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Operational Resilience
          </h2>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-3">
            <li><strong>Distributed Ledger Technology:</strong> All proofs, credentials, and transactions are immutably recorded on a tamper-resistant distributed ledger.</li>
            <li><strong>Automated Smart Contracts:</strong> Self-executing smart contracts facilitate instant, trustless settlement and exchange between counterparties.</li>
            <li><strong>Fault Tolerance:</strong> The network maintains operational continuity even under partial node compromise, censorship, or targeted attacks through built-in redundancy.</li>
          </ul>
        </section>

        {/* Decentralized Land Identifier */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Decentralized Land Identifier (DLI)
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Enotrium AIP implements a Decentralized Land Identifier (DLI) system based on cryptographic Decentralized Identifiers (DIDs). Each landowner controls a unique, self-sovereign digital identity anchored in cryptography rather than a central authority.
          </p>

          <h3 className="text-2xl font-light text-white mb-4 font-[family-name:var(--font-inter)]">
            DLI Mechanism:
          </h3>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-3 mb-4">
            <li>Upon account creation, the user generates a secret value V.</li>
            <li>The on-chain land registry stores only the public hash H(V).</li>
            <li>For platform interaction, the user derives an application-specific identifier: H(V, app_name) where app_name denotes the context (e.g., "farmer", "land research", or "industrialist").</li>
            <li>A zero-knowledge proof is used to demonstrate that the derived ID corresponds to one of the registered public hashes without revealing the underlying mapping.</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed">
            This construction ensures each public hash maps to at most one application-specific ID per context while preserving strong unlinkability and privacy.
          </p>
        </section>

        {/* Dual-Chain Architecture */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Dual-Chain Architecture
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Enotrium AIP extends a permissioned blockchain framework with cross-chain interoperability, operating across two distinct layers:
          </p>
          <ul className="list-disc list-inside text-lg text-white/70 leading-relaxed space-y-3 mb-4">
            <li>A permissioned chain optimized for confidential supply chain operations.</li>
            <li>A permissionless chain dedicated to transparent ecological monitoring and public data.</li>
          </ul>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            This hybrid model addresses differing requirements: supply chain transactions demand strict privacy to safeguard proprietary business information, while ecological monitoring (including physical indicators of land health and environmental threats) operates in a fully open, permissionless environment.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Dedicated private channels are provisioned for organizations requiring isolated data handling. These channels restrict access exclusively to authenticated participants from approved organizations. Private data collections — supported natively via implicit collections in Hyperledger Fabric v2.0+ — enable secure storage of sensitive records such as asset inventories, land ownership details, and multi-party approvals.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            Private data is disseminated directly among authorized peers using a gossip protocol, bypassing the ordering service entirely. Only the cryptographic hash of the private data is committed to the public ledger, providing an immutable audit trail for validation without compromising confidentiality. Anchor peers must be properly configured with CORE_PEER_GOSSIP_EXTERNALENDPOINT to enable cross-organization communication.
          </p>
        </section>

        {/* User Sovereignty */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            User Sovereignty and Ownership
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            At its foundation, Enotrium AIP ensures that all data, identities, and assets generated on the platform remain under the full control of the user. Unlike centralized platforms that treat participants as data tenants subject to extraction, Enotrium AIP is engineered for true digital ownership.
          </p>
          <p className="text-lg text-white/70 leading-relaxed">
            By combining privacy-preserving cryptography, decentralized identity, and resilient ledger infrastructure, Enotrium AIP is positioning agriculture as a high-value, technologically advanced industry aligned with strategic national sectors — restoring the vision of agriculture as a foundational pillar of American economic strength.
          </p>
        </section>

        {/* Explore */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)]">
            Explore the Enotrium AIP Project
          </h2>
          <p>
            <a href="https://github.com/EnotriumSyndicate/AIP" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline">
              https://github.com/EnotriumSyndicate/AIP
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
