"use client";

import { useRef, useEffect, useState, memo, useCallback } from "react";

interface TextRevealOptimizedProps {
    text: string;
    className?: string;
}

export const TextRevealOptimized = memo(function TextRevealOptimized({
    text,
    className = "",
}: TextRevealOptimizedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [revealedCount, setRevealedCount] = useState(0);
    const words = text.split(" ");

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how much of the element is visible
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = visibleBottom - visibleTop;

        // Start revealing when element enters viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
            const wordsToReveal = Math.floor(progress * words.length * 1.5);
            setRevealedCount(Math.min(words.length, wordsToReveal));
        }
    }, [words.length]);

    useEffect(() => {
        // Initial check
        handleScroll();

        // Add scroll listener with requestAnimationFrame for performance
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [handleScroll]);

    return (
        <div ref={containerRef} className={className}>
            {words.map((word, index) => (
                <span
                    key={index}
                    className="inline-block mr-[0.25em] transition-all duration-500"
                    style={{
                        opacity: index < revealedCount ? 1 : 0.15,
                        transform: index < revealedCount ? "translateY(0)" : "translateY(5px)",
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
});
