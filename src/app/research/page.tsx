import Link from "next/link";

const researchProjects = [
  {
    title: "Arthedain — Edge AI for Autonomous Systems",
    href: "/research/arthedain",
    date: "April 2026",
  },
  {
    title: "Vegard — Autonomous Drone Fleet Coordination",
    href: "/research/vegard",
    date: "April 2026",
  },
  {
    title: "Icarus — Hyperspectral Soil Intelligence",
    href: "/research/icarus",
    date: "March 2026",
  },
  {
    title: "Questions Concerning the Future of Technology",
    href: "/research/questions-technology",
    date: "February 2026",
  },
  {
    title: "A New Mesopotamia — The Future of Farming is Autonomous",
    href: "/research/a-new-mesopotamia",
    date: "January 2026",
  },
  {
    title: "Agri Intelligence — Enotrium AIP: A Decentralized Intelligence Platform",
    href: "/research/agri-intelligence",
    date: "January 2026",
  },
  {
    title: "Free Trade Accounts — Untraceable Control Systems",
    href: "/research/orpheus",
    date: "July 2025",
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/" className="inline-block text-white/50 hover:text-white transition-colors mb-8">
          ← Back
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white font-[family-name:var(--font-iceland)] mb-4">
            Research
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-[family-name:var(--font-inter)]">
            Enotrium Labs
          </p>
        </div>

        {/* Research Projects */}
        <section>
          <ul className="space-y-6">
            {researchProjects.map((project, index) => (
              <li key={index} className="border-b border-white/10 pb-6">
                <Link
                  href={project.href}
                  className="block group"
                >
                  <h2 className="text-2xl md:text-3xl text-white font-light font-[family-name:var(--font-inter)] group-hover:text-white/70 transition-colors mb-2">
                    {project.title}
                  </h2>
                  <div className="text-sm text-white/40 font-[family-name:var(--font-inter)]">
                    {project.date}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
