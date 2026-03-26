"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// State coordinates for flow lines
const stateCoords: Record<string, [number, number]> = {
    Kansas: [-98.4, 38.5],
    Colorado: [-105.5, 39.0],
    Iowa: [-93.5, 42.0],
    Texas: [-99.9, 31.5],
    Pennsylvania: [-77.2, 41.0],
    Michigan: [-85.6, 43.0],
    Illinois: [-89.4, 40.0],
    California: [-119.4, 36.8],
    Oregon: [-120.5, 44.0],
    Nevada: [-117.0, 39.5],
};

interface FlowData {
    id: string;
    commodity: string;
    from: string;
    to: string;
    volume: string;
    value: string; // value of the flow
}

const flowData: FlowData[] = [
    { id: "1", commodity: "Kenaf", from: "Kansas", to: "Colorado", volume: "10,000 tons", value: "$2.4M" },
    { id: "2", commodity: "Corn", from: "Iowa", to: "Texas", volume: "50,000 bushels", value: "$8.7M" },
    { id: "3", commodity: "Steel", from: "Pennsylvania", to: "Michigan", volume: "25,000 tons", value: "$15.2M" },
    { id: "5", commodity: "Timber", from: "Oregon", to: "Nevada", volume: "15,000 cu ft", value: "$3.8M" },
];

// Marketing stat flashcards
type Stat = { label: string; value: string; sub: string };

const leftStats: Stat[] = [
    { label: "Active Routes", value: "500+", sub: "Nationally" },
    { label: "Partners", value: "34", sub: "Verified" },
    { label: "States", value: "30", sub: "Coverage" },
];

const rightStats: Stat[] = [];

// Generate curved path
function generateCurvedPath(from: [number, number], to: [number, number]): string {
    const midX = (from[0] + to[0]) / 2;
    const midY = (from[1] + to[1]) / 2;
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    const curveAmount = dist * 0.25;
    const perpX = -dy / dist * curveAmount;
    const perpY = dx / dist * curveAmount;
    return `M ${from[0]} ${from[1]} Q ${midX + perpX} ${midY + perpY} ${to[0]} ${to[1]}`;
}

