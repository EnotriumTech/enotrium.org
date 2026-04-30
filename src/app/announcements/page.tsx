import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const announcements = [
  {
    date: "Saturday, May 9, 2026",
    title: "Enotrium x Do Quantum Hackathon",
    description: "Join the Enotrium x DO Quantum Hackathon! Saturday, May 9 at 1:00 PM",
    link: "/quantum-hackathon",
  },
];

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)]">
      <Navbar darkText />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-32">
        {/* Back Link */}
        <Link href="/" className="inline-block text-white/60 hover:text-white transition-colors mb-16 font-light">
          ← Back
        </Link>

        {/* Page Header */}
        <header className="mb-16">
          <h1 className="font-[family-name:var(--font-tektur)] font-normal text-[60px] md:text-[80px] lg:text-[100px] leading-none mb-4">
            Announcements
          </h1>
          <div className="h-px bg-white w-full"></div>
        </header>

        {/* Announcements List */}
        <section className="space-y-12 max-w-4xl">
          {announcements.map((announcement, index) => (
            <article key={index} className="border-b border-white/20 pb-12">
              <time className="text-xs tracking-[0.05em] text-white/60 mb-2 block">
                {announcement.date}
              </time>
              {announcement.link ? (
                <Link href={announcement.link} className="block">
                  <h2 className="text-2xl font-semibold mb-3 hover:text-white/80 transition-colors">
                    {announcement.title}
                  </h2>
                </Link>
              ) : (
                <h2 className="text-2xl font-semibold mb-3">
                  {announcement.title}
                </h2>
              )}
              <p className="text-white/80 leading-relaxed">
                {announcement.description}
              </p>
            </article>
          ))}
        </section>
      </div>

      <Footer />
    </main>
  );
}
