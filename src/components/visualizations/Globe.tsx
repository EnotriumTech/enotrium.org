"use client";

import { useEffect, useRef, useState, memo } from "react";
import createGlobe from "cobe";

export const Globe = memo(function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const [ready, setReady] = useState(false);

  // Wait until the canvas is in the DOM and has a measurable size before
  // attempting to create the WebGL globe.  Safari in particular can report
  // offsetWidth === 0 on the very first render pass, which causes cobe to
  // create a 0×0 context and the canvas stays white.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    // Fast-path: already has dimensions
    if (el.offsetWidth > 0) {
      setReady(true);
      return;
    }

    // Poll until the element has a real size (Safari sometimes needs a frame)
    let frame: number;
    const check = () => {
      if (el.offsetWidth > 0) {
        setReady(true);
      } else {
        frame = requestAnimationFrame(check);
      }
    };
    frame = requestAnimationFrame(check);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready || !canvasRef.current) return;

    let phi = 0;
    let width = 0;
    let frame = 0;
    let isVisible = !document.hidden;
    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    // Modern iPads report as "Macintosh" — detect via touch support
    const isIPad =
      /iPad/i.test(ua) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    const isSafari =
      /Safari/i.test(ua) && !/Chrome|Chromium|CriOS/i.test(ua);
    // Cap pixel ratio on mobile / tablet to keep WebGL buffer manageable
    const maxPixelRatio = isAndroid ? 1 : isIPad ? 1.5 : 2;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    const onVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);
    onResize();

    // Cleanup previous globe instance
    if (globeRef.current) {
      globeRef.current.destroy();
    }

    // Safari WebGL fix: explicitly set canvas width/height attributes so the
    // WebGL drawing buffer is correctly sized.  Without this Safari can create
    // a 0×0 or 300×150 default drawing buffer, causing a white canvas.
    const canvas = canvasRef.current;
    const drawW = Math.round(width * pixelRatio);
    canvas.width = drawW;
    canvas.height = drawW;

    try {
      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: pixelRatio,
        width: width * pixelRatio,
        height: width * pixelRatio,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.5,
        mapSamples: isAndroid ? 4000 : isIPad ? 6000 : 8000,
        mapBrightness: 4,
        baseColor: [0.1, 0.1, 0.12],
        markerColor: [0.4, 0.4, 1],
        glowColor: [0.05, 0.05, 0.1],
        markers: [],
        onRender: (state) => {
          frame += 1;
          if (!isVisible) return;
          state.phi = phi;
          phi += (isAndroid || isIPad) ? 0.002 : 0.003;
          state.width = width * pixelRatio;
          state.height = width * pixelRatio;
        },
      });
    } catch {
      globeRef.current = null;
    }

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ready]);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: 700,
        aspectRatio: "1",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          display: "block", // prevent inline gaps in Safari
        }}
      />
    </div>
  );
});

export default Globe;
