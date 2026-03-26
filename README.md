# ENOTRIUM - Landing Page

A high-performance, theme-aware landing page built with Next.js 16, React 19, and Tailwind CSS 4. Features sleek animations, interactive visualizations, and a minimalistic design optimized for YC-level SaaS presentation.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [External Libraries & Components](#external-libraries--components)
- [Content Management](#content-management)
- [Styling & Theming](#styling--theming)
- [Performance Optimizations](#performance-optimizations)
- [Deployment](#deployment)
- [Development Guidelines](#development-guidelines)

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at `http://localhost:3000`

---

## Project Structure

```
enotrium-v3/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   ├── page.tsx              # Home page (lazy loads sections)
│   │   ├── globals.css           # Global styles & CSS variables
│   │   └── favicon.ico           # Site favicon
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Main navigation with theme toggle
│   │   │   └── Footer.tsx        # Simple footer with CTA
│   │   │
│   │   ├── sections/             # Page sections (all lazy-loaded except Hero)
│   │   │   ├── HeroSection.tsx   # Landing hero with text hover effect
│   │   │   ├── ManifestoSection.tsx    # Scroll-reveal text section
│   │   │   └── SupplyChainSection.tsx  # Globe visualization section
│   │   │
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── background-grid.tsx     # Animated dot grid background
│   │   │   ├── button.tsx              # Base button component
│   │   │   ├── calendar-picker.tsx     # Custom calendar component (unused)
│   │   │   ├── scroll-reveal.tsx       # Scroll-triggered animations
│   │   │   ├── text-hover-effect.tsx   # SVG text hover animation
│   │   │   ├── text-reveal-optimized.tsx # Progressive text reveal
│   │   │   └── typewriter.tsx          # Typewriter text effect
│   │   │
│   │   ├── visualizations/       # Complex visual components
│   │   │   ├── DarkVeil.tsx      # WebGL shader background (dark mode only)
│   │   │   ├── Globe.tsx         # 3D rotating globe (cobe)
│   │   │   └── USMap.tsx         # SVG USA map outline
│   │   │
│   │   └── theme-provider.tsx    # next-themes wrapper
│   │
│   ├── config/
│   │   └── content.ts            # Centralized content configuration
│   │
│   ├── lib/
│   │   └── utils.ts              # Utility functions (cn helper)
│   │
│   └── types/
│       └── index.ts              # TypeScript type definitions
│
├── public/                       # Static assets (currently empty)
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS/Tailwind configuration
├── eslint.config.mjs             # ESLint configuration
└── tailwind.config.ts            # Tailwind CSS configuration (if exists)
```

---

## Technology Stack

### Core Framework

- **Next.js 16.0.6** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **next-themes** - Theme management (dark/light mode)

### Animation & Interaction

- **Framer Motion 12.23.25** - Animation library
- **cobe 0.6.5** - 3D globe visualization
- **ogl 1.0.11** - WebGL shader rendering (DarkVeil)

### UI Components

- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **react-simple-maps** - SVG map rendering

### Utilities

- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes
- **class-variance-authority** - Component variants

---

## External Libraries & Components

### 1. Cobe Globe (`Globe.tsx`)

**Library:** `cobe` (v0.6.5)  
**Purpose:** Renders a 3D rotating Earth globe with country outlines  
**Configuration:**

- `mapSamples: 8000` - Reduced for performance
- `devicePixelRatio: 2` - Capped for performance
- Theme-aware colors (dark/light mode)
- Auto-rotation at 0.003 rad/frame

**Usage:**

```tsx
import { Globe } from "@/components/visualizations/Globe";
<Globe className="w-full h-full" />;
```

### 2. DarkVeil Shader (`DarkVeil.tsx`)

**Library:** `ogl` (v1.0.11)  
**Purpose:** WebGL shader background with CPPN neural network pattern  
**Features:**

- Only renders in dark mode
- Resolution scale: 0.35 (optimized for performance)
- Custom fragment shader with hue shifting
- Auto-cleanup on theme change

### 3. Framer Motion Animations

**Library:** `framer-motion` (v12.23.25)  
**Used in:**

- `ScrollReveal.tsx` - Scroll-triggered animations
- `TextRevealOptimized.tsx` - Progressive text reveal
- All section transitions

**Common patterns:**

```tsx
// Fade up animation
<ScrollReveal animation="fade-up" delay={0.2}>
  <div>Content</div>
</ScrollReveal>
```

### 4. Background Grid (`BackgroundGrid.tsx`)

**Implementation:** Pure CSS + React state  
**Features:**

- Two-layer dot grid (base + interactive)
- Mouse-following radial highlight
- RAF-throttled for performance
- Theme-aware dot colors

### 5. Text Hover Effect (`TextHoverEffect.tsx`)

**Implementation:** SVG + Canvas  
**Features:**

- Radial gradient reveal on hover
- Theme-specific gradient colors
- Used for "ENOTRIUM" title in Hero

### 6. Calendar Picker (`CalendarPicker.tsx`)

**Implementation:** Custom React component  
**Features:**

- Month/year navigation
- Date selection
- Theme-aware styling
- Ready for scheduling flows

---

## Content Management

All site content is centralized in `src/config/content.ts`:

```typescript
export const siteConfig = {
  name: "ENOTRIUM",
  description: "Securing America's Industrial Base",
  nav: [...],
  hero: {...},
  manifesto: {...},
  supplyChain: {...},
  contact: {
    ctaHref: "https://calendly.com/enotrium/demo" // update to your booking link or scheduling service
  }
}
```

### To Update Content

1. Edit `src/config/content.ts`
2. Changes automatically reflect across all sections
3. Type-safe with TypeScript definitions in `src/types/index.ts`

---

## Styling & Theming

### Theme System

Uses `next-themes` with class-based dark mode:

**CSS Variables** (`globals.css`):

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --border: #e5e5e5;
  --accent: #3b82f6;
}

.dark {
  --background: #000000;
  --foreground: #ededed;
  --muted: #171717;
  --muted-foreground: #a3a3a3;
  --border: #262626;
  --accent: #60a5fa;
}
```

### Tailwind Usage

```tsx
// Theme-aware classes
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Text</p>
</div>
```

### Custom Utilities

- `cn()` - Merge Tailwind classes (from `lib/utils.ts`)

```tsx
import { cn } from "@/lib/utils";
<div className={cn("base-class", condition && "conditional-class")} />;
```

---

## Performance Optimizations

### 1. Lazy Loading

All sections except Hero are lazy-loaded:

```tsx
const ManifestoSection = dynamic(
  () => import("@/components/sections/ManifestoSection"),
  { ssr: true },
);
```

### 2. Component Memoization

Heavy components use `React.memo`:

```tsx
export const Globe = memo(function Globe({ className }) {
  // Component logic
});
```

### 3. Animation Throttling

- Background grid uses `requestAnimationFrame` throttling
- Scroll reveals trigger only once (`once: true`)

### 4. Reduced Render Costs

- Globe: `mapSamples: 8000` (down from 16000)
- DarkVeil: `resolutionScale: 0.35` (down from 0.5)
- Background grid: 24px spacing (fewer dots)

### 5. Build Optimization

- Next.js 16 with Turbopack
- Automatic code splitting
- Image optimization (if images added)

---

## Deployment

### Vercel (Recommended)

1. **Connect Repository:**

   ```bash
   # Push to GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Environment Variables:**
   None required for current setup

### Other Platforms

**Build command:** `npm run build`  
**Output directory:** `.next`  
**Install command:** `npm install --legacy-peer-deps`  
**Node version:** 20+

### Production Checklist

- [ ] Replace placeholder content in `config/content.ts`
- [ ] Add favicon/metadata in `app/layout.tsx`
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Configure CSP headers in `next.config.ts`

---

## Development Guidelines

### Adding a New Section

1. **Create component:**

   ```tsx
   // src/components/sections/NewSection.tsx
   "use client";
   import { ScrollReveal } from "@/components/ui/scroll-reveal";
   import { siteConfig } from "@/config/content";

   export function NewSection() {
     return (
       <section id="new-section">
         <ScrollReveal>
           <h2>{siteConfig.newSection.title}</h2>
         </ScrollReveal>
       </section>
     );
   }
   ```

2. **Add to content config:**

   ```typescript
   // src/config/content.ts
   export const siteConfig = {
     // ...
     newSection: {
       title: "New Section",
       description: "...",
     },
   };
   ```

3. **Add to page:**

   ```tsx
   // src/app/page.tsx
   const NewSection = dynamic(() => import("@/components/sections/NewSection"));

   // In component:
   <NewSection />;
   ```

### Theme-Aware Components

Always use CSS variables or Tailwind's dark mode:

```tsx
// Good
<div className="bg-background text-foreground dark:border-white/10">

// Avoid
<div style={{ background: '#000' }}>
```

### Performance Best Practices

1. **Memoize expensive components:**

   ```tsx
   export const MyComponent = memo(function MyComponent() {
     // ...
   });
   ```

2. **Use `useCallback` for event handlers:**

   ```tsx
   const handleClick = useCallback(() => {
     // handler logic
   }, [dependencies]);
   ```

3. **Lazy load below-the-fold content:**

   ```tsx
   const HeavyComponent = dynamic(() => import("./Heavy"), {
     ssr: false,
   });
   ```

### Code Organization

- **Components:** One component per file
- **Naming:** PascalCase for components, camelCase for utilities
- **Exports:** Named exports preferred over default
- **Types:** Define in `src/types/index.ts` or colocate with component

---

## Troubleshooting

### Common Issues

**Issue:** Globe not rendering  
**Solution:** Check browser console for WebGL errors. Ensure `cobe` is installed.

**Issue:** Theme not switching  
**Solution:** Verify `ThemeProvider` wraps app in `layout.tsx`

**Issue:** Build fails  
**Solution:** Run `npm install --legacy-peer-deps` to resolve peer dependency conflicts

**Issue:** Slow performance  
**Solution:** Check if DarkVeil is rendering in light mode (should not be). Verify lazy loading is working.

### Development Tips

- Use `npm run dev` for hot reload during development
- Check `http://localhost:3000` in browser console for errors
- TypeScript errors will show in terminal and editor
- Use React DevTools to debug component renders

---

## License

Private - All rights reserved

## Support

For questions or issues, contact the development team.

---

**Last Updated:** December 2025  
**Next.js Version:** 16.0.6  
**React Version:** 19.2.0
