import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/content";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { LinkBehavior } from "@/components/ui/LinkBehavior";

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
      <body className="font-sans antialiased">
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
