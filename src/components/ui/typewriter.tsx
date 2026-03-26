"use client";

import { useState, useEffect, memo } from "react";

interface TypewriterProps {
    text: string;
    delay?: number;
    className?: string;
}

export const Typewriter = memo(function Typewriter({
    text,
    delay = 50,
    className = ""
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            setIsComplete(true);
        }
    }, [currentIndex, delay, text]);

    return (
        <span className={className}>
            {displayText}
            {!isComplete && (
                <span className="animate-pulse text-accent">|</span>
            )}
        </span>
    );
});
