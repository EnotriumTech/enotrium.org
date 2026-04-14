"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/content";
import { useState, useEffect, useCallback, useRef } from "react";

function isExternalUrl(href: string): boolean {
  try {
    const url = new URL(href, "https://enotrium.org");
    return url.origin !== "https://enotrium.org";
  } catch {
    return false;
  }
}

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
    links: [{ label: "Careers", href: "/careers" }],
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

export function Navbar({
  invertLogo = false,
  noScrollBg = false,
  lightScrollBg = false,
  darkText = false,
}: {
  invertLogo?: boolean;
  noScrollBg?: boolean;
  lightScrollBg?: boolean;
  darkText?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  // clickLocked = mega menu was opened via click and stays open until scroll/click-away
  const [clickLocked, setClickLocked] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverZoneCount = useRef(0);

  const CLOSE_DELAY = 300;

  // ── Helpers ───────────────────────────────────────────────────────────────
  const closeMega = useCallback(() => {
    setMegaOpen(false);
    setClickLocked(false);
    setActiveTab(null);
    hoverZoneCount.current = 0;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      // Only auto-close if not click-locked
      if (!hoverZoneCount.current) {
        setMegaOpen((prev) => {
          // respect click-lock — don't close if locked
          return prev;
        });
      }
    }, CLOSE_DELAY);
  }, []);

  // ── Scroll handler ────────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    // Always close on scroll (even click-locked)
    if (window.scrollY > 80 && megaOpen) {
      closeMega();
    }
  }, [megaOpen, closeMega]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Zone tracking (hover intent) ──────────────────────────────────────────
  const onEnterZone = useCallback(() => {
    hoverZoneCount.current += 1;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const onLeaveZone = useCallback(() => {
    hoverZoneCount.current = Math.max(0, hoverZoneCount.current - 1);
    if (hoverZoneCount.current === 0 && !clickLocked) {
      closeTimer.current = setTimeout(() => {
        if (hoverZoneCount.current === 0 && !clickLocked) {
          setMegaOpen(false);
          setActiveTab(null);
        }
      }, CLOSE_DELAY);
    }
  }, [clickLocked]);

  // ── Nav item hover — opens mega for ANY item ───────────────────────────────
  const onNavItemEnter = useCallback(
    (tabName: string) => {
      setActiveTab(tabName);
      onEnterZone();
      setMegaOpen(true);
    },
    [onEnterZone]
  );

  const onNavItemLeave = useCallback(() => {
    setActiveTab(null);
    onLeaveZone();
  }, [onLeaveZone]);

  // ── Company button ────────────────────────────────────────────────────────
  const onCompanyEnter = useCallback(() => {
    setActiveTab("company");
    onEnterZone();
    setMegaOpen(true);
  }, [onEnterZone]);

  const onCompanyLeave = useCallback(() => {
    setActiveTab(null);
    onLeaveZone();
  }, [onLeaveZone]);

  const onCompanyClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (clickLocked && megaOpen) {
        // Toggle off
        closeMega();
      } else {
        // Lock open
        setClickLocked(true);
        setMegaOpen(true);
        setActiveTab("company");
        hoverZoneCount.current = 1; // treat as "inside zone"
      }
    },
    [clickLocked, megaOpen, closeMega]
  );

  // ── Escape key ────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && megaOpen) closeMega();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [megaOpen, closeMega]);

  // ── Cleanup timers ────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // ── Derived: should text/logo be dark? ───────────────────────────────────
  // When mega is open, always use dark-bg styling (white text on dark panel).
  // On white-bg pages (darkText=true), use dark text when mega is closed.
  const useDarkText = darkText && !megaOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          lightScrollBg
            ? "bg-white border-b border-black/10"
            : "bg-background border-b border-border md:bg-transparent md:border-transparent"
        } ${
          !lightScrollBg && !noScrollBg && !megaOpen && scrolled
            ? "md:bg-background/80 md:backdrop-blur-md md:border-border"
            : ""
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" target="_self" className="z-10" aria-label="Enotrium home">
              <div className="flex flex-row items-center">
                <Image
                  src="/logo.jpg"
                  alt=""
                  width={120}
                  height={32}
                  className={`h-8 w-auto${invertLogo && !megaOpen ? " invert" : ""}`}
                  priority
                />
                <span
                  className={`${
                    useDarkText ? "text-black" : "text-white"
                  } text-4xl font-[family-name:var(--font-iceland)] transition-colors duration-200`}
                >
                  Enotrium
                </span>
              </div>
            </Link>

            {/* Desktop Navigation — centered */}
            <div
              className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
              role="menubar"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_self"
                  role="menuitem"
                  onMouseEnter={() => onNavItemEnter(item.title.toLowerCase())}
                  onMouseLeave={onNavItemLeave}
                  className={`text-xs tracking-widest transition-colors duration-200 uppercase font-[family-name:var(--font-inter)] ${
                    useDarkText
                      ? "text-gray-500 hover:text-black"
                      : "text-muted-foreground hover:text-foreground"
                  } ${activeTab === item.title.toLowerCase() ? (useDarkText ? "text-black" : "text-foreground") : ""}`}
                  tabIndex={0}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Company trigger — far right */}
            <div className="hidden md:flex items-center justify-end">
              <button
                onMouseEnter={onCompanyEnter}
                onMouseLeave={onCompanyLeave}
                onClick={onCompanyClick}
                className={`text-xs tracking-widest uppercase transition-colors duration-200 flex items-center gap-1 font-[family-name:var(--font-inter)] ${
                  useDarkText
                    ? "text-gray-500 hover:text-black"
                    : "text-muted-foreground hover:text-foreground"
                } ${activeTab === "company" || clickLocked ? (useDarkText ? "text-black" : "text-foreground") : ""}`}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="mega-menu"
              >
                Company
                {/* Icon: shows X when click-locked, chevron otherwise */}
                {clickLocked ? (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : megaOpen ? (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            role="menu"
            aria-label="Mobile navigation"
          >
            <div className="border-t border-border py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_self"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-sm tracking-widest transition-colors uppercase font-[family-name:var(--font-inter)] ${
                    useDarkText
                      ? "text-gray-500 hover:text-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  role="menuitem"
                >
                  {item.title}
                </Link>
              ))}
              {/* Company links in mobile */}
              <div className="border-t border-border mt-2 pt-2">
                {megaMenuColumns.map((col) =>
                  col.links.map((link) => {
                    const isExternal = isExternalUrl(link.href);
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={isExternal ? "_blank" : "_self"}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`block py-3 text-sm tracking-widest transition-colors uppercase font-[family-name:var(--font-inter)] ${
                          useDarkText
                            ? "text-gray-500 hover:text-black"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        role="menuitem"
                      >
                        {link.label}
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu Panel */}
      <div
        id="mega-menu"
        onMouseEnter={onEnterZone}
        onMouseLeave={onLeaveZone}
        className={`fixed inset-x-0 top-16 md:top-20 z-40 transition-all duration-200 ease-out ${
          megaOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="menu"
        aria-label="Company menu"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {megaMenuColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-3 font-[family-name:var(--font-space-grotesk)]">
                  {col.heading}
                </p>
                <ul className="space-y-2" role="group" aria-label={col.heading}>
                  {col.links.map((link) => {
                    const isExternal = isExternalUrl(link.href);
                    return (
                      <li key={link.label} role="none">
                        <Link
                          href={link.href}
                          target={isExternal ? "_blank" : "_self"}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          onClick={closeMega}
                          className="text-white text-sm font-light hover:text-neutral-400 transition-colors duration-150 font-[family-name:var(--font-space-grotesk)] block"
                          role="menuitem"
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
          className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Click-away layer — only active when click-locked (hover doesn't need it) */}
      {megaOpen && clickLocked && (
        <div
          className="fixed inset-0 z-35"
          style={{ zIndex: 35 }}
          onClick={closeMega}
          aria-hidden="true"
        />
      )}
    </>
  );
}