export function InteractiveUSMap() {
    return (
        <div className="w-full">
            {/* Animation styles — single definition to avoid cross-browser conflicts
                from duplicate @keyframes blocks */}
            <style>{`
                @-webkit-keyframes flowDash { from { stroke-dashoffset: 100; } to { stroke-dashoffset: -100; } }
                @keyframes flowDash { from { stroke-dashoffset: 100; } to { stroke-dashoffset: -100; } }
                .flow-anim { stroke-dasharray: 100 100; stroke-dashoffset: 100; -webkit-animation: flowDash 2.5s ease-in-out infinite; animation: flowDash 2.5s ease-in-out infinite; }
            `}</style>

            {/* Main layout: full-width map, stats below */}
            <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto">
                {/* Map */}
                <div className="w-full min-w-0">
                    <ComposableMap
                        projection="geoAlbersUsa"
                        width={1200}
                        height={700}
                        className="w-[105%] -mx-[2.5%] sm:w-full sm:mx-0 h-auto"
                    >
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>

                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="rgba(220, 38, 38, 0.1)"
                                        stroke="#DC2626"
                                        strokeWidth={0.4}
                                        style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                                    />
                                ))
                            }
                        </Geographies>

                        {/* Flow lines */}
                        {flowData.map((flow, i) => {
                            const from = stateCoords[flow.from];
                            const to = stateCoords[flow.to];
                            if (!from || !to) return null;
                            return (
                                <g key={flow.id}>
                                    {/* Stronger Outer Glow */}
                                    <path d={generateCurvedPath(from, to)} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={8} filter="url(#glow)" />
                                    {/* Solid Base Line - connecting line - BOOSTED */}
                                    <path d={generateCurvedPath(from, to)} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeOpacity={0.8} strokeLinecap="round" />
                                    {/* Animated Movement Line - longer dash for flow effect - BOOSTED */}
                                    <path d={generateCurvedPath(from, to)} fill="none" stroke="#fff" strokeWidth={3.5} className="flow-anim" style={{ animationDelay: `${i * 0.3}s` }} />

                                    {/* Origin Dot */}
                                    <Marker coordinates={from}>
                                        <circle r={4} fill="rgba(255,255,255,0.7)" stroke="rgba(220, 38, 38, 0.35)" strokeWidth={1} />
                                    </Marker>

                                    {/* Destination Dot */}
                                    <Marker coordinates={to}>
                                        <circle r={4} fill="rgba(156,163,175,0.6)" stroke="rgba(255,255,255,0.6)" strokeWidth={1} />
                                    </Marker>
                                </g>
                            );
                        })}
                    </ComposableMap>
                </div>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {[...leftStats, ...rightStats].map((stat, i) => (
                        <div key={i} className="w-32 p-3 rounded-xl border border-red-500/20 bg-background/50 backdrop-blur-sm">
                            <div className="text-2xl font-light text-foreground font-[family-name:var(--font-space-grotesk)]">{stat.value}</div>
                            <div className="text-[10px] text-muted-foreground tracking-wider uppercase mt-0.5">{stat.label}</div>
                            <div className="text-[9px] text-muted-foreground/60">{stat.sub}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom: Transaction flashcards */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
                {flowData.map((flow) => (
                    <div key={flow.id} className="px-4 py-2 rounded-lg bg-foreground/5 border border-red-500/20 text-xs font-[family-name:var(--font-space-grotesk)]">
                        {flow.id === "1" ? (
                            <span className="text-foreground font-medium">
                                2026
                                <span className="text-muted-foreground font-normal ml-1">USDA Farmers Bridge Assistance</span>
                                <span className="text-red-400 font-medium ml-1">$12B</span>
                            </span>
                        ) : flow.id === "2" ? (
                            <span className="text-foreground font-medium">
                                Kenaf
                                <span className="text-muted-foreground font-normal ml-1">South Dakota Bio-Materials</span>
                                <span className="text-green-400 font-medium ml-1">$4.2M</span>
                            </span>
                        ) : flow.id === "3" ? (
                            <span className="text-foreground font-medium">
                                U.S.
                                <span className="text-muted-foreground font-normal ml-1">Lumber Costs</span>
                                <span className="text-red-400 font-medium ml-1">+21%</span>
                            </span>
                        ) : flow.id === "5" ? (
                            <span className="text-foreground font-medium">
                                2026
                                <span className="text-muted-foreground font-normal ml-1">USDA Row Crop Bailouts</span>
                                <span className="text-red-400 font-medium ml-1">$11B</span>
                            </span>
                        ) : (
                            <>
                                <span className="text-foreground font-medium">{flow.commodity}</span>
                                <span className="text-muted-foreground/40 mx-2">|</span>
                                <span className="text-muted-foreground">{flow.from} → {flow.to}</span>
                            </>
                        )}
                    </div>
                ))}
                <div className="w-full flex justify-center gap-3">
                    <div className="px-4 py-2 rounded-lg bg-foreground/5 border border-red-500/20 text-xs font-[family-name:var(--font-space-grotesk)]">
                        <span className="text-foreground font-medium">Soy</span>
                        <span className="text-muted-foreground font-normal ml-1">Price per Acre</span>
                        <span className="text-red-400 font-medium ml-1">-93%</span>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-foreground/5 border border-red-500/20 text-xs font-[family-name:var(--font-space-grotesk)]">
                        <span className="text-foreground font-medium">Kentucky</span>
                        <span className="text-muted-foreground font-normal ml-1">Industry Value Loss</span>
                        <span className="text-red-400 font-medium ml-1">-$384M</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
