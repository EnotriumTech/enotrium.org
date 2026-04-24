import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NanosystemsPage() {
  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-32">
        {/* Back Link */}
        <Link href="/" className="inline-block text-white/60 hover:text-white transition-colors mb-16 font-light">
          ← Back
        </Link>

        {/* Page Header */}
        <header className="mb-16 relative">
          <div className="flex flex-col items-start">
            <div className="flex items-end gap-4 mb-2">
              <span className="font-semibold text-sm tracking-[0.02em] text-white pb-4">
                Enotrium
              </span>
              <h1 className="font-[family-name:var(--font-tektur)] font-normal text-[60px] md:text-[80px] lg:text-[100px] leading-none">
                Nanosystems
              </h1>
            </div>
            <div className="h-px bg-white mt-2 w-full"></div>
          </div>
        </header>

        {/* Content */}
        <section className="mt-16">
          <p className="text-lg text-white/60 leading-relaxed">
            Nanosystems information coming soon.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
