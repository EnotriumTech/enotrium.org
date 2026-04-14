import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-black text-white min-h-screen font-[family-name:var(--font-inter)]">
      <Navbar />

      <main className="pt-32 pb-24 px-6 lg:px-16 max-w-[900px] mx-auto">
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-500 mb-8">
          Privacy Policy
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 mb-12">
          Last updated: February 25, 2026
        </p>

        <div className="space-y-10 text-xs leading-relaxed text-neutral-300">
          <section>
            <p className="mb-4">
              This Privacy Policy describes how Enotrium ("Company", "We", "Us", or "Our") collects, uses, and protects Your information when You use our Service.
            </p>
            <p>
              By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">1. Scope of This Policy</h2>
            <p className="mb-2">This Policy applies to:</p>
            <ul className="space-y-2 ml-4 list-disc marker:text-neutral-500">
              <li>https://www.enotrium.org</li>
              <li>All associated platforms, APIs, AI systems, and infrastructure</li>
              <li>Data processed through Enotrium's computational, sensing, or machine learning systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">2. Definitions</h2>
            <ul className="space-y-2 ml-4 list-disc marker:text-neutral-500">
              <li><strong className="text-white">Personal Data:</strong> Information that identifies or can identify an individual</li>
              <li><strong className="text-white">Usage Data:</strong> Automatically collected technical data</li>
              <li><strong className="text-white">AI Systems:</strong> Machine learning models, pipelines, datasets, and inference infrastructure</li>
              <li><strong className="text-white">Data Controller:</strong> Enotrium, for purposes of GDPR</li>
              <li><strong className="text-white">Service Providers:</strong> Third parties processing data on our behalf</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">3. Information We Collect</h2>

            <h3 className="text-sm font-bold text-white mb-2">A. Personal Data You Provide</h3>
            <p className="mb-2">We may collect:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Name, email, phone number</li>
              <li>Account credentials</li>
              <li>Professional and academic background (if submitted)</li>
              <li>Communications with us</li>
              <li>Application-related data (e.g., resumes, work authorization)</li>
            </ul>

            <h3 className="text-sm font-bold text-white mb-2 mt-4">B. Sensitive / Voluntary Disclosures</h3>
            <p className="mb-2">If voluntarily provided:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Demographic data (e.g., gender, ethnicity)</li>
              <li>Employment and education history</li>
            </ul>
            <p className="mt-2">We do not require sensitive personal data unless necessary.</p>

            <h3 className="text-sm font-bold text-white mb-2 mt-4">C. Usage Data (Automatically Collected)</h3>
            <p className="mb-2">Includes:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>IP address</li>
              <li>Browser and device type</li>
              <li>Pages visited and time spent</li>
              <li>Device identifiers and diagnostics</li>
            </ul>

            <h3 className="text-sm font-bold text-white mb-2 mt-4">D. Technical & AI Interaction Data</h3>
            <p className="mb-2">When You use AI-related features, we may collect:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Inputs submitted to models</li>
              <li>System outputs</li>
              <li>Interaction logs</li>
              <li>Performance and telemetry data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">4. How We Use Your Data</h2>
            <p className="mb-2">We use data to:</p>
            <ul className="space-y-2 ml-4 list-disc marker:text-neutral-500">
              <li><strong className="text-white">Core Operations:</strong> Provide and maintain the Service, authenticate users, process requests and transactions</li>
              <li><strong className="text-white">AI System Development:</strong> Improve model accuracy and robustness, debug, monitor, and optimize systems, generate aggregated insights</li>
              <li><strong className="text-white">Security & Integrity:</strong> Detect fraud, abuse, or misuse, prevent model extraction or attacks, enforce Terms and system protections</li>
              <li><strong className="text-white">Communication:</strong> Respond to inquiries, send updates or service-related notifications</li>
              <li><strong className="text-white">Legal & Business:</strong> Comply with legal obligations, support audits, mergers, or restructuring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">5. AI and Data Usage Transparency</h2>

            <h3 className="text-sm font-bold text-white mb-2">Model Training & Improvement</h3>
            <p className="mb-2">We may use:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>User inputs</li>
              <li>Interaction logs</li>
              <li>System outputs</li>
            </ul>
            <p className="mt-2">To improve AI Systems in aggregated or anonymized form.</p>

            <h3 className="text-sm font-bold text-white mb-2 mt-4">What We Do NOT Do</h3>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>We do not sell personal data</li>
              <li>We do not use identifiable personal data to train models without safeguards</li>
              <li>We do not allow third parties to train on your data without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">6. Data Sharing</h2>
            <p className="mb-2">We may share data with:</p>
            <ul className="space-y-2 ml-4 list-disc marker:text-neutral-500">
              <li><strong className="text-white">Service Providers:</strong> Hosting, analytics, infrastructure providers bound by confidentiality and data protection agreements</li>
              <li><strong className="text-white">Affiliates & Partners:</strong> Under strict contractual obligations</li>
              <li><strong className="text-white">Legal Authorities:</strong> When required by law or to protect rights and safety</li>
              <li><strong className="text-white">Business Transfers:</strong> In mergers, acquisitions, or asset sales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="mb-2">We use:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Essential cookies (site functionality)</li>
              <li>Analytics cookies (usage insights)</li>
              <li>Preference cookies (user experience)</li>
            </ul>
            <p className="mt-4">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">8. Data Retention</h2>
            <p className="mb-2">We retain data:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Only as long as necessary for stated purposes</li>
              <li>As required by law or regulation</li>
              <li>For security and system integrity</li>
            </ul>
            <p className="mt-4">
              AI-related logs may be retained longer in anonymized form.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">9. Data Security</h2>
            <p className="mb-2">We implement:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Encryption in transit and at rest (where applicable)</li>
              <li>Access controls and authentication systems</li>
              <li>Monitoring for unauthorized access or anomalies</li>
            </ul>
            <p className="mt-4">
              However, no system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">10. International Data Transfers</h2>
            <p className="mb-4">
              Your data may be processed in the United States or other jurisdictions.
            </p>
            <p className="mb-2">We ensure appropriate safeguards are in place, including:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Contractual protections</li>
              <li>Industry-standard security practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">11. Your Rights</h2>

            <h3 className="text-sm font-bold text-white mb-2">Under GDPR (EU Users)</h3>
            <p className="mb-2">You have the right to:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Access Your data</li>
              <li>Correct inaccuracies</li>
              <li>Request deletion</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>

            <h3 className="text-sm font-bold text-white mb-2 mt-4">Under CCPA (California Users)</h3>
            <p className="mb-2">You have the right to:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Know what data we collect</li>
              <li>Request deletion</li>
              <li>Opt out of data sale (we do not sell data)</li>
              <li>Non-discrimination</li>
            </ul>

            <h3 className="text-sm font-bold text-white mb-2 mt-4">To Exercise Your Rights</h3>
            <p>
              Contact: <a href="mailto:contact@enotrium.org" target="_self" className="text-white hover:text-neutral-400 transition-colors">contact@enotrium.org</a>
            </p>
            <p className="mt-2">We may verify your identity before processing requests.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">12. Sensitive Data & Restricted Use</h2>
            <p className="mb-2">You agree NOT to submit:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Classified or export-controlled data</li>
              <li>Regulated health or biometric data (unless authorized)</li>
              <li>Data you do not have rights to share</li>
            </ul>
            <p className="mt-4">
              We reserve the right to delete such data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">13. Children's Privacy</h2>
            <p>
              We do not knowingly collect data from individuals under 13. If such data is identified, it will be deleted.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">14. Third-Party Links</h2>
            <p>
              We are not responsible for third-party privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">15. Changes to This Policy</h2>
            <p className="mb-2">We may update this Privacy Policy.</p>
            <p className="mb-2">Material changes will be communicated via:</p>
            <ul className="space-y-1 ml-4 list-disc marker:text-neutral-500">
              <li>Website notice</li>
              <li>Email (if applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-4">16. Contact</h2>
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
