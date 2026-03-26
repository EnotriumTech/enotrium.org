"use client";
import React, { useRef, useEffect, useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const TextHoverEffect = memo(function TextHoverEffect({
    text,
    duration = 0,
}: {
    text: string;
    duration?: number;
}) {
    const isSafari =
        typeof navigator !== "undefined" &&
        /safari/i.test(navigator.userAgent) &&
        !/chrome|crios|chromium|android/i.test(navigator.userAgent);
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const viewBox = { width: 380, height: 120 };
    const [maskPosition, setMaskPosition] = useState({
        cx: viewBox.width / 2,
        cy: viewBox.height / 2,
    });
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handlePointerMove = useCallback(
        (e: React.PointerEvent | React.MouseEvent) => {
            setCursor({ x: e.clientX, y: e.clientY });
        },
        []
    );

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            if (svgRect.width > 0 && svgRect.height > 0) {
                const cx =
                    ((cursor.x - svgRect.left) / svgRect.width) * viewBox.width;
                const cy =
                    ((cursor.y - svgRect.top) / svgRect.height) * viewBox.height;
                setMaskPosition({ cx, cy });
            }
        }
    }, [cursor, viewBox.width, viewBox.height]);

    const isLight = mounted && resolvedTheme === "light";
    const strokeColor = isLight ? "#0a0a0a" : "#ffffff";

    const gradientColors = isLight
        ? ["#1d4ed8", "#7c3aed", "#db2777", "#ea580c", "#059669"]
        : ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

    // ----------------------------------------------------------------
    // DUAL RENDER STRATEGY (CSS-only switching, no JS detection):
    //
    //   1. HTML <h1> with -webkit-text-stroke → ALWAYS works on every
    //      browser. Shown on touch/mobile devices via CSS media query.
    //
    //   2. SVG with interactive hover gradient → Shown on devices with
    //      a mouse (desktop) via CSS media query.
    //
    // The CSS media query @media (hover: hover) and (pointer: fine)
    // targets devices with a mouse. Everything else gets the HTML.
    // No JavaScript detection = no timing issues, no hydration issues.
    // ----------------------------------------------------------------

    return (
        <div className="w-full h-full relative">
            {/* ============================================= */}
            {/* HTML VERSION — visible on touch/mobile ONLY   */}
            {/* Hidden on desktop via CSS in globals.css       */}
            {/* ============================================= */}
            <div
                className="enotrium-html-text w-full h-full flex items-center justify-center select-none"
                style={isSafari ? { display: "flex" } : undefined}
            >
                <h1
                    className="font-bold tracking-wider text-center"
                    style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: "clamp(2.5rem, 12vw, 5.5rem)",
                        color: "transparent",
                        WebkitTextStroke: `1.5px ${strokeColor}`,
                        lineHeight: 1,
                    }}
                >
                    {text}
                </h1>
            </div>

            {/* ============================================= */}
            {/* SVG VERSION — visible on desktop/mouse ONLY   */}
            {/* Hidden on mobile via CSS in globals.css        */}
            {/* ============================================= */}
            <div className="enotrium-svg-text absolute inset-0" style={isSafari ? { display: "none" } : undefined}>
                <svg
                    ref={svgRef}
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
                    xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onMouseMove={handlePointerMove}
                    onPointerMove={handlePointerMove}
                    className="select-none cursor-pointer"
                    style={{ overflow: "visible" }}
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                >
                    <defs>
                        <linearGradient
                            id="textGradient"
                            gradientUnits="userSpaceOnUse"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            {hovered && (
                                <>
                                    <stop offset="0%" stopColor={gradientColors[0]} stopOpacity="0.25" />
                                    <stop offset="25%" stopColor={gradientColors[1]} stopOpacity="0.25" />
                                    <stop offset="50%" stopColor={gradientColors[2]} stopOpacity="0.25" />
                                    <stop offset="75%" stopColor={gradientColors[3]} stopOpacity="0.25" />
                                    <stop offset="100%" stopColor={gradientColors[4]} stopOpacity="0.25" />
                                </>
                            )}
                        </linearGradient>

                        <motion.radialGradient
                            id="revealMask"
                            gradientUnits="userSpaceOnUse"
                            r="25%"
                            cx={viewBox.width / 2}
                            cy={viewBox.height / 2}
                            animate={maskPosition}
                            transition={{ duration, ease: "easeOut" }}
                        >
                            <stop offset="0%" stopColor="white" />
                            <stop offset="100%" stopColor="black" />
                        </motion.radialGradient>
                        <mask id="textMask">
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
                        </mask>
                    </defs>

                    {/* Base outline text */}
                    <motion.text
                        x="50%"
                        y="50%"
                        dy="0.35em"
                        textAnchor="middle"
                        textLength={viewBox.width - 20}
                        lengthAdjust="spacing"
                        strokeWidth="0.4"
                        stroke={strokeColor}
                        fill="none"
                        style={{
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 700,
                            fontSize: "4.5rem",
                        }}
                        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                    >
                        {text}
                    </motion.text>

                    {/* Hover glow text */}
                    <text
                        x="50%"
                        y="50%"
                        dy="0.35em"
                        textAnchor="middle"
                        textLength={viewBox.width - 20}
                        lengthAdjust="spacing"
                        strokeWidth="0.6"
                        stroke={strokeColor}
                        fill="none"
                        style={{
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 700,
                            fontSize: "4.5rem",
                            opacity: hovered ? 0.5 : 0,
                            transition: "opacity 0.3s ease",
                        }}
                    >
                        {text}
                    </text>

                    {/* Gradient reveal text – follows cursor on hover.
                        MUST be hidden when not hovered, otherwise Safari
                        leaks gradient colours through the SVG mask. */}
                    {hovered && (
                        <text
                            x="50%"
                            y="50%"
                            dy="0.35em"
                            textAnchor="middle"
                            textLength={viewBox.width - 40}
                            lengthAdjust="spacing"
                            stroke="url(#textGradient)"
                            strokeWidth="0.5"
                            strokeOpacity={0.35}
                            fill="none"
                            mask="url(#textMask)"
                            style={{
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontWeight: 700,
                                fontSize: "4.5rem",
                            }}
                        >
                            {text}
                        </text>
                    )}
                </svg>
            </div>
        </div>
    );
});
