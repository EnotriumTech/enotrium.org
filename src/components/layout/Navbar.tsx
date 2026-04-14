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

  // Single close timer — the only state machine we need
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track whether the pointer is inside the "safe zone":
  // the navbar trigger area (Company button) OR the dropdown panel itself.
  // We use a simple counter so re-entrant enter/leave events can't desync.
  const hoverZoneCount = useRef(0);

  const CLOSE_DELAY = 150; // ms — short enough to feel snappy, long enough to cross the seam

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Hover zone helpers ──────────────────────────────────────────────────────
  // Call onEnterZone() whenever pointer enters any part of the safe zone,
  // and onLeaveZone() whenever it leaves. The menu only closes when the
  // counter reaches 0 (i.e. the pointer has fully left every zone element).

  const onEnterZone = useCallback(() => {
    hoverZoneCount.current += 1;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const onLeaveZone = useCallback(() => {
    hoverZoneCount.current = Math.max(0, hoverZoneCount.current - 1);
    if (hoverZoneCount.current === 0) {
      closeTimer.current = setTimeout(() => {
        setMegaOpen(false);
      }, CLOSE_DELAY);
    }
  }, []);

  // ── Open on Company hover ───────────────────────────────────────────────────
  const onCompanyEnter = useCallback(() => {
    onEnterZone();
    setMegaOpen(true);
  }, [onEnterZone]);

  // ── Keyboard accessibility ──────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && megaOpen) {
        setMegaOpen(false);
        hoverZoneCount.current = 0;
        if (closeTimer.current) {
          clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [megaOpen]);

  // ── Cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

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
                    darkText && !megaOpen ? "text-black" : "text-white"
                  } text-4xl font-[family-name:var(--font-iceland)]`}
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
                  className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase font-[family-name:var(--font-space-grotesk)]"
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
                onMouseLeave={onLeaveZone}
                onFocus={() => setMegaOpen(true)}
                onBlur={() => {
                  // Only close on blur if pointer isn't in the zone
                  if (hoverZoneCount.current === 0) {
                    closeTimer.current = setTimeout(() => setMegaOpen(false), CLOSE_DELAY);
                  }
                }}
                className={`text-xs tracking-widest uppercase transition-colors flex items-center gap-1 font-[family-name:var(--font-space-grotesk)] ${
                  darkText && !megaOpen
                    ? "text-gray-500 hover:text-black"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="mega-menu"
              >
                Company
                {megaOpen ? (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v12M6 12h12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
                  className="block py-3 text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase font-[family-name:var(--font-space-grotesk)]"
                  role="menuitem"
                >
                  {item.title}
                </Link>
              ))}
              {/* Company links in mobile */}
              <div className="border-t border-border mt-2 pt-2">
                {megaMenuColumns.map((col) =>
                  col.links.map((link) => {
                    const isExternal =
                      link.href.startsWith("https://") || link.href.startsWith("http://");
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={isExternal ? "_blank" : "_self"}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className="block py-3 text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase font-[family-name:var(--font-space-grotesk)]"
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

      {/*
        ── Mega Menu Panel ──────────────────────────────────────────────────────
        IMPORTANT: This element is flush against the navbar bottom (top-16 / top-20).
        It enters the hover zone so the pointer can travel from the Company button
        straight down into the panel without the menu flickering closed.

        The seam between the navbar and the panel (any subpixel gap) is covered by
        the close delay — 150 ms is imperceptible to humans but long enough for the
        browser to fire the panel's onMouseEnter before the close timer fires.
      */}
      <div
        id="mega-menu"
        className={`fixed inset-x-0 top-16 md:top-20 z-40 transition-all duration-200 ease-out ${
          megaOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={onEnterZone}
        onMouseLeave={onLeaveZone}
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
                    const isExternal =
                      link.href.startsWith("https://") || link.href.startsWith("http://");
                    return (
                      <li key={link.label} role="none">
                        <Link
                          href={link.href}
                          target={isExternal ? "_blank" : "_self"}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          onClick={() => {
                            setMegaOpen(false);
                            hoverZoneCount.current = 0;
                            if (closeTimer.current) {
                              clearTimeout(closeTimer.current);
                              closeTimer.current = null;
                            }
                          }}
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

      {/*
        ── Backdrop ─────────────────────────────────────────────────────────────
        pointer-events-none so it never intercepts mouse events that should reach
        the dropdown or the nav. Clicking anywhere outside closes via the onClick.
      */}
      {megaOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/*
        Transparent click-away layer — sits above the backdrop but below the
        dropdown (z-35). Only captures clicks, never mouse-enter/leave events,
        so it can't accidentally close the menu during normal hover movement.
      */}
      {megaOpen && (
        <div
          className="fixed inset-0 z-35"
          style={{ zIndex: 35 }}
          onClick={() => {
            setMegaOpen(false);
            hoverZoneCount.current = 0;
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}