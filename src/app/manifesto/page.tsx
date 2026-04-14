"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteConfig } from "@/config/content";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function ManifestoPage() {
    return (
        <main className="min-h-screen">{/* Back Navigation */}
            <div className="fixed top-6 left-6 z-50">
                <Link
                    href="/"
                    target="_self"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-space-grotesk)]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            <section className="relative py-24 md:py-32">
                {/* Header */}
                <div className="py-12 md:py-16 px-4 md:px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto w-full">
                        <div className="space-y-3">
                            <div className="h-px w-full bg-foreground/30" />
                            <div className="h-px w-full bg-foreground/10" />
                        </div>
                        <ScrollReveal>
                            <div className="flex flex-col gap-6 pt-8">
                                <div className="flex items-start justify-between gap-6">
                                    <div className="space-y-3">
                                        <span className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase font-[family-name:var(--font-space-grotesk)]">
                                            {siteConfig.manifesto.date}
                                        </span>
                                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.05] text-left font-[family-name:var(--font-space-grotesk)]">
                                            {siteConfig.manifesto.title}
                                        </h1>
                                    </div>
                                    <div className="text-sm sm:text-base text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
                                        Enotrium
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                        <div className="mt-10 h-px w-full bg-foreground/30" />
                    </div>
                </div>

                {/* Full Manifesto Text */}
                <div className="px-4 md:px-6 lg:px-12 py-12 md:py-16">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {siteConfig.manifesto.paragraphs.map((paragraph, index) => (
                            <ScrollReveal key={index} delay={0.05}>
                                <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-foreground/90 font-[family-name:var(--font-space-grotesk)] whitespace-pre-line">
                                    {paragraph}
                                </p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

            </section>
            <Footer />
        </main>
    );
}
