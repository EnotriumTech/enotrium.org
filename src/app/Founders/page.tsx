import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const teamMembers = [
  {
    name: "Aiden Young",
    title: "Co-Founder, Chief Executive Officer",
    links: [
      { label: "GitHub", href: "https://github.com/Aidistides" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/aiden-young-b90243398/" },
    ],
  },
  {
    name: "Wilson Smith",
    title: "Co-Founder, Lead Developer",
    links: [
      { label: "GitHub", href: "https://github.com/0mWh" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/wilson--smith/" },
    ],
  },
  {
    name: "David Shukhin",
    title: "Co-Founder, Chief Technology Officer",
    links: [
      { label: "GitHub", href: "https://github.com/davidshukhin" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/david-shukhin/" },
      { label: "X", href: "https://x.com/machin3lf" },
    ],
  },
  {
    name: "Michael Kim",
    title: "Co-Founder, AI Process Engineer",
    links: [
      { label: "GitHub", href: "https://github.com/michaelkim88" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/michael-kim-profile/" },
    ],
  },
  {
    name: "Emanuele Gaz",
    title: "Co-Founder, Chief Scientific Officer",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/emanuele-gaz-676ba8339/" },
    ],
  },
  {
    name: "Alessandro Burlando",
    title: "Founding AI Software Engineer",
    links: [
      { label: "GitHub", href: "https://github.com/burlibu" },
    ],
  },
  {
    name: "Jaydon Christen",
    title: "Full Stack AI Engineer",
    links: [
      { label: "GitHub", href: "https://github.com/Jaydon54" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jaydon-christen-681407294/" },
    ],
  },
  {
    name: "Rafael Virador",
    title: "Process Engineer",
    links: [
      { label: "GitHub", href: "https://github.com/rjmvirador" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/rafael-virador-304758290/" },
    ],
  },
];

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)]">
      <Navbar darkText />

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
                Team
              </span>
              <h1 className="font-[family-name:var(--font-tektur)] font-normal text-[60px] md:text-[80px] lg:text-[100px] leading-none">
                Enotrium
              </h1>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <span>SF</span>
              <span>DC</span>
              <span className="text-white/40">Milan</span>
            </div>
            <div className="h-px bg-white mt-2 w-full"></div>
          </div>
        </header>

        {/* Team Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 mt-16 max-w-4xl ml-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-left">
              <h3 className="text-lg font-semibold mb-1">
                {member.name}
              </h3>
              {member.title && (
                <div className="text-xs tracking-[0.02em] text-white/60 mb-3">
                  {member.title}
                </div>
              )}
              <div className="text-xs tracking-[0.05em]">
                {member.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="text-white/60 hover:text-white transition-colors mr-4"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </main>
  );
}
