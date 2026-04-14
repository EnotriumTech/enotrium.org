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

// Hover Intent Detection System
interface Point {
  x: number;
  y: number;
}

// Calculate if mouse is moving toward the dropdown using triangle algorithm
function isMovingTowardDropdown(
  from: Point,
  to: Point,
  dropdownRect: DOMRect,
  tolerance: number = 0.5
): boolean {
  const dropdownTop = dropdownRect.top;
  const dropdownLeft = dropdownRect.left;
  const dropdownRight = dropdownRect.right;

  // Create triangle vertices
  const topLeft: Point = { x: dropdownLeft, y: dropdownTop };
  const topRight: Point = { x: dropdownRight, y: dropdownTop };

  // Check if mouse is within the extended triangle area
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  // Moving downward
  if (dy <= 0) return false;

  // Check if moving toward dropdown center
  const dropdownCenterX = (dropdownLeft + dropdownRight) / 2;
  const isMovingTowardCenter = Math.abs(to.x - dropdownCenterX) < Math.abs(from.x - dropdownCenterX);

  return isMovingTowardCenter || (to.y > from.y && to.x >= dropdownLeft - tolerance && to.x <= dropdownRight + tolerance);
}

export function Navbar({ invertLogo = false, noScrollBg = false, lightScrollBg = false, darkText = false }: { invertLogo?: boolean; noScrollBg?: boolean; lightScrollBg?: boolean; darkText?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);

  // Refs for hover intent system
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMousePos = useRef<Point>({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const isHoveringNav = useRef(false);
  const isHoveringDropdown = useRef(false);

  const CLOSE_DELAY = 250; // ms before closing
  const OPEN_DELAY = 50;   // ms before opening (minimal delay)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  }, []);

  // Open mega menu
  const openMega = useCallback((index?: number) => {
    clearTimers();
    openTimer.current = setTimeout(() => {
      setMegaOpen(true);
      setActiveNavIndex(index ?? null);
    }, OPEN_DELAY);
  }, [clearTimers]);

  // Close mega menu with delay
  const closeMega = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => {
      if (!isHoveringNav.current && !isHoveringDropdown.current) {
        setMegaOpen(false);
        setActiveNavIndex(null);
      }
    }, CLOSE_DELAY);
  }, [clearTimers]);

  // Handle mouse move for hover intent detection
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const currentPos: Point = { x: e.clientX, y: e.clientY };
    const lastPos = lastMousePos.current;

    if (megaOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const isMovingToward = isMovingTowardDropdown(lastPos, currentPos, dropdownRect);

      if (isMovingToward) {
        // User is moving toward dropdown, cancel close
        clearTimers();
      }
    }

    lastMousePos.current = currentPos;
  }, [megaOpen, clearTimers]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setMegaOpen(false);
      setActiveNavIndex(null);
    }

    if (e.key === "Tab" && megaOpen) {
      // Allow natural tab navigation within dropdown
      return;
    }

    if (e.key === "ArrowDown" && !megaOpen && activeNavIndex !== null) {
      e.preventDefault();
      openMega(activeNavIndex);
    }
  }, [megaOpen, activeNavIndex, openMega]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handle nav item hover
  const handleNavEnter = useCallback((index: number) => {
    isHoveringNav.current = true;
    setActiveNavIndex(index);
    openMega(index);
  }, [openMega]);

  const handleNavLeave = useCallback(() => {
    isHoveringNav.current = false;
    closeMega();
  }, [closeMega]);

  // Handle dropdown hover
  const handleDropdownEnter = useCallback(() => {
    isHoveringDropdown.current = true;
    clearTimers();
  }, [clearTimers]);

  const handleDropdownLeave = useCallback(() => {
    isHoveringDropdown.current = false;
    closeMega();
  }, [closeMega]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          lightScrollBg
            ? "bg-white border-b border-black/10"
            : "bg-background border-b border-border md:bg-transparent md:border-transparent"
        } ${!lightScrollBg && !noScrollBg && !megaOpen && scrolled ? "md:bg-background/80 md:backdrop-blur-md md:border-border" : ""}
        `}
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
                <span className={`${darkText && !megaOpen ? "text-black" : "text-white"} text-4xl font-[family-name:var(--font-iceland)]`}>
                  Enotrium
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered with hover intent */}
            <div
              ref={navRef}
              className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
              role="menubar"
            >
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_self"
                  role="menuitem"
                  className="text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase font-[family-name:var(--font-space-grotesk)]"
                  onMouseEnter={() => handleNavEnter(index)}
                  onMouseLeave={handleNavLeave}
                  onFocus={() => handleNavEnter(index)}
                  onBlur={handleNavLeave}
                  aria-expanded={megaOpen && activeNavIndex === index}
                  aria-haspopup="true"
                  tabIndex={0}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Company dropdown — far right with hover intent */}
            <div
              ref={megaMenuRef}
              className="hidden md:flex items-center justify-end"
              onMouseEnter={() => handleNavEnter(-1)}
              onMouseLeave={handleNavLeave}
            >
              <button
                onFocus={() => handleNavEnter(-1)}
                onBlur={handleNavLeave}
                className={`text-xs tracking-widest uppercase transition-colors flex items-center gap-1 font-[family-name:var(--font-space-grotesk)] ${darkText && !megaOpen ? "text-gray-500 hover:text-black" : "text-muted-foreground hover:text-foreground"}`}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="mega-menu"
                tabIndex={0}
              >
                Company
                {megaOpen ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button - Click to toggle */}
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

          {/* Mobile Menu - Click to toggle */}
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
            </div>
          </div>
        </div>
      </nav>

      {/* Hover Bridge - invisible area to keep menu open when moving from Company to dropdown */}
      {megaOpen && (
        <div
          className="fixed inset-x-0 top-16 md:top-20 z-40 h-8 bg-transparent"
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
          aria-hidden="true"
        />
      )}

      {/* Mega Menu Overlay - With hover intent */}
      <div
        id="mega-menu"
        ref={dropdownRef}
        className={`fixed inset-x-0 top-16 md:top-20 z-40 transition-all duration-300 ease-out ${megaOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleDropdownLeave}
        role="menu"
        aria-label="Company menu"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="h-16 md:h-20" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-6 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {megaMenuColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-3 font-[family-name:var(--font-space-grotesk)]">
                  {col.heading}
                </p>
                <ul className="space-y-2" role="group" aria-label={col.heading}>
                  {col.links.map((link) => {
                    const isSocialMedia = link.href.includes('x.com') || 
                                         link.href.includes('linkedin.com') || 
                                         link.href.includes('bsky.app') || 
                                         link.href.includes('medium.com') || 
                                         link.href.includes('github.com') ||
                                         link.href.includes('enotriumai.org');
                    return (
                      <li key={link.label} role="none">
                        <Link
                          href={link.href}
                          target={isSocialMedia ? "_blank" : "_self"}
                          rel={isSocialMedia ? "noopener noreferrer" : undefined}
                          onClick={() => {
                            setMegaOpen(false);
                            setActiveNavIndex(null);
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

      {/* Backdrop */}
      {megaOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 transition-opacity duration-300"
          onMouseEnter={closeMega}
          aria-hidden="true"
        />
      )}
    </>
  );
}
