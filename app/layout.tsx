import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";
import { Analytics } from "@vercel/analytics/next";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Alpheus Mabetlela",
    template: "Alpheus Mabetlela | %s",
  },
  description:
    "Alpheus Mabetlela is a Product Engineer focused on building structured, scalable systems and tools that prioritize clarity, usability, and real-world impact.",

  openGraph: {
    title: "Alpheus Mabetlela",
    description:
      "Portfolio of Alpheus Mabetlela — Product Engineer building systems, tools, and real-world digital solutions with a focus on structure and developer experience.",
    url: "https://alpehusmabetlela.com",
    siteName: "Alpheus Mabetlela's Portfolio",
    images: [
      {
        url: "https://alpheusmabetlela.com/blocks/hero.webp",
        width: 1200,
        height: 630,
        alt: "Alpheus Mabetlela Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Alpheus Mabetlela",
    description:
      "Explore projects, systems, and tools built by Alpheus Mabetlela — focused on clean architecture and real-world usability.",
    images: ["https://alpehusmabetlela.com/images/demo.png"],
  },

  metadataBase: new URL("https://alpehusmabetlela.com"),

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, nunito.variable, lato.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
        <Analytics />
      </body>
    </html>
  );
}
