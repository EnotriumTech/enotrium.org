"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/content";
import { useState, useEffect, useCallback, useRef } from "react";

const navItems = [
  { title: "Platform", href: "/platform" },
  { title: "AIP", href: "/aip" },
  { title: "Manifesto", href: "/manifesto" },
  { title: "Forum", href: "/forum" },
  { title: "Badlands", href: "/badlands" },
];

const megaMenuColumns = [
  {
    heading: "COMPANY",
    links: [
      { label: "Mission", href: "/mission" },
      { label: "Industrial Agriculture", href: "/industrial-agriculture" },
      { label: "Food and Agriculture", href: "/food-and-agriculture" },
    ],
  },
  {
    heading: "PRODUCTS",
    links: [
      { label: "Badlands", href: "/badlands" },
      { label: "AIP", href: "/aip" },
      { label: "EnotriumAI", href: "https://www.enotriumai.org" },
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

export function Navbar({ invertLogo = false, noScrollBg = false, lightScrollBg = false, darkText = false }: { invertLogo?: boolean; noScrollBg?: boolean; lightScrollBg?: boolean; darkText?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!noScrollBg && scrolled && !megaOpen
          ? lightScrollBg
            ? "bg-white border-b border-black/10"
            : "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-background border-b border-border"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" target="_self" className="z-10">
              <div className="flex flex-row items-center">
                <Image
                  src="/logo.jpg"
                  alt={siteConfig.name}
                  width={120}
                  height={32}
                  className={`h-8 w-auto${invertLogo && !megaOpen ? " invert" : ""}`}
                  priority
                />
                <span className={`${darkText && !megaOpen ? "text-black" : "text-white"} text-4xl font-[family-name:var(--font-iceland)]`}>
                  Enotrium
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div
              className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_self"
                  className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase font-[family-name:var(--font-space-grotesk)]"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Company dropdown — far right */}
            <div className="hidden md:flex items-center justify-end">
              <button
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                className={`text-xs tracking-widest uppercase transition-colors flex items-center gap-1 font-[family-name:var(--font-space-grotesk)] ${darkText && !megaOpen ? "text-gray-500 hover:text-black" : "text-muted-foreground hover:text-foreground"}`}
              >
                Company
                {megaOpen ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex md:hidden p-2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-border py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_self"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase font-[family-name:var(--font-space-grotesk)]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-in-out ${megaOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="h-16 md:h-20" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-6 pt-6">
          <div className="grid grid-cols-4 gap-8">
            {megaMenuColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-3 font-[family-name:var(--font-space-grotesk)]">
                  {col.heading}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => {
                    const isSocialMedia = link.href.includes('x.com') || 
                                         link.href.includes('linkedin.com') || 
                                         link.href.includes('bsky.app') || 
                                         link.href.includes('medium.com') || 
                                         link.href.includes('github.com') ||
                                         link.href.includes('enotriumai.org');
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={isSocialMedia ? "_blank" : "_self"}
                          rel={isSocialMedia ? "noopener noreferrer" : undefined}
                          onClick={() => setMegaOpen(false)}
                          className="text-white text-sm font-light hover:text-neutral-400 transition-colors duration-150 font-[family-name:var(--font-space-grotesk)]"
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
        </div>
      </div>

      {/* Backdrop */}
      {megaOpen && (
        <div
          className="fixed inset-0 z-30"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onMouseEnter={closeMega}
        />
      )}
    </>
  );
}
