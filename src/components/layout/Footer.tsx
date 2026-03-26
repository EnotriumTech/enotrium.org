import Image from "next/image";
import Link from "next/link";

export const EnotriumMark = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size * 1.2}
    viewBox="0 0 40 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 2 L38 12 L38 36 L20 46 L2 36 L2 12 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M20 10 L30 16 L30 32 L20 38 L10 32 L10 16 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
    <line x1="20" y1="2" x2="20" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="2" y1="12" x2="38" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="38" y1="12" x2="2" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

const footerColumns = [
  {
    heading: "COMPANY",
    links: [
      { label: "Mission", href: "/mission" },
      { label: "Industrial Agriculture", href: "/industrial-agriculture" },
      { label: "Food and Agriculture", href: "/food-and-agriculture" },
    ],
  },
  {
    heading: "WORK WITH US",
    links: [
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "SOCIAL",
    links: [
      { label: "X", href: "https://x.com/EnotriumTech" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/enotriumsyndicate" },
      { label: "BlueSky", href: "https://bsky.app/profile/enotrium.bsky.social" },
      { label: "Medium", href: "https://medium.com/@enotrium" },
      { label: "GitHub", href: "https://github.com/enotrium" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white px-6 lg:px-16 pt-16 pb-10 font-[family-name:var(--font-inter)] border-t border-neutral-800">
      <div className="max-w-[1400px] mx-auto">

        {/* Logo */}
        <div className="pb-12 text-center sm:text-left">
          <Link href="/" className="inline-flex items-center gap-0">
            <Image
              src="/logo.jpg"
              alt="Enotrium"
              width={240}
              height={64}
              className="h-20 w-auto"
            />
            <span className="text-white text-5xl font-[family-name:var(--font-iceland)]">
              Enotrium
            </span>
          </Link>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pb-12 text-center sm:text-left">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] text-neutral-500 uppercase mb-6">
                {col.heading}
              </p>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white hover:text-neutral-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row sm:justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="text-[10px] text-white uppercase mb-4">
              Copyright &copy; {new Date().getFullYear()} Enotrium
            </p>
            <ul className="space-y-1">
              {[
                "Privacy Policy",
                "Terms Of Use",
                "Modern Anti-Slavery Policy",
                "UK Defence Regulation Plan",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-neutral-500 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] text-neutral-500 uppercase mb-4">Contact</p>
            <a
              href="mailto:enotriumtech@atomicmail.io"
              className="text-white text-sm hover:text-neutral-400 transition-colors"
            >
              enotriumtech@atomicmail.io
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
