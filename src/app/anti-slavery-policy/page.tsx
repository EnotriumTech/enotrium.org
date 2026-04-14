import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Anti-Slavery and Human Trafficking Policy",
};

export default function AntiSlaveryPolicyPage() {
  return (
    <div className="bg-black text-white min-h-screen font-[family-name:var(--font-inter)]">
      <Navbar />

      <main className="pt-32 pb-24 px-6 lg:px-16 max-w-[900px] mx-auto">
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-8">
          Anti-Slavery and Human Trafficking Policy
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Anti-Slavery and Human Trafficking Policy
        </h1>
        <p className="text-xs text-neutral-500 mb-12">
          Last updated: February 25, 2026
        </p>

        <div className="space-y-10 text-xs leading-relaxed text-neutral-300">
          <section>
            <h2 className="text-base font-bold text-white mb-4">1. Purpose</h2>
            <p className="mb-4">
              This Anti-Slavery and Human Trafficking Policy outlines Enotrium's commitment to preventing modern slavery and human trafficking in all aspects of our operations and supply chains.
            </p>
            <p>
              We are committed to conducting business ethically, with integrity, and in compliance with all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">2. Scope</h2>
            <p className="mb-2">This Policy applies to:</p>
            <ul className="space-y-2 ml-4 list-disc marker:text-neutral-500">
              <li>All employees, contractors, and officers of Enotrium</li>
              <li>All suppliers, vendors, and business partners</li>
              <li>All operations, including technology development, data acquisition, and infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">3. Our Commitment</h2>
            <p className="mb-2">Enotrium has zero tolerance for:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Forced labor</li>
              <li>Human trafficking</li>
              <li>Child labor</li>
              <li>Debt bondage</li>
              <li>Exploitative labor practices</li>
            </ul>
            <p className="mt-4 mb-2">We are committed to:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Ensuring transparency in our business and supply chains</li>
              <li>Acting ethically and with integrity</li>
              <li>Implementing effective systems to identify and mitigate risk</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">4. Risk Areas</h2>
            <p className="mb-2">As a technology and AI-focused organization, potential risk areas may include:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Hardware and infrastructure supply chains</li>
              <li>Data sourcing and third-party datasets</li>
              <li>Outsourced services and contractors</li>
              <li>International operations and partnerships</li>
            </ul>
            <p className="mt-4">
              We actively work to identify and mitigate risks in these areas.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">5. Due Diligence Processes</h2>
            <p className="mb-2">We implement reasonable due diligence measures, including:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Evaluating suppliers and partners for ethical practices</li>
              <li>Including anti-slavery provisions in contracts where appropriate</li>
              <li>Reviewing sourcing practices for compliance risks</li>
              <li>Monitoring high-risk relationships</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">6. Supplier Expectations</h2>
            <p className="mb-2">We expect all suppliers and partners to:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Comply with applicable anti-slavery and human trafficking laws</li>
              <li>Maintain fair labor practices</li>
              <li>Prohibit forced, bonded, or child labor</li>
              <li>Provide safe and lawful working conditions</li>
            </ul>
            <p className="mt-4">
              We reserve the right to terminate relationships where violations are identified.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">7. Reporting Concerns</h2>
            <p className="mb-2">All employees, contractors, and partners are encouraged to report concerns related to:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Suspected modern slavery</li>
              <li>Unethical labor practices</li>
              <li>Violations of this Policy</li>
            </ul>
            <p className="mt-4 mb-2">Reports can be made confidentially via:</p>
            <p>
              <a href="mailto:contact@enotrium.org" target="_self" className="text-white hover:text-neutral-400 transition-colors">contact@enotrium.org</a>
            </p>
            <p className="mt-4">
              We prohibit retaliation against anyone who raises concerns in good faith.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">8. Training and Awareness</h2>
            <p className="mb-2">Where appropriate, Enotrium will:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Provide awareness of modern slavery risks</li>
              <li>Ensure key personnel understand this Policy</li>
              <li>Promote ethical standards across operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">9. Compliance and Enforcement</h2>
            <p className="mb-2">Failure to comply with this Policy may result in:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Termination of employment or contracts</li>
              <li>Termination of supplier relationships</li>
              <li>Legal action where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">10. Continuous Improvement</h2>
            <p className="mb-2">We are committed to:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Reviewing and improving our policies</li>
              <li>Monitoring emerging risks</li>
              <li>Strengthening safeguards as the Company grows</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">11. Governance</h2>
            <p>
              This Policy is approved by leadership and reflects Enotrium's commitment to responsible and ethical operations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">12. Contact</h2>
            <p className="mb-2">For questions or concerns regarding this Policy:</p>
            <p>
              <a href="mailto:contact@enotrium.org" target="_self" className="text-white hover:text-neutral-400 transition-colors">contact@enotrium.org</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
