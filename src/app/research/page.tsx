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
    <main className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0 p-8 border-r border-gray-200">
        <div className="mb-8">
          <div className="text-2xl font-extralight text-gray-900 font-[family-name:var(--font-iceland)]">
            Enotrium
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a href="https://enotrium.org" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-gray-900 transition-colors font-[family-name:var(--font-inter)]">
            enotrium.org
          </a>
          <a href="https://github.com/EnotriumSyndicate" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-gray-900 transition-colors font-[family-name:var(--font-inter)]">
            GitHub
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-6 lg:px-16 max-w-[1400px] mx-auto py-16">
        <Link href="/" className="inline-block text-gray-500 hover:text-gray-900 transition-colors mb-8">
          ← Back
        </Link>

        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-gray-900 font-[family-name:var(--font-iceland)] mb-4">
            Research
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-[family-name:var(--font-inter)]">
            Enotrium Labs
          </p>
        </div>

        {/* Research Projects */}
        <section>
          <ul className="space-y-6">
            {researchProjects.map((project, index) => (
              <li key={index} className="border-b border-gray-200 pb-6">
                <Link
                  href={project.href}
                  className="block group"
                >
                  <h2 className="text-2xl md:text-3xl text-gray-900 font-light font-[family-name:var(--font-inter)] group-hover:text-gray-600 transition-colors mb-2">
                    {project.title}
                  </h2>
                  <div className="text-xs text-gray-300 font-serif">
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
