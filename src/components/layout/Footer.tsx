import Image from "next/image";
import Link from "next/link";

function isExternalUrl(href: string): boolean {
  try {
    const url = new URL(href, "https://enotrium.org");
    return url.origin !== "https://enotrium.org";
  } catch {
    return false;
  }
}

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
      { label: "Solutions", href: "/solutions" },
      { label: "Industrial Agriculture", href: "/industrial-agriculture" },
      { label: "Food and Agriculture", href: "/food-and-agriculture" },
    ],
  },
  {
    heading: "PRODUCTS",
    links: [
      { label: "Badlands", href: "/badlands" },
      { label: "AIP", href: "/aip" },
      { label: "Icarus", href: "/aip/icarus" },
      { label: "EnotriumAI", href: "/enotrium-ai" },
    ],
  },
  {
    heading: "WORK WITH US",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "AI Lab", href: "https://www.enotriumai.org" },
    ],
  },
  {
    heading: "SOCIAL",
    links: [
      { label: "X", href: "https://x.com/EnotriumTech" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/enotriumsyndicate" },
      { label: "BlueSky", href: "https://bsky.app/profile/enotrium.bsky.social" },
      { label: "Medium", href: "https://medium.com/@enotrium" },
      { label: "GitHub", href: "https://github.com/EnotriumSyndicate" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white px-6 lg:px-16 pt-16 pb-10 font-[family-name:var(--font-inter)] border-t border-neutral-800">
      <div className="max-w-[1400px] mx-auto">

        {/* Logo */}
        <div className="pb-12 text-center sm:text-left">
          <Link href="/" target="_self" className="inline-flex items-center -space-x-2">
            <Image
              src="/logo.jpg"
              alt="Enotrium"
              width={240}
              height={64}
              className="h-14 w-auto"
            />
            <span className="text-white text-6xl font-[family-name:var(--font-iceland)]">
              Enotrium
            </span>
          </Link>
        </div>

        {/* Nav columns */}
        <div className="flex flex-col sm:flex-row gap-4 pb-12 text-center sm:text-left">
          {footerColumns.map((col) => (
            <div key={col.heading} className="flex-1">
              <p className="text-[10px] text-neutral-500 uppercase mb-4">
                {col.heading}
              </p>
              <ul className="space-y-1">
                {col.links.map((link) => {
                  const isSocialMedia = isExternalUrl(link.href);
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={isSocialMedia ? "_blank" : "_self"}
                        rel={isSocialMedia ? "noopener noreferrer" : undefined}
                        className="text-sm text-white hover:text-neutral-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row sm:justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="text-[10px] text-white uppercase mb-1">
              Copyright &copy; {new Date().getFullYear()} Enotrium Syndicate
            </p>
            <p className="text-[10px] text-neutral-500 uppercase mb-4">
              All Rights Reserved
            </p>
            <ul className="space-y-0 leading-none">
              <li className="leading-none">
                <Link href="/privacy-policy" target="_self" className="text-xs text-neutral-500 hover:text-white transition-colors inline leading-none">
                  Privacy Policy
                </Link>
              </li>
              <li className="leading-none">
                <Link href="/terms-of-use" target="_self" className="text-xs text-neutral-500 hover:text-white transition-colors inline leading-none">
                  Terms Of Use
                </Link>
              </li>
              <li className="leading-none">
                <Link href="/anti-slavery-policy" target="_self" className="text-xs text-neutral-500 hover:text-white transition-colors inline leading-none">
                  Modern Anti-Slavery Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
