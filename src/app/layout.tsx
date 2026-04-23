import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Iceland, Inter, Tektur } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/content";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { LinkBehavior } from "@/components/ui/LinkBehavior";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-iceland",
  display: "swap",
});

const tektur = Tektur({
  subsets: ["latin"],
  variable: "--font-tektur",
  display: "block",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48 32x32 24x24 16x16", type: "image/x-icon" },
      { url: "/NEWFAVICON.jpg", sizes: "128x128 180x180", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/NEWFAVICON.jpg", sizes: "180x180", type: "image/jpeg" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${iceland.variable} ${inter.variable} ${tektur.variable} font-sans antialiased`}>
        <LinkBehavior />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          storageKey="enotrium-theme"
        >
          <BackgroundGrid />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
