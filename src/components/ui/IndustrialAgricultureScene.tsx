export function IndustrialAgricultureScene() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="50%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(128,128,128,0.1)" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="800" height="600" fill="url(#bgGradient)" />

      {/* Subtle grid pattern */}
      <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
        <line x1="0" y1="100" x2="800" y2="100" />
        <line x1="0" y1="200" x2="800" y2="200" />
        <line x1="0" y1="300" x2="800" y2="300" />
        <line x1="0" y1="400" x2="800" y2="400" />
        <line x1="0" y1="500" x2="800" y2="500" />
        <line x1="100" y1="0" x2="100" y2="600" />
        <line x1="200" y1="0" x2="200" y2="600" />
        <line x1="300" y1="0" x2="300" y2="600" />
        <line x1="400" y1="0" x2="400" y2="600" />
        <line x1="500" y1="0" x2="500" y2="600" />
        <line x1="600" y1="0" x2="600" y2="600" />
        <line x1="700" y1="0" x2="700" y2="600" />
      </g>

      {/* Central accent circle */}
      <circle cx="400" cy="300" r="200" fill="url(#accentGradient)" opacity="0.5" />
      <circle cx="400" cy="300" r="150" fill="rgba(255,255,255,0.05)" />

      {/* Decorative geometric elements */}
      <g stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
        <rect x="200" y="200" width="400" height="200" rx="4" />
        <rect x="220" y="220" width="360" height="160" rx="4" stroke="rgba(255,255,255,0.1)" />
      </g>

      {/* Corner accents */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="2">
        <line x1="50" y1="50" x2="100" y2="50" />
        <line x1="50" y1="50" x2="50" y2="100" />
        <line x1="750" y1="50" x2="700" y2="50" />
        <line x1="750" y1="50" x2="750" y2="100" />
        <line x1="50" y1="550" x2="100" y2="550" />
        <line x1="50" y1="550" x2="50" y2="500" />
        <line x1="750" y1="550" x2="700" y2="550" />
        <line x1="750" y1="550" x2="750" y2="500" />
      </g>

      {/* Main title */}
      <text x="400" y="250" textAnchor="middle" fill="white" fontSize="56" fontWeight="normal" fontFamily="var(--font-tektur)" letterSpacing="2">
        The Agri-Industrial
      </text>
      <text x="400" y="310" textAnchor="middle" fill="white" fontSize="56" fontWeight="normal" fontFamily="var(--font-tektur)" letterSpacing="2">
        Economy
      </text>

      {/* Subtitle text */}
      <text x="400" y="370" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="20" fontWeight="300" fontFamily="var(--font-inter)">
        AI-driven strategy,
      </text>
      <text x="400" y="400" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="20" fontWeight="300" fontFamily="var(--font-inter)">
        execution of the bio-economy,
      </text>
      <text x="400" y="430" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="20" fontWeight="300" fontFamily="var(--font-inter)">
        and establishment of the
      </text>
      <text x="400" y="460" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="20" fontWeight="300" fontFamily="var(--font-inter)">
        industrial base.
      </text>

      {/* Decorative line */}
      <line x1="250" y1="480" x2="550" y2="480" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  );
}
