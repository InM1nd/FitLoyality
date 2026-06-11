import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Self-hosted (Fontshare ITF licence) — no CDN dependency, no CLS.
// Satoshi has no 600 cut; CSS resolves semibold to the 700 file.
const satoshi = localFont({
  src: [
    { path: "./fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const clashGrotesk = localFont({
  src: [
    { path: "./fonts/clash-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/clash-grotesk-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/clash-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://fitloyalty.io"),
  title: "FitLoyalty — Turn churn into loyalty",
  description:
    "The white-label retention platform for independent fitness studios. Spot at-risk members, reward what works, and prove the ROI — built for the DACH region.",
  openGraph: {
    title: "FitLoyalty — Turn churn into loyalty",
    description:
      "Weekly streaks for your members, churn-window alerts for you, every save counted in euros. Built for studios on Eversports, USC & Wellpass.",
    url: "https://fitloyalty.io",
    siteName: "FitLoyalty",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitLoyalty — Turn churn into loyalty",
    description:
      "Weekly streaks for your members, churn-window alerts for you, every save counted in euros.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexMono.variable} ${satoshi.variable} ${clashGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={150}>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
