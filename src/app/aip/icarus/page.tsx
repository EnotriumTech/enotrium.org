"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  ArrowDown,
  ExternalLink,
  Eye,
  Zap,
  Cpu,
  Scan,
  Activity,
  Globe,
  Brain,
} from "lucide-react";

// ============================================
// HSI SOIL ANALYTICS DASHBOARD
// ============================================
function HSIDashboard() {
  const cubeCanvasRef = useRef<HTMLCanvasElement>(null);
  const spectralCanvasRef = useRef<HTMLCanvasElement>(null);
  const dotCanvasRef = useRef<HTMLCanvasElement>(null);
  const [feedLines, setFeedLines] = useState<Array<{ color: string; text: string }>>([]);
  const [barWidths, setBarWidths] = useState<Record<string, number>>({});
  const [coordReadout, setCoordReadout] = useState('36.8°N  37.1°E');

  // Initialize composition bars animation
  useEffect(() => {
    setTimeout(() => {
      setBarWidths({
        'b-n': 49.8,
        'b-p': 31.0,
        'b-k': 24.9,
        'b-m': 65.6,
        'b-ph': 68,
        'b-om': 35
      });
    }, 200);
  }, []);

  // Initialize spectral chart
  useEffect(() => {
    const canvas = spectralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawSpectral = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight || 60;
      canvas.width = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);

      const peaks = [0.3, 0.5, 0.4, 0.8, 0.6, 0.95, 0.4, 0.3, 0.7, 0.85, 0.6, 0.4, 0.75, 0.5];
      const colors = [
        '#e03030', '#e05020', '#c08020', '#28a040', '#28a040', '#28a040',
        '#28a040', '#28a040', '#2080c0', '#2080c0', '#e03030', '#e03030',
        '#e03030', '#e03030'
      ];
      const bw = W / peaks.length;

      peaks.forEach((p, i) => {
        const x = i * bw + bw * 0.5;
        const barH = p * (H - 8);
        ctx.fillStyle = colors[i] + '55';
        ctx.fillRect(x - 3, H - barH, 6, barH);
        ctx.beginPath();
        ctx.arc(x, H - barH - 2, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p > 0.7 ? '#28a040' : '#e03030';
        ctx.fill();
      });

      ctx.strokeStyle = '#1a2f36';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, H - 0.5);
      ctx.lineTo(W, H - 0.5);
      ctx.stroke();
    };

    drawSpectral();
    window.addEventListener('resize', drawSpectral);
    return () => window.removeEventListener('resize', drawSpectral);
  }, []);

  // Initialize hyperspectral datacube
  useEffect(() => {
    const canvas = cubeCanvasRef.current;
    if (!canvas) return;

    let animId: number;

    const initCube = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      const W = canvas.width;
      const H = canvas.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Pre-compute soil spectral signature field
      const field = new Float32Array(W * H);
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const nx = x / W;
          const ny = y / H;
          const v =
            Math.sin(nx * 12 + ny * 8) * 0.30 +
            Math.sin(nx * 5 - ny * 7 + 1.2) * 0.25 +
            Math.cos(nx * 20 * ny + 0.5) * 0.15 +
            Math.sin(nx * 3 + ny * 15) * 0.20 +
            (Math.random() - 0.5) * 0.06;
          field[y * W + x] = (v + 1) / 2;
        }
      }

      // Per-zone tint
      const zoneColor = (zx: number, zy: number) => {
        const z = zy * 3 + zx;
        if (z === 2) return [180, 20, 20];  // Zone 3 — VOC alert (red)
        if (z === 4) return [160, 100, 10];  // Zone 5 — PFAS warn (amber)
        return [10, 80, 30];                 // Healthy zones (green)
      };

      const imgData = ctx.createImageData(W, H);
      let scanY = 0;
      let t = 0;

      const render = () => {
        t += 0.008;
        const band = (Math.sin(t * 0.5) * 0.5 + 0.5);

        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const idx = (y * W + x) * 4;
            const v = field[y * W + x];
            const zx = Math.floor(x / (W / 3));
            const zy = Math.floor(y / (H / 2));
            const zc = zoneColor(zx, zy);

            const sv = Math.min(1, Math.max(0, v + band * 0.15));
            let r = 0, g = 0, b = 0;
            if (sv < 0.33) {
              const t0 = sv / 0.33;
              r = 0; g = t0 * 80; b = 20 + t0 * 60;
            } else if (sv < 0.66) {
              const t0 = (sv - 0.33) / 0.33;
              r = t0 * 60; g = 80 + t0 * 60; b = 80 - t0 * 60;
            } else {
              const t0 = (sv - 0.66) / 0.34;
              r = 60 + t0 * 140; g = 140 - t0 * 100; b = 20 - t0 * 15;
            }

            r = r * 0.6 + zc[0] * 0.08;
            g = g * 0.6 + zc[1] * 0.08;
            b = b * 0.6 + zc[2] * 0.08;

            const sd = Math.abs(y - scanY);
            if (sd < 2) {
              const pulse = 1 - sd * 0.5;
              r += pulse * 60; g += pulse * 80; b += pulse * 40;
            }

            imgData.data[idx] = Math.min(255, r);
            imgData.data[idx + 1] = Math.min(255, g);
            imgData.data[idx + 2] = Math.min(255, b);
            imgData.data[idx + 3] = 255;
          }
        }

        ctx.putImageData(imgData, 0, 0);

        ctx.strokeStyle = 'rgba(180,30,30,0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        const zW = W / 3;
        const zH = H / 2;
        for (let i = 1; i < 3; i++) {
          ctx.beginPath(); ctx.moveTo(i * zW, 0); ctx.lineTo(i * zW, H); ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(0, zH); ctx.lineTo(W, zH); ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '8px Courier New';
        ctx.fillStyle = 'rgba(200,200,200,0.5)';
        ['ZONE 1', 'ZONE 2', 'ZONE 3', 'ZONE 4', 'ZONE 5', 'ZONE 6'].forEach((lbl, i) => {
          const zx = i % 3;
          const zy = Math.floor(i / 3);
          ctx.fillText(lbl, zx * zW + 6, zy * zH + 14);
        });

        ctx.strokeStyle = 'rgba(0,200,100,0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 6]);
        ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(W, scanY); ctx.stroke();
        ctx.setLineDash([]);
        scanY = (scanY + 1.2) % H;

        const chx = W * (0.65 + Math.sin(t * 0.3) * 0.05);
        const chy = H * (0.45 + Math.cos(t * 0.4) * 0.08);
        ctx.strokeStyle = 'rgba(255,255,100,0.7)';
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(chx - 8, chy); ctx.lineTo(chx + 8, chy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(chx, chy - 8); ctx.lineTo(chx, chy + 8); ctx.stroke();
        ctx.strokeRect(chx - 12, chy - 8, 24, 16);

        ctx.fillStyle = 'rgba(255,255,100,0.8)';
        ctx.font = '7px Courier New';
        ctx.fillText(`λ=${Math.round(400 + band * 700)}nm`, chx + 14, chy - 2);
        const sampleV = field[Math.round(chy) * W + Math.round(chx)] || 0;
        ctx.fillText(`R=${sampleV.toFixed(3)}`, chx + 14, chy + 8);

        animId = requestAnimationFrame(render);
      };

      render();
    };

    initCube();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId);
      setTimeout(initCube, 100);
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', () => {});
    };
  }, []);

  // Initialize live data feed
  useEffect(() => {
    const feedData = [
      ['#3a9060', 'S001 | Method: EPA 8260D | Analyte: Ethylbenzene | Result: <0.00539 | Qualifier: U | Validation: COMPLETE'],
      ['#3a9060', 'S002 | Method: EPA 8270D | Analyte: Naphthalene | Result: 0.0112 mg/kg | Status: FLAGGED'],
      ['#d07820', 'S003 | PFAS Scan | Zone 5 | PFOA: 2.4ppt | PFOS: 1.1ppt | Action Level: EXCEEDED'],
      ['#e03030', 'S004 | VOC Screen | Zone 3 | Toluene: 18.4 mg/kg | Xylene: 12.1 mg/kg | ALERT'],
      ['#3a9060', 'S005 | Nutrient Panel | Zone 1 | N:45.2% | P:32.1% | K:28.4% | Status: OPTIMAL'],
      ['#3a9060', 'S006 | Method: EPA 8260D | Analyte: Benzene | Result: <0.00200 | RL: 0.002 | PASS'],
      ['#d07820', 'S007 | Dioxin Screen | Zone 4 | TEQ: 0.24 ng/kg | Threshold: 0.1 | ELEVATED'],
    ];
    let feedIdx = 0;

    const addFeedLine = () => {
      const [color, text] = feedData[feedIdx % feedData.length];
      setFeedLines(prev => [{ color, text }, ...prev].slice(0, 3));
      feedIdx++;
    };

    addFeedLine();
    const interval = setInterval(addFeedLine, 2400);
    return () => clearInterval(interval);
  }, []);

  // Initialize dot-cluster contamination footprint
  useEffect(() => {
    const canvas = dotCanvasRef.current;
    if (!canvas) return;

    let animId: number;

    const initDotMap = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth || 236;
      canvas.height = parent.offsetHeight || 155;
      const W = canvas.width;
      const H = canvas.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Zone definitions
      const zones: Array<{ cx: number; cy: number; rx: number; ry: number; type: string; count: number; label: string }> = [
        { cx: 0.15, cy: 0.22, rx: 0.11, ry: 0.14, type: 'clean', count: 90, label: 'Z1' },
        { cx: 0.42, cy: 0.20, rx: 0.10, ry: 0.12, type: 'clean', count: 75, label: 'Z2' },
        { cx: 0.72, cy: 0.28, rx: 0.20, ry: 0.22, type: 'voc',   count: 200, label: 'Z3' },
        { cx: 0.18, cy: 0.60, rx: 0.12, ry: 0.13, type: 'clean', count: 80, label: 'Z4' },
        { cx: 0.50, cy: 0.62, rx: 0.16, ry: 0.18, type: 'pfas',  count: 140, label: 'Z5' },
        { cx: 0.80, cy: 0.70, rx: 0.10, ry: 0.12, type: 'clean', count: 65, label: 'Z6' },
      ];

      const typeColor: Record<string, { fill: string; ring: string }> = {
        voc:   { fill: '#e03030', ring: '#ff6060' },
        pfas:  { fill: '#d07820', ring: '#ffaa40' },
        clean: { fill: '#28a048', ring: '#50d070' },
      };

      // Pre-generate dot positions per zone
      const allDots: Array<{ x: number; y: number; r: number; color: string; alpha: number; phase: number; zone: string }> = [];
      zones.forEach(z => {
        const col = typeColor[z.type];
        for (let i = 0; i < z.count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const rad   = Math.pow(Math.random(), 0.6);
          const dx    = Math.cos(angle) * rad * z.rx * W;
          const dy    = Math.sin(angle) * rad * z.ry * H;
          allDots.push({
            x:     z.cx * W + dx,
            y:     z.cy * H + dy,
            r:     0.8 + Math.random() * 1.6,
            color: col.fill,
            alpha: 0.55 + Math.random() * 0.45,
            phase: Math.random() * Math.PI * 2,
            zone:  z.label,
          });
        }
      });

      // Sample points
      const samplePts = [
        { x: 0.22 * W, y: 0.35 * H },
        { x: 0.48 * W, y: 0.18 * H },
        { x: 0.68 * W, y: 0.42 * H },
        { x: 0.55 * W, y: 0.72 * H },
        { x: 0.82 * W, y: 0.55 * H },
        { x: 0.35 * W, y: 0.80 * H },
        { x: 0.10 * W, y: 0.72 * H },
      ];

      const drawGrid = () => {
        ctx.strokeStyle = 'rgba(20,50,60,0.6)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= W; x += W / 6) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y <= H; y += H / 4) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
      };

      let pulseR = 0;
      const pulseCX = zones[2].cx * W;
      const pulseCY = zones[2].cy * H;
      let t = 0;

      const render = () => {
        t += 0.018;
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = '#04080c';
        ctx.fillRect(0, 0, W, H);

        drawGrid();

        zones.forEach(z => {
          const col = typeColor[z.type];
          ctx.beginPath();
          ctx.ellipse(z.cx * W, z.cy * H, z.rx * W, z.ry * H, 0, 0, Math.PI * 2);
          ctx.strokeStyle = col.fill + '18';
          ctx.lineWidth   = 1;
          ctx.stroke();
        });

        pulseR = (pulseR + 0.7) % 38;
        const pulseAlpha = Math.max(0, 1 - pulseR / 38) * 0.5;
        ctx.beginPath();
        ctx.arc(pulseCX, pulseCY, pulseR + 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(224,48,48,${pulseAlpha.toFixed(3)})`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        allDots.forEach(d => {
          const flicker = 0.85 + Math.sin(t * 1.4 + d.phase) * 0.15;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = d.color + Math.round(d.alpha * flicker * 255).toString(16).padStart(2, '0');
          ctx.fill();
        });

        samplePts.forEach((p, i) => {
          const pulse2 = 0.5 + Math.sin(t * 0.8 + i * 1.1) * 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200,208,32,${(0.4 + pulse2 * 0.5).toFixed(2)})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200,208,32,0.7)';
          ctx.fill();
        });

        ctx.font = '6px Courier New';
        zones.forEach(z => {
          const col = typeColor[z.type];
          ctx.fillStyle = col.ring + 'cc';
          ctx.fillText(z.label, z.cx * W - 6, z.cy * H - z.ry * H * 0.7);
        });

        const latOff = (Math.sin(t * 0.12) * 0.04).toFixed(2);
        const lonOff = (Math.cos(t * 0.09) * 0.03).toFixed(2);
        setCoordReadout(`${(36.8 + parseFloat(latOff)).toFixed(2)}°N  ${(37.1 + parseFloat(lonOff)).toFixed(2)}°E`);

        animId = requestAnimationFrame(render);
      };

      render();
    };

    initDotMap();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId);
      setTimeout(initDotMap, 120);
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div style={{
      background: '#0f1a1e',
      color: '#c8d4d8',
      fontFamily: 'Courier New, monospace',
      fontSize: '11px',
      width: '100%',
      minHeight: '820px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 260px',
      gridTemplateRows: 'auto auto auto auto',
      gap: '1px',
      border: '1px solid #1a2f36',
      padding: '10px'
    }}>
      {/* ZONE MAP */}
      <div style={{
        background: '#080c0f',
        border: '1px solid #102028',
        padding: '10px',
        position: 'relative',
        gridColumn: '1',
        gridRow: '1'
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: '#e03030',
          textTransform: 'uppercase',
          marginBottom: '8px',
          paddingBottom: '5px',
          borderBottom: '1px solid #1a2f36',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>HSI FARM OVERVIEW</span>
          <span style={{ fontSize: '8px', color: '#2a8a4a', letterSpacing: '0.05em' }}>● LIVE</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '3px',
          height: '120px',
          marginBottom: '8px'
        }}>
          <div style={{
            background: '#081208',
            border: '1px solid #1a4020',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.12em', color: '#8aa0a8' }}>ZONE 1</div>
            <div style={{ fontSize: '7px', marginTop: '2px', letterSpacing: '0.08em', color: '#28a048' }}>OPTIMAL</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: '45%', background: 'linear-gradient(90deg, #208840, #20a050)' }}></div>
          </div>
          <div style={{
            background: '#081208',
            border: '1px solid #1a4020',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.12em', color: '#8aa0a8' }}>ZONE 2</div>
            <div style={{ fontSize: '7px', marginTop: '2px', letterSpacing: '0.08em', color: '#28a048' }}>NOMINAL</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: '38%', background: 'linear-gradient(90deg, #208840, #20a050)' }}></div>
          </div>
          <div style={{
            background: '#160808',
            border: '1px solid #c02020',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.12em', color: '#8aa0a8' }}>ZONE 3</div>
            <div style={{ fontSize: '7px', marginTop: '2px', letterSpacing: '0.08em', color: '#e03030' }}>VOC ALERT</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: '100%', background: 'linear-gradient(90deg, #e03030, #e08020)' }}></div>
          </div>
          <div style={{
            background: '#081208',
            border: '1px solid #1a4020',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.12em', color: '#8aa0a8' }}>ZONE 4</div>
            <div style={{ fontSize: '7px', marginTop: '2px', letterSpacing: '0.08em', color: '#28a048' }}>NOMINAL</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: '32%', background: 'linear-gradient(90deg, #208840, #20a050)' }}></div>
          </div>
          <div style={{
            background: '#120e08',
            border: '1px solid #a05010',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.12em', color: '#8aa0a8' }}>ZONE 5</div>
            <div style={{ fontSize: '7px', marginTop: '2px', letterSpacing: '0.08em', color: '#d07820' }}>PFAS DETECT</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: '68%', background: 'linear-gradient(90deg, #d07820, #d0c020)' }}></div>
          </div>
          <div style={{
            background: '#081208',
            border: '1px solid #1a4020',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.12em', color: '#8aa0a8' }}>ZONE 6</div>
            <div style={{ fontSize: '7px', marginTop: '2px', letterSpacing: '0.08em', color: '#28a048' }}>NOMINAL</div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: '28%', background: 'linear-gradient(90deg, #208840, #20a050)' }}></div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7px', color: '#2a4050', letterSpacing: '0.06em', padding: '2px 0' }}>
          <span>400nm</span><span>500nm</span><span>600nm</span><span>700nm</span><span>800nm</span><span>900nm</span><span>1100nm</span>
        </div>
      </div>

      {/* HYPERSPECTRAL DATACUBE */}
      <div style={{
        background: '#080c0f',
        border: '1px solid #102028',
        padding: '0',
        overflow: 'hidden',
        minHeight: '200px',
        position: 'relative',
        gridColumn: '2',
        gridRow: '1 / 3'
      }}>
        <div style={{ position: 'absolute', top: '8px', left: '10px', zIndex: 10, fontSize: '8px', letterSpacing: '0.14em', color: '#e03030' }}>HYPERSPECTRAL DATACUBE — BAND SLICE RENDER</div>
        <div style={{ position: 'absolute', top: '8px', right: '10px', zIndex: 10, fontSize: '8px', letterSpacing: '0.1em', color: '#28a048' }}>● PROCESSING ACTIVE</div>
        <canvas ref={cubeCanvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>

      {/* SOIL COMPOSITION */}
      <div style={{
        background: '#080c0f',
        border: '1px solid #102028',
        padding: '10px',
        position: 'relative',
        gridColumn: '3',
        gridRow: '1'
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: '#e03030',
          textTransform: 'uppercase',
          marginBottom: '8px',
          paddingBottom: '5px',
          borderBottom: '1px solid #1a2f36',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>SOIL COMPOSITION</span>
          <span style={{ fontSize: '8px', color: '#2a8a4a', letterSpacing: '0.05em' }}>EPA 8260D</span>
        </div>
        {[
          { label: 'Nitrogen', id: 'b-n', val: '49.8%', color: '#e03030' },
          { label: 'Phosphorus', id: 'b-p', val: '31.0%', color: '#d07020' },
          { label: 'Potassium', id: 'b-k', val: '24.9%', color: '#c09020' },
          { label: 'Moisture', id: 'b-m', val: '65.6%', color: '#2080c0' },
          { label: 'pH Level', id: 'b-ph', val: '6.8', color: '#28a040' },
          { label: 'Org. Matter', id: 'b-om', val: '3.5%', color: '#8040c0' },
        ].map(bar => (
          <div key={bar.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
            <div style={{ width: '52px', color: '#6a8898', fontSize: '9px', flexShrink: 0 }}>{bar.label}</div>
            <div style={{ flex: 1, height: '5px', background: '#0e1e24', border: '1px solid #1a2f36', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${barWidths[bar.id] || 0}%`,
                background: bar.color,
                transition: 'width 1.2s ease'
              }}></div>
            </div>
            <div style={{ width: '34px', textAlign: 'right', color: '#e03030', fontSize: '9px' }}>{bar.val}</div>
          </div>
        ))}
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: '#e03030',
          textTransform: 'uppercase',
          marginBottom: '8px',
          paddingBottom: '5px',
          borderBottom: '1px solid #1a2f36',
          marginTop: '10px'
        }}>SPECTRAL ANALYSIS</div>
        <canvas ref={spectralCanvasRef} style={{ display: 'block', width: '100%', height: '60px' }} />
      </div>

      {/* SOIL ANALYTICS (RIGHT PANEL) */}
      <div style={{
        background: '#080c0f',
        border: '1px solid #102028',
        padding: '10px 12px',
        gridColumn: '4',
        gridRow: '1 / 5'
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: '#e03030',
          textTransform: 'uppercase',
          marginBottom: '8px',
          paddingBottom: '5px',
          borderBottom: '1px solid #1a2f36'
        }}>SOIL ANALYTICS</div>
        {[
          { key: 'SampleMedia', val: 'Sediment' },
          { key: 'Activity', val: 'Sediment' },
          { key: 'Analytical_Method', val: 'EPA 8260D' },
          { key: 'CAS_NO', val: '100-41-4' },
          { key: 'Analyte', val: 'Ethylbenzene' },
          { key: 'Result_Units', val: 'mg/kg', neutral: true },
          { key: 'Reporting_Limit', val: '0.00539' },
          { key: 'Validation_Level', val: 'Final', neutral: true },
          { key: 'Result_Final', val: '<0.00539' },
          { key: 'Result_Qualifier', val: 'U', neutral: true },
          { key: 'RL_Comparison', val: 'No', neutral: true },
        ].map(kv => (
          <div key={kv.key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '3px 0',
            borderBottom: '1px solid #0e1820'
          }}>
            <div style={{ color: '#506070', fontSize: '9px' }}>{kv.key}</div>
            <div style={{ color: kv.neutral ? '#8aaabb' : '#e03030', fontSize: '9px' }}>{kv.val}</div>
          </div>
        ))}
        <div style={{
          margin: '10px 0 6px',
          fontSize: '8px',
          letterSpacing: '0.14em',
          color: '#e03030',
          textTransform: 'uppercase',
          paddingBottom: '4px',
          borderBottom: '1px solid #1a2f36'
        }}>COMPOSITION</div>
        {[
          { key: 'Nitrogen (N)', val: '49.8%' },
          { key: 'Phosphorus (P)', val: '31.0%' },
          { key: 'Potassium (K)', val: '24.9%' },
          { key: 'Moisture', val: '65.6%' },
          { key: 'pH Level', val: '6.8', neutral: true },
          { key: 'Organic Matter', val: '3.5%' },
        ].map(kv => (
          <div key={kv.key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '3px 0',
            borderBottom: '1px solid #0e1820'
          }}>
            <div style={{ color: '#506070', fontSize: '9px' }}>{kv.key}</div>
            <div style={{ color: kv.neutral ? '#8aaabb' : '#e03030', fontSize: '9px' }}>{kv.val}</div>
          </div>
        ))}
        <div style={{
          margin: '10px 0 6px',
          fontSize: '8px',
          letterSpacing: '0.14em',
          color: '#e03030',
          textTransform: 'uppercase',
          paddingBottom: '4px',
          borderBottom: '1px solid #1a2f36'
        }}>TOXINS DETECTED</div>
        {[
          { name: 'VOCs', count: '20 detected', level: 'high' },
          { name: 'PAHs', count: '16 detected', level: 'high' },
          { name: 'Phthalates', count: '6 detected', level: 'med' },
          { name: 'PFAS', count: '8 detected', level: 'med' },
          { name: 'Dioxins', count: '24 detected', level: 'high' },
          { name: 'Pesticides', count: '14 detected', level: 'med' },
        ].map(toxin => (
          <div key={toxin.name} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '3px 0'
          }}>
            <div style={{ color: '#506070', fontSize: '9px' }}>{toxin.name}</div>
            <div style={{
              fontSize: '9px',
              color: toxin.level === 'high' ? '#e03030' : toxin.level === 'med' ? '#d07820' : '#28a048'
            }}>{toxin.count}</div>
          </div>
        ))}

        {/* CONTAMINATION FOOTPRINT */}
        <div style={{
          margin: '12px 0 6px',
          fontSize: '8px',
          letterSpacing: '0.14em',
          color: '#e03030',
          textTransform: 'uppercase',
          paddingBottom: '4px',
          borderBottom: '1px solid #1a2f36'
        }}>CONTAMINATION FOOTPRINT</div>
        <div style={{ position: 'relative', width: '100%', height: '155px', background: '#04080c', border: '1px solid #102028', overflow: 'hidden' }}>
          <canvas ref={dotCanvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
          {/* Legend */}
          <div style={{ position: 'absolute', bottom: '5px', left: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '7px', letterSpacing: '0.08em', color: '#7a9aaa' }}>
              <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#e03030', opacity: 0.9 }}></span>VOC / BTEX
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '7px', letterSpacing: '0.08em', color: '#7a9aaa' }}>
              <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#d07820', opacity: 0.9 }}></span>PFAS / Dioxin
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '7px', letterSpacing: '0.08em', color: '#7a9aaa' }}>
              <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#28a048', opacity: 0.9 }}></span>Clean / Nominal
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '7px', letterSpacing: '0.08em', color: '#7a9aaa' }}>
              <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', border: '1px solid #c8d020', background: 'transparent' }}></span>Sample Point
            </div>
          </div>
          {/* Coord readout */}
          <div style={{ position: 'absolute', top: '5px', right: '6px', fontSize: '7px', letterSpacing: '0.08em', color: '#304858' }}>{coordReadout}</div>
        </div>
      </div>

      {/* KEY FINDINGS */}
      <div style={{
        background: '#080c0f',
        border: '1px solid #102028',
        padding: '10px',
        position: 'relative',
        gridColumn: '3',
        gridRow: '2'
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: '#e03030',
          textTransform: 'uppercase',
          marginBottom: '8px',
          paddingBottom: '5px',
          borderBottom: '1px solid #1a2f36',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>KEY FINDINGS</span>
          <span style={{ fontSize: '8px', color: '#2a8a4a', letterSpacing: '0.05em' }}>Δ 3 ZONES FLAGGED</span>
        </div>
        {[
          { tag: 'Z3', tagColor: '#e03030', text: 'Elevated VOC levels — 20 compounds above threshold. BTEX signature matches industrial runoff profile.' },
          { tag: 'Z5', tagColor: '#d07820', text: 'PFAS contamination identified — 8 compounds detected. PFOA/PFOS ratio 2.3:1. Recommend subsurface sampling.' },
          { tag: 'Z1', tagColor: '#28a048', text: 'Optimal nutrient balance — N: 45%, P: 32%, K: 28%. No remediation required.' },
        ].map((finding, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '8px',
            padding: '4px 0',
            borderBottom: i === 2 ? 'none' : '1px solid #0e1820',
            fontSize: '9px',
            color: '#7a9aaa',
            lineHeight: '1.4'
          }}>
            <span style={{
              flexShrink: 0,
              fontSize: '8px',
              letterSpacing: '0.08em',
              padding: '1px 5px',
              border: '1px solid ' + finding.tagColor,
              color: finding.tagColor
            }}>{finding.tag}</span>
            <span>{finding.text}</span>
          </div>
        ))}
        <div style={{
          border: 'none',
          paddingTop: '6px',
          fontSize: '8px',
          letterSpacing: '0.1em',
          color: '#c8d020'
        }}>▶ OVERALL: THREAT LEVEL LOW — CONFIDENCE 98.7%</div>
      </div>

      {/* LIVE DATA FEED */}
      <div style={{
        background: '#080c0f',
        border: '1px solid #102028',
        padding: '5px 10px',
        gridColumn: '1 / 4',
        gridRow: '3'
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: '#e03030',
          textTransform: 'uppercase',
          marginBottom: '4px',
          paddingBottom: '5px',
          borderBottom: '1px solid #1a2f36'
        }}>LIVE DATA FEED</div>
        {feedLines.map((line, i) => (
          <div key={i} style={{
            fontSize: '8px',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.6',
            color: line.color
          }}>
            ▶ {line.text}
          </div>
        ))}
      </div>

      {/* STATUS BAR */}
      <div style={{
        background: '#040810',
        borderTop: '1px solid #102028',
        padding: '4px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '8px',
        letterSpacing: '0.1em',
        color: '#304858',
        gridColumn: '1 / 5',
        gridRow: '4'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          HYPERSPECTRAL V4 | <span style={{ color: '#28a048' }}>ALTITUDE: 150m</span> | <span style={{ color: '#28a048' }}>COVERAGE: 2.5km²</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          PROCESSING: <span style={{ color: '#28a048' }}>ACTIVE</span> | LATENCY: <span style={{ color: '#28a048' }}>0.0004s/frame</span> | UPDATE RATE: <span style={{ color: '#28a048' }}>240Hz</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          ALERT: <span style={{ color: '#e03030' }}>ZONE 3 VOC</span> | THREAT LEVEL: <span style={{ color: '#28a048' }}>LOW</span> | CONFIDENCE: <span style={{ color: '#28a048' }}>98.7%</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const scrollToWhat = () => {
    const element = document.getElementById("what-is-icarus");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0a0a0a 20%, transparent)" }}
      />

      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
        style={{ height: 280, background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
      />

      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 lg:px-16 max-w-[1400px] mx-auto w-full py-32">
        <ScrollReveal animation="fade-up" duration={1}>
          <h1 className="text-5xl sm:text-6xl lg:text-9xl font-extralight leading-[0.95] max-w-5xl text-white mb-8 font-[family-name:var(--font-inter)] text-balance">
            Icarus
          </h1>

          <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-2xl mb-12 font-[family-name:var(--font-inter)]">
            Hyperdimensional Hyperspectral Spiking Neural Net
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="max-w-2xl space-y-6 text-white/60 text-lg md:text-xl leading-[1.8] font-[family-name:var(--font-inter)] font-light">
            <p className="text-balance">
              Icarus is a living, hyperdimensional spiking neural network that <span className="text-white font-medium">perceives the Earth</span> through drone-mounted hyperspectral eyes.
            </p>
            <p className="text-balance">
              It collects and interprets ecological data, soil contaminants, nutrient markers, microbial signatures, and spectral biomarkers in real time — turning invisible soil intelligence into actionable planetary insight.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.4} duration={1}>
          <div className="flex flex-col sm:flex-row gap-4 mt-16">
            <button
              onClick={scrollToWhat}
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
            >
              Understand the Earth
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>

            <Link
              href="#live-perception"
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
            >
              Watch the Scan Live
              <Eye className="w-4 h-4 transition-transform duration-300" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={scrollToWhat}
          className="text-white/30 hover:text-white/60 transition-all duration-500 focus-ring rounded-full p-2"
          aria-label="Scroll to content"
        >
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

// ============================================
// WHAT IS ICARUS SECTION
// ============================================
function WhatIsIcarusSection() {
  return (
    <section id="what-is-icarus" className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            The Neural Earth
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-16 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            What is Icarus
          </h2>

          <div className="space-y-8 text-white/50 text-xl md:text-2xl leading-[1.9] font-[family-name:var(--font-inter)] font-light">
            <p className="text-balance">
              Icarus is the <span className="text-white font-medium">nervous system of the Earth</span> — a hyperdimensional spiking neural network that understands the ecological foundation of the earth.
            </p>
            <p className="text-balance">
              Through drone-mounted hyperspectral sensors, Icarus <span className="text-white font-medium">perceives</span> what human eyes cannot: the invisible chemical dance of nutrients, contaminants, and microbial life beneath our feet.
            </p>
            <p className="text-balance">
              Enotrium <span className="text-white font-medium">decodes</span> spectral biomarkers into actionable intelligence. It <span className="text-white font-medium">orchestrates</span> regeneration. It reveals the hidden language of the land.
            </p>
          </div>

          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// CAPABILITIES SECTION
// ============================================
function CapabilitiesSection() {
  const capabilities = [
    {
      icon: Scan,
      title: "Real-time Hyperspectral Soil Mapping",
      description: "Perceives soil composition at the molecular level through drone-mounted spectral sensors.",
    },
    {
      icon: Activity,
      title: "Contaminant Detection",
      description: "Identifies heavy metals, pesticides, and chemical pollutants with sub-ppm accuracy.",
    },
    {
      icon: Zap,
      title: "Nutrient & Microbial Profiling",
      description: "Maps micronutrient distribution and sees microbial signatures to decode soil composition.",
    },
    {
      icon: Brain,
      title: "Predictive Ecological Modeling",
      description: "Computes regeneration potential through microbial signature analysis and soil vitality metricsusing hyperdimensional neural processing.",
    },
    {
      icon: Globe,
      title: "Planetary Scale Perception",
      description: "Aggregates hyperspectral intelligence across regions to reveal global soil patterns.",
    },
  ];

  return (
    <section className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Capabilities
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-20 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            What Icarus Perceives
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {capabilities.map((capability, index) => (
            <ScrollReveal key={capability.title} animation="fade-up" delay={index * 0.1} duration={1}>
              <div className="group py-12 border-t border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-white/[0.03] group-hover:bg-white/[0.06] transition-all duration-500">
                      <capability.icon className="w-6 h-6 text-white/30 group-hover:text-white/50 transition-all duration-500" strokeWidth={1} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-light text-white mb-3 font-[family-name:var(--font-inter)] tracking-wide">
                      {capability.title}
                    </h3>
                    <p className="text-white/40 text-base leading-relaxed font-[family-name:var(--font-inter)] font-light">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}

// ============================================
// THE NEURAL EARTH SECTION
// ============================================
function TechnologySection() {
  const tech = [
    {
      title: "Spiking Neural Net",
      description: "Bio-inspired neural architecture that processes information like the human brain — event-driven, energy-efficient, and capable of temporal pattern recognition.",
    },
    {
      title: "Hyperdimensional Processing",
      description: "Computes in high-dimensional vector spaces, enabling Icarus to perceive complex relationships in spectral data that traditional neural networks cannot detect.",
    },
    {
      title: "Drone-Integrated Hyperspectral Sensors",
      description: "Custom sensor arrays capture light across hundreds of narrow wavelength bands, revealing chemical fingerprints invisible to conventional imaging.",
    },
    {
      title: "Live Data Fusion",
      description: "Real-time integration of multispectral data streams with environmental sensors, creating a unified perception of soil health and ecological dynamics.",
    },
  ];

  return (
    <section className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Technology
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-20 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            The Architecture
          </h2>
        </ScrollReveal>

        <div className="space-y-16">
          {tech.map((item, index) => (
            <ScrollReveal key={item.title} animation="fade-up" delay={index * 0.1} duration={1}>
              <div className="group">
                <h3 className="text-2xl md:text-3xl font-light text-white mb-6 font-[family-name:var(--font-inter)] tracking-wide">
                  <span className="text-white/40 mr-4">0{index + 1}</span>
                  {item.title}
                </h3>
                <p className="text-white/50 text-lg md:text-xl leading-[1.8] font-[family-name:var(--font-inter)] font-light pl-12 md:pl-16">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}

// ============================================
// WHY IT MATTERS SECTION
// ============================================
function WhyItMattersSection() {
  return (
    <section className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            Vision
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-16 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            A New Sight for the Soil
          </h2>

          <div className="space-y-8 text-white/50 text-xl md:text-2xl leading-[1.9] font-[family-name:var(--font-inter)] font-light">
            <p className="text-balance">
              For millennia, humanity has farmed blind. We treated soil as dirt — a medium to be worked, not a living system to be understood.
            </p>
            <p className="text-balance">
              Icarus gives us <span className="text-white font-medium">hyperdimensional sight</span> into the underground world, revealing the complex chemistry that sustains all life.
            </p>
            <p className="text-balance">
              Precise, hyperspectral perception for phytoremediation and agricultural security.
            </p>
            <p className="text-white/80 font-medium">
              This is spectral consciousness. This is the neural Earth.
            </p>
          </div>

          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// LIVE PERCEPTION SECTION
// ============================================
function SeeThroughTheSoil() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [liveStatus, setLiveStatus] = useState<string>("LIVE");
  const [spectralLock, setSpectralLock] = useState<string>("");
  const [neuralNet, setNeuralNet] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    // Particle types
    type DataParticle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
      type: 'background' | 'stream' | 'detection';
    };

    type DetectionPulse = {
      x: number;
      y: number;
      label: string;
      life: number;
      maxLife: number;
      color: string;
    };

    let particles: DataParticle[] = [];
    let detectionPulses: DetectionPulse[] = [];

    const detectionLabels = [
      "Nitrogen (N)", "Phosphorus (P)", "Potassium (K)", "Moisture", "pH Level", "Organic Matter"
    ];

    const colors = [
      "rgba(6, 182, 212, 0.8)",   // cyan
      "rgba(236, 72, 153, 0.8)",  // magenta
      "rgba(20, 184, 166, 0.8)",  // teal
      "rgba(220, 38, 38, 0.8)",    // deep red
    ];

    const spawnParticle = (W: number, H: number, type: 'background' | 'stream' | 'detection'): DataParticle => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      if (type === 'background') {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: 0.5 + Math.random() * 1.5,
          color: color.replace('0.8', '0.3'),
          life: Math.random() * 200,
          maxLife: 150 + Math.random() * 100,
          type: 'background',
        };
      } else if (type === 'stream') {
        return {
          x: Math.random() * W,
          y: H + 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.5 - Math.random() * 1,
          size: 1 + Math.random() * 2,
          color: color,
          life: 0,
          maxLife: 200 + Math.random() * 150,
          type: 'stream',
        };
      } else {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 2 + Math.random() * 3,
          color: color,
          life: 0,
          maxLife: 100 + Math.random() * 50,
          type: 'detection',
        };
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const W = canvas.width;
      const H = canvas.height;
      particles = [];
      detectionPulses = [];
      
      // No background particles - replaced with professional visualizations
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Text overlay cycle
    const textCycle = () => {
      const texts = ["LIVE", "SPECTRAL SCAN", "SOIL ANALYSIS", "HSI PROCESSING"];
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      
      if (Math.random() < 0.01) {
        setLiveStatus(randomText);
        setTimeout(() => setLiveStatus("LIVE"), 2000);
      }
      
      if (Math.random() < 0.005) {
        setSpectralLock("SPECTRAL LOCK");
        setTimeout(() => setSpectralLock(""), 1500);
      }
      
      if (Math.random() < 0.003) {
        setNeuralNet("SOIL ANALYSIS ACTIVE");
        setTimeout(() => setNeuralNet(""), 2000);
      }
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Clear with dark background
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
      ctx.fillRect(0, 0, W, H);

      // Draw soil layers (gradient bands)
      const gradient = ctx.createLinearGradient(0, 0, 0, H);
      gradient.addColorStop(0, "rgba(10, 10, 10, 0.8)");
      gradient.addColorStop(0.3, "rgba(20, 30, 40, 0.6)");
      gradient.addColorStop(0.6, "rgba(15, 25, 35, 0.6)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0.8)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // Draw HSI birds eye view farm overlay (Palantir-style grid)
      const farmOverlayX = 20;
      const farmOverlayY = 60;
      const farmOverlayW = 300;
      const farmOverlayH = 200;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(farmOverlayX, farmOverlayY, farmOverlayW, farmOverlayH);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(farmOverlayX, farmOverlayY, farmOverlayW, farmOverlayH);
      
      ctx.font = "11px Inter";
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("HSI FARM OVERVIEW", farmOverlayX + 10, farmOverlayY + 20);
      
      // Draw grid overlay
      const gridSize = 20;
      ctx.strokeStyle = "rgba(220, 38, 38, 0.15)";
      for (let x = farmOverlayX + 10; x < farmOverlayX + farmOverlayW - 10; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, farmOverlayY + 30);
        ctx.lineTo(x, farmOverlayY + farmOverlayH - 10);
        ctx.stroke();
      }
      for (let y = farmOverlayY + 30; y < farmOverlayY + farmOverlayH - 10; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(farmOverlayX + 10, y);
        ctx.lineTo(farmOverlayX + farmOverlayW - 10, y);
        ctx.stroke();
      }
      
      // Draw field zones with spectral data colors
      const zones = [
        { x: farmOverlayX + 30, y: farmOverlayY + 40, w: 60, h: 50, color: "rgba(220, 38, 38, 0.6)" },
        { x: farmOverlayX + 100, y: farmOverlayY + 40, w: 70, h: 50, color: "rgba(255, 100, 100, 0.6)" },
        { x: farmOverlayX + 180, y: farmOverlayY + 40, w: 60, h: 50, color: "rgba(180, 30, 30, 0.6)" },
        { x: farmOverlayX + 30, y: farmOverlayY + 100, w: 80, h: 60, color: "rgba(220, 38, 38, 0.5)" },
        { x: farmOverlayX + 120, y: farmOverlayY + 100, w: 70, h: 60, color: "rgba(255, 100, 100, 0.5)" },
        { x: farmOverlayX + 200, y: farmOverlayY + 100, w: 50, h: 60, color: "rgba(180, 30, 30, 0.5)" },
      ];
      
      zones.forEach(zone => {
        ctx.fillStyle = zone.color;
        ctx.fillRect(zone.x, zone.y, zone.w, zone.h);
        ctx.strokeStyle = "rgba(220, 38, 38, 0.3)";
        ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);
      });
      
      // Add zone labels
      ctx.font = "8px Inter";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.textAlign = "center";
      zones.forEach((zone, i) => {
        ctx.fillText(`ZONE ${i + 1}`, zone.x + zone.w / 2, zone.y + zone.h / 2 + 3);
      });
      
      // Draw bar chart for soil composition
      const barChartX = 340;
      const barChartY = 60;
      const barChartW = 200;
      const barChartH = 150;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(barChartX, barChartY, barChartW, barChartH);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.4)";
      ctx.strokeRect(barChartX, barChartY, barChartW, barChartH);
      
      ctx.font = "11px Inter";
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("SOIL COMPOSITION", barChartX + 10, barChartY + 20);
      
      const barData = [
        { label: "N", value: 45 },
        { label: "P", value: 32 },
        { label: "K", value: 28 },
        { label: "Moisture", value: 65 },
        { label: "pH", value: 65 },
        { label: "OM", value: 32 },
      ];
      
      const barWidth = 20;
      const barGap = 15;
      const maxBarHeight = barChartH - 40;
      
      barData.forEach((bar, i) => {
        const barHeight = (bar.value / 100) * maxBarHeight;
        const x = barChartX + 15 + i * (barWidth + barGap);
        const y = barChartY + barChartH - 10 - barHeight;
        
        // Bar with gradient
        const barGradient = ctx.createLinearGradient(x, y, x, barChartY + barChartH - 10);
        barGradient.addColorStop(0, "rgba(220, 38, 38, 0.8)");
        barGradient.addColorStop(1, "rgba(180, 30, 30, 0.4)");
        
        ctx.fillStyle = barGradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Label
        ctx.font = "8px Inter";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "center";
        ctx.fillText(bar.label, x + barWidth / 2, barChartY + barChartH - 5);
      });
      
      // Draw spectral graph with red and green specs
      const spectralGraphX = 560;
      const spectralGraphY = 60;
      const spectralGraphW = W - 780;
      const spectralGraphH = 150;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(spectralGraphX, spectralGraphY, spectralGraphW, spectralGraphH);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.4)";
      ctx.strokeRect(spectralGraphX, spectralGraphY, spectralGraphW, spectralGraphH);
      
      ctx.font = "11px Inter";
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("SPECTRAL ANALYSIS", spectralGraphX + 10, spectralGraphY + 20);
      
      // Draw axes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.beginPath();
      ctx.moveTo(spectralGraphX + 10, spectralGraphY + spectralGraphH - 30);
      ctx.lineTo(spectralGraphX + spectralGraphW - 10, spectralGraphY + spectralGraphH - 30);
      ctx.moveTo(spectralGraphX + 10, spectralGraphY + spectralGraphH - 30);
      ctx.lineTo(spectralGraphX + 10, spectralGraphY + 30);
      ctx.stroke();
      
      // Draw spectral vectors with red and green specs
      const vectorCount = 8;
      for (let i = 0; i < vectorCount; i++) {
        const x = spectralGraphX + 20 + (i * (spectralGraphW - 30) / vectorCount);
        const isRed = i % 2 === 0;
        
        // Draw vector line
        ctx.strokeStyle = isRed ? "rgba(220, 38, 38, 0.6)" : "rgba(34, 197, 94, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, spectralGraphY + spectralGraphH - 30);
        
        const height = 30 + Math.random() * (spectralGraphH - 70);
        ctx.lineTo(x, spectralGraphY + spectralGraphH - 30 - height);
        ctx.stroke();
        
        // Draw spec (circle at top)
        ctx.fillStyle = isRed ? "rgba(220, 38, 38, 0.9)" : "rgba(34, 197, 94, 0.9)";
        ctx.beginPath();
        ctx.arc(x, spectralGraphY + spectralGraphH - 30 - height, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Wavelength label
        ctx.font = "8px Inter";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.textAlign = "center";
        const wavelength = 400 + i * 100;
        ctx.fillText(wavelength + "nm", x, spectralGraphY + spectralGraphH - 15);
      }
      
      // Add key findings panel
      const keyFindingsX = 20;
      const keyFindingsY = 280;
      const keyFindingsW = W - 240;
      const keyFindingsH = 80;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(keyFindingsX, keyFindingsY, keyFindingsW, keyFindingsH);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.4)";
      ctx.strokeRect(keyFindingsX, keyFindingsY, keyFindingsW, keyFindingsH);
      
      ctx.font = "11px Inter";
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("KEY FINDINGS", keyFindingsX + 10, keyFindingsY + 20);
      
      const findings = [
        "ZONE 3: Elevated VOC levels detected - 20 compounds above threshold",
        "ZONE 5: PFAS contamination identified - 8 compounds detected",
        "ZONE 1: Optimal nutrient balance - N: 45%, P: 32%, K: 28%",
        "OVERALL: Threat level LOW - Confidence 98.7%",
      ];
      
      ctx.font = "9px Inter";
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      findings.forEach((finding, i) => {
        const y = keyFindingsY + 40 + i * 15;
        ctx.fillText(finding, keyFindingsX + 10, y);
      });

      // Draw horizontal scanning lines
      const scanY = (t * 0.5) % H;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(W, scanY);
      ctx.stroke();

      // Draw vertical scanning lines
      const scanX = (t * 0.3) % W;
      ctx.strokeStyle = "rgba(236, 72, 153, 0.08)";
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, H);
      ctx.stroke();

      // Update and draw particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.type === 'stream') {
          if (p.y < -10 || p.life > p.maxLife) {
            particles[index] = spawnParticle(W, H, 'stream');
          }
        } else if (p.type === 'detection') {
          if (p.life > p.maxLife) {
            particles[index] = spawnParticle(W, H, 'detection');
          }
        } else {
          if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10 || p.life > p.maxLife) {
            particles[index] = spawnParticle(W, H, 'background');
          }
        }

        const lifeAlpha = Math.min(1, p.life / 30) * Math.min(1, (p.maxLife - p.life) / 30);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${lifeAlpha.toFixed(2)})`);
        ctx.fill();

        // Glow effect for detection particles
        if (p.type === 'detection') {
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Disable stream particles for cleaner look
      // if (particles.filter(p => p.type === 'stream').length < 50 && Math.random() < 0.3) {
      //   particles.push(spawnParticle(W, H, 'stream'));
      // }

      // Reduce detection pulses frequency
      if (Math.random() < 0.002) {
        detectionPulses.push({
          x: Math.random() * (W - 240),
          y: Math.random() * (H - 120),
          label: detectionLabels[Math.floor(Math.random() * detectionLabels.length)],
          life: 0,
          maxLife: 120,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Draw detection pulses
      detectionPulses = detectionPulses.filter(pulse => {
        pulse.life++;
        const progress = pulse.life / pulse.maxLife;
        const alpha = Math.sin(progress * Math.PI);

        // Draw pulse ring
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 20 + progress * 30, 0, Math.PI * 2);
        ctx.strokeStyle = pulse.color.replace(/[\d.]+\)$/, `${(alpha * 0.5).toFixed(2)})`);
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        if (progress < 0.5) {
          ctx.font = "10px Inter";
          ctx.fillStyle = pulse.color.replace(/[\d.]+\)$/, `${alpha.toFixed(2)})`);
          ctx.textAlign = "center";
          ctx.fillText(pulse.label, pulse.x, pulse.y - 40);
        }

        return pulse.life < pulse.maxLife;
      });

      // Draw central soil cross-section (3D-like cube)
      const centerX = W / 2;
      const centerY = H / 2;
      const cubeSize = Math.min(W, H) * 0.25;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(t * 0.001);

      // Draw cube faces with gradient
      const faces = [
        { x: 0, y: -cubeSize/2, w: cubeSize, h: cubeSize/2, color: "rgba(6, 182, 212, 0.15)" },
        { x: -cubeSize/2, y: 0, w: cubeSize/2, h: cubeSize/2, color: "rgba(236, 72, 153, 0.15)" },
        { x: 0, y: 0, w: cubeSize, h: cubeSize/2, color: "rgba(20, 184, 166, 0.15)" },
      ];

      faces.forEach(face => {
        ctx.fillStyle = face.color;
        ctx.fillRect(face.x, face.y, face.w, face.h);
        ctx.strokeStyle = face.color.replace('0.15', '0.3');
        ctx.lineWidth = 1;
        ctx.strokeRect(face.x, face.y, face.w, face.h);
      });

      ctx.restore();

      // Draw spectral wavelength bands with HSI data visualization
      for (let i = 0; i < 8; i++) {
        const bandY = (H / 8) * i + (Math.sin(t * 0.02 + i) * 5);
        const gradient = ctx.createLinearGradient(0, bandY, W, bandY);
        gradient.addColorStop(0, "rgba(6, 182, 212, 0)");
        gradient.addColorStop(0.5, colors[i % colors.length].replace('0.8', '0.15'));
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, bandY - 3, W, 6);
        
        // Add wavelength labels
        const wavelengths = ["400nm", "500nm", "600nm", "700nm", "800nm", "900nm", "1000nm", "1100nm"];
        ctx.font = "9px Inter";
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.textAlign = "left";
        ctx.fillText(wavelengths[i], 10, bandY + 3);
      }

      // Draw soil composition metrics panel - expanded to full height with black/red tech theme
      const metricsX = W - 220;
      const metricsY = 20;
      const metricsH = H - 40;
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillRect(metricsX, metricsY, 200, metricsH);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(metricsX, metricsY, 200, metricsH);
      
      // Add header
      ctx.font = "11px Inter";
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("SOIL ANALYTICS", metricsX + 10, metricsY + 20);
      
      // Add divider
      ctx.strokeStyle = "rgba(220, 38, 38, 0.3)";
      ctx.beginPath();
      ctx.moveTo(metricsX + 10, metricsY + 30);
      ctx.lineTo(metricsX + 190, metricsY + 30);
      ctx.stroke();
      
      // Sample data fields
      const sampleData = [
        { label: "SampleMedia", value: "Sediment" },
        { label: "Activity", value: "Sediment" },
        { label: "Analytical_Method", value: "EPA 8260D" },
        { label: "CAS_NO", value: "100-41-4" },
        { label: "Analyte", value: "Ethylbenzene" },
        { label: "Result_Units", value: "mg/kg" },
        { label: "Reporting_Limit", value: "0.00539" },
        { label: "Validation_Level", value: "Final" },
        { label: "Result_Final", value: "<0.00539" },
        { label: "Result_Qualifier", value: "U" },
        { label: "RL_Comparison", value: "No" },
      ];
      
      sampleData.forEach((data, i) => {
        const y = metricsY + 50 + i * 18;
        ctx.font = "9px Inter";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText(data.label, metricsX + 10, y);
        ctx.fillStyle = "rgba(220, 38, 38, 0.8)";
        ctx.textAlign = "right";
        ctx.fillText(data.value, metricsX + 190, y);
        ctx.textAlign = "left";
      });
      
      // Add section divider
      ctx.strokeStyle = "rgba(220, 38, 38, 0.3)";
      ctx.beginPath();
      ctx.moveTo(metricsX + 10, metricsY + 260);
      ctx.lineTo(metricsX + 190, metricsY + 260);
      ctx.stroke();
      
      // Add composition metrics
      ctx.font = "11px Inter";
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("COMPOSITION", metricsX + 10, metricsY + 280);
      
      const metrics = [
        { label: "Nitrogen (N)", value: (45 + Math.sin(t * 0.01) * 5).toFixed(1) + "%" },
        { label: "Phosphorus (P)", value: (32 + Math.cos(t * 0.015) * 3).toFixed(1) + "%" },
        { label: "Potassium (K)", value: (28 + Math.sin(t * 0.012) * 4).toFixed(1) + "%" },
        { label: "Moisture", value: (65 + Math.cos(t * 0.008) * 8).toFixed(1) + "%" },
        { label: "pH Level", value: (6.5 + Math.sin(t * 0.005) * 0.5).toFixed(1) },
        { label: "Organic Matter", value: (3.2 + Math.cos(t * 0.009) * 0.3).toFixed(1) + "%" },
      ];
      
      metrics.forEach((metric, i) => {
        const y = metricsY + 300 + i * 18;
        ctx.font = "9px Inter";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText(metric.label, metricsX + 10, y);
        ctx.fillStyle = "rgba(220, 38, 38, 0.8)";
        ctx.textAlign = "right";
        ctx.fillText(metric.value, metricsX + 190, y);
        ctx.textAlign = "left";
      });
      
      // Add compound lists section
      ctx.strokeStyle = "rgba(220, 38, 38, 0.3)";
      ctx.beginPath();
      ctx.moveTo(metricsX + 10, metricsY + 420);
      ctx.lineTo(metricsX + 190, metricsY + 420);
      ctx.stroke();
      
      ctx.font = "11px Inter";
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("TOXINS DETECTED", metricsX + 10, metricsY + 440);
      
      const compoundCategories = [
        { label: "VOCs", count: 20 },
        { label: "PAHs", count: 16 },
        { label: "Phthalates", count: 6 },
        { label: "PFAS", count: 8 },
        { label: "Dioxins", count: 24 },
        { label: "Pesticides", count: 14 },
      ];
      
      compoundCategories.forEach((cat, i) => {
        const y = metricsY + 460 + i * 18;
        ctx.font = "9px Inter";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText(cat.label, metricsX + 10, y);
        ctx.fillStyle = "rgba(220, 38, 38, 0.8)";
        ctx.textAlign = "right";
        ctx.fillText(cat.count + " detected", metricsX + 190, y);
        ctx.textAlign = "left";
      });

      // Draw live ticker-style data displays - black/red tech theme
      const tickerY = H - 100;
      const tickerH = 80;
      const tickerX = 20;
      const tickerW = W - 260;
      
      // Ticker 1: Soil Analysis Data
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(tickerX, tickerY, tickerW, tickerH);
      ctx.strokeStyle = "rgba(220, 38, 38, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(tickerX, tickerY, tickerW, tickerH);
      
      ctx.font = "10px Inter";
      ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("LIVE DATA FEED", tickerX + 10, tickerY + 15);
      
      // Scrolling data ticker
      const tickerData = [
        "N: 45.2% | P: 32.1% | K: 28.4% | pH: 6.5 | Moisture: 65.3% | OM: 3.2%",
        "VOCs: 20 detected | PAHs: 16 detected | PFAS: 8 detected | Dioxins: 24 detected",
        "Sample: SED-001 | Method: EPA 8260D | Analyte: Ethylbenzene | Result: <0.00539 mg/kg",
        "Status: FINAL | Qualifier: U | RL: 0.00539 | Validation: COMPLETE",
      ];
      
      const scrollOffset = (t * 0.5) % (tickerW + 400);
      ctx.font = "9px Inter";
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.textAlign = "left";
      
      tickerData.forEach((data, i) => {
        const x = tickerX + 10 + (i * 300) - scrollOffset;
        if (x > tickerX - 200 && x < tickerX + tickerW) {
          ctx.fillText(data, x, tickerY + 40);
        }
      });
      
      // Add second ticker row
      const ticker2Y = tickerY + 50;
      ctx.strokeStyle = "rgba(220, 38, 38, 0.2)";
      ctx.beginPath();
      ctx.moveTo(tickerX, ticker2Y);
      ctx.lineTo(tickerX + tickerW, ticker2Y);
      ctx.stroke();
      
      const ticker2Data = [
        "SCAN: 400-1100nm | RESOLUTION: 10nm | ACCURACY: 94.28%",
        "SENSOR: HYPERSPECTRAL V4 | ALTITUDE: 150m | COVERAGE: 2.5km²",
        "PROCESSING: ACTIVE | LATENCY: 0.0004s/frame | UPDATE RATE: 240Hz",
        "ALERT: NONE | THREAT LEVEL: LOW | CONFIDENCE: 98.7%",
      ];
      
      const scrollOffset2 = (t * 0.3) % (tickerW + 400);
      ticker2Data.forEach((data, i) => {
        const x = tickerX + 10 + (i * 350) - scrollOffset2;
        if (x > tickerX - 200 && x < tickerX + tickerW) {
          ctx.fillStyle = "rgba(220, 38, 38, 0.7)";
          ctx.fillText(data, x, tickerY + 70);
        }
      });

      textCycle();
      t += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="live-perception" className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <div className="flex items-start justify-between mb-6">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-[family-name:var(--font-inter)] font-medium">
              Live Perception
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-red-400 font-[family-name:var(--font-inter)] font-medium">
                {liveStatus}
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-12 font-[family-name:var(--font-inter)] text-balance leading-[1.1]">
            See Through the Soil
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={1}>
          <div className="relative aspect-video bg-[#050a0f] border border-cyan-500/20 overflow-hidden"
            style={{
              boxShadow: "inset 0 0 100px rgba(6, 182, 212, 0.08), 0 0 60px rgba(6, 182, 212, 0.12)"
            }}
          >
            <HSIDashboard />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// JOIN THE NEURAL FRONTIER SECTION
// ============================================
function TheFrontierSection() {
  return (
    <section className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16">
        <ScrollReveal animation="fade-up" duration={1}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-6 font-[family-name:var(--font-inter)] font-medium">
            The Frontier
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight text-white mb-12 font-[family-name:var(--font-inter)] leading-[1.1] whitespace-nowrap">
            Join the New Frontier
          </h2>

          <div className="space-y-8 text-white/50 text-xl md:text-2xl leading-[1.9] font-[family-name:var(--font-inter)] font-light mb-16">
            <p className="text-balance">
              Icarus is autonomous oversight for the earth, a nervous system for agriculture.
            </p>
            <p className="text-balance">
              We partner with farmers, research institutions, and regenerative agriculture pioneers to deploy hyperspectral perception across the planet.
            </p>
            <p className="text-balance">
              Together, we're building <span className="text-white font-medium">spectral consciousness</span> — a new way of seeing and caring for the soil that sustains us all.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="mailto:contact@enotrium.org"
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
            >
              Request Early Access
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="https://www.enotriumai.org/research/"
              target="_blank"
              rel="noopener noreferrer"
              className="group magnetic-btn inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500 font-[family-name:var(--font-inter)] focus-ring"
            >
              Research Collaboration
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function IcarusPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar darkText />

      <HeroSection />
      <WhatIsIcarusSection />
      <CapabilitiesSection />
      <TechnologySection />
      <WhyItMattersSection />
      <SeeThroughTheSoil />
      <TheFrontierSection />

      <Footer />
    </div>
  );
}
