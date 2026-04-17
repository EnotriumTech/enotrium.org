"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InteractiveUSMap } from "@/components/visualizations/InteractiveUSMap";
import { siteConfig } from "@/config/content";

export function InvectiveSection() {
    return (
        <section id="invective" className="relative py-16 md:py-24">

            <div className="px-4 md:px-6 lg:px-12 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <Link 
                            href="/invective"
                            target="_self"
                            className="block group"
                        >
                            {/* Invective Card */}
                            <div className="relative bg-black border border-foreground/20 overflow-hidden transition-all duration-300 hover:border-foreground/40">
                                <div className="px-6 pt-6 md:px-8 md:pt-8">
                                    <div className="space-y-2">
                                        <div className="h-px w-full bg-foreground/30" />
                                        <div className="h-px w-full bg-foreground/10" />
                                    </div>
                                </div>
                                {/* Enotrium Logo - Top Right */}
                                <div className="absolute top-10 right-6 md:top-12 md:right-8 flex items-center gap-2 z-10">
                                    <div className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0">
                                        <img 
                                            src="/logo.png" 
                                            alt="Enotrium" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="text-sm md:text-base font-light tracking-wider font-[family-name:var(--font-space-grotesk)]">
                                        Enotrium
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="px-6 py-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
                                    {/* Title */}
                                    <div className="mb-10 md:mb-14 pt-6 md:pt-8">
                                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-tight font-[family-name:var(--font-space-grotesk)]">
                                            <span className="block text-white">The Agrarian</span>
                                            <span className="block text-white">Republic-</span>
                                            <span className="block bg-gradient-to-b from-white via-white/70 to-white/10 bg-clip-text text-transparent">
                                                An Invective
                                            </span>
                                        </h2>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-emerald-500/60 mb-8 md:mb-12" />

                                    {/* Footer Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                        {/* Click to Read */}
                                        <div>
                                            <p className="text-base md:text-lg lg:text-xl text-foreground group-hover:text-foreground transition-colors font-[family-name:var(--font-space-grotesk)]">
                                                Click to<br />Read
                                            </p>
                                        </div>

                                        {/* Author */}
                                        <div>
                                            <p className="text-base md:text-lg lg:text-xl text-foreground/80 font-[family-name:var(--font-space-grotesk)]">
                                                Enotrium's Founders
                                            </p>
                                        </div>

                                        {/* Published Date */}
                                        <div>
                                            <p className="text-base md:text-lg lg:text-xl text-foreground/80 font-[family-name:var(--font-space-grotesk)]">
                                                Published<br />
                                                <span className="text-foreground/60">{siteConfig.invective.date}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </ScrollReveal>
                </div>
            </div>

            {/* Map Label */}
            <div className="px-4 md:px-6 lg:px-12 pt-5 pb-0 md:pt-40 lg:pt-52">
                <p className="text-left text-xl md:text-2xl lg:text-3xl text-foreground/50 font-[family-name:var(--font-tektur)]">
                    Autonomous Supply Chain coordination<br />
                    for our Civilization&apos;s Agri-Industrial Base
                </p>
            </div>

            {/* Interactive USA Map */}
            <div className="px-0 md:px-6 lg:px-12 pt-2 pb-8 md:pt-4 md:py-12">
                <div className="w-full max-w-none">
                    <ScrollReveal delay={0.1} width="100%">
                        <InteractiveUSMap />
                    </ScrollReveal>
                </div>
            </div>

            {/* Footer Divider */}
            <div className="flex items-center justify-center py-8 md:py-12">
                <ScrollReveal delay={0.2}>
                    <div className="h-px w-48 bg-gradient-to-r from-transparent via-border to-transparent" />
                </ScrollReveal>
            </div>
        </section>
    );
}
