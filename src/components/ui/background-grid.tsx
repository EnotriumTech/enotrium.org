"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";

export const BackgroundGrid = memo(function BackgroundGrid() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [interactiveEnabled, setInteractiveEnabled] = useState(true);
    const rafRef = useRef<number | null>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Throttle updates using RAF
        if (rafRef.current !== null) return;

        rafRef.current = requestAnimationFrame(() => {
            setMousePos({ x: e.clientX, y: e.clientY });
            rafRef.current = null;
        });
    }, []);

    useEffect(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const coarsePointer = window.matchMedia("(pointer: coarse)");

        const update = () => {
            setInteractiveEnabled(!(motionQuery.matches || coarsePointer.matches));
        };

        update();

        if (motionQuery.addEventListener) {
            motionQuery.addEventListener("change", update);
            coarsePointer.addEventListener("change", update);
        } else {
            motionQuery.addListener(update);
            coarsePointer.addListener(update);
        }

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            if (motionQuery.removeEventListener) {
                motionQuery.removeEventListener("change", update);
                coarsePointer.removeEventListener("change", update);
            } else {
                motionQuery.removeListener(update);
                coarsePointer.removeListener(update);
            }
        };
    }, [handleMouseMove]);

    return (
        <>
            {/* Base dot grid - always visible */}
            <div
                className="fixed inset-0 pointer-events-none background-grid"
                style={{
                    zIndex: 0,
                    backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 24px', // Slightly larger grid = fewer dots to render
                    opacity: 0.06,
                }}
                aria-hidden="true"
            />

            {/* Interactive dot grid - follows mouse */}
            {interactiveEnabled && (
                <div
                    className="fixed inset-0 pointer-events-none background-grid background-grid-mask"
                    style={{
                        zIndex: 0,
                        backgroundImage: 'radial-gradient(circle at center, currentColor 1.5px, transparent 1.5px)',
                        backgroundSize: '24px 24px',
                        opacity: 0.2,
                        maskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                        willChange: 'mask-image',
                    }}
                    aria-hidden="true"
                />
            )}
        </>
    );
});
